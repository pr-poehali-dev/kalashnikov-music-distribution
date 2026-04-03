"""Регистрация нового пользователя (артиста)"""
import json
import os
import hashlib
import secrets
import psycopg2
from datetime import datetime, timedelta


def hash_password(password: str) -> str:
    salt = "sounddrop_salt_2026"
    return hashlib.sha256(f"{salt}{password}".encode()).hexdigest()


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""
    name = (body.get("name") or "").strip()
    artist_name = (body.get("artist_name") or "").strip()

    if not email or not password or not name:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Заполните все обязательные поля"}),
        }

    if len(password) < 6:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Пароль должен быть не менее 6 символов"}),
        }

    schema = os.environ.get("MAIN_DB_SCHEMA", "public")
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute(f'SELECT id FROM {schema}.users WHERE email = %s', (email,))
    if cur.fetchone():
        cur.close()
        conn.close()
        return {
            "statusCode": 409,
            "headers": headers,
            "body": json.dumps({"error": "Пользователь с таким email уже существует"}),
        }

    password_hash = hash_password(password)
    cur.execute(
        f'INSERT INTO {schema}.users (email, password_hash, name, artist_name) VALUES (%s, %s, %s, %s) RETURNING id',
        (email, password_hash, name, artist_name or None),
    )
    user_id = cur.fetchone()[0]

    token = secrets.token_hex(32)
    expires_at = datetime.now() + timedelta(days=30)
    cur.execute(
        f'INSERT INTO {schema}.sessions (user_id, token, expires_at) VALUES (%s, %s, %s)',
        (user_id, token, expires_at),
    )

    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({
            "token": token,
            "user": {
                "id": user_id,
                "email": email,
                "name": name,
                "artist_name": artist_name,
                "role": "artist",
            },
        }),
    }
