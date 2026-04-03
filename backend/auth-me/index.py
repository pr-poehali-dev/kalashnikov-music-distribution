"""Получение данных текущего пользователя по токену сессии"""
import json
import os
import psycopg2
from datetime import datetime


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    auth_header = event.get("headers", {}).get("X-Authorization") or event.get("headers", {}).get("Authorization") or ""
    token = auth_header.replace("Bearer ", "").strip()

    if not token:
        return {
            "statusCode": 401,
            "headers": headers,
            "body": json.dumps({"error": "Токен не передан"}),
        }

    schema = os.environ.get("MAIN_DB_SCHEMA", "public")
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute(
        f"""
        SELECT u.id, u.email, u.name, u.artist_name, u.role, u.created_at
        FROM {schema}.sessions s
        JOIN {schema}.users u ON u.id = s.user_id
        WHERE s.token = %s AND s.expires_at > %s
        """,
        (token, datetime.now()),
    )
    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        return {
            "statusCode": 401,
            "headers": headers,
            "body": json.dumps({"error": "Сессия истекла или недействительна"}),
        }

    user_id, email, name, artist_name, role, created_at = row
    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({
            "user": {
                "id": user_id,
                "email": email,
                "name": name,
                "artist_name": artist_name,
                "role": role,
                "created_at": created_at.isoformat(),
            }
        }),
    }