from app.core.exceptions import BusinessRuleError
from app.services.auth_service import refresh_access_token


def test_refresh_invalid_token() -> None:
    try:
        refresh_access_token("invalid-token")
    except BusinessRuleError as exc:
        assert "Invalid refresh token" in str(exc)
    else:
        raise AssertionError("Expected BusinessRuleError")
