"""Вход пользователя по email и паролю"""
import json
import os
import hashlib
import secrets
import psycopg2
from datetime import datetime, timedelta


def hash_password(password: str) -> str:
    salt = os.environ.get("SECRET_SALT", "sounddrop_salt_2026")
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

    if not email or not password:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Введите email и пароль"}),
        }

    schema = os.environ.get("MAIN_DB_SCHEMA", "public")
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    password_hash = hash_password(password)
    cur.execute(
        f'SELECT id, email, name, artist_name, role FROM {schema}.users WHERE email = %s AND password_hash = %s',
        (email, password_hash),
    )
    row = cur.fetchone()

    if not row:
        cur.close()
        conn.close()
        return {
            "statusCode": 401,
            "headers": headers,
            "body": json.dumps({"error": "Неверный email или пароль"}),
        }

    user_id, user_email, name, artist_name, role = row
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
                "email": user_email,
                "name": name,
                "artist_name": artist_name,
                "role": role,
            },
        }),
    }