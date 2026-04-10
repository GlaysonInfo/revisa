def rate_limit_key(user_id: str, route: str) -> str:
    return f"rate-limit:{user_id}:{route}"
