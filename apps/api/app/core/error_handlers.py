from fastapi import FastAPI
from fastapi.responses import JSONResponse

from app.core.exceptions import AppException, BusinessRuleError


def install_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(AppException)
    async def app_exception_handler(_, exc: AppException) -> JSONResponse:
        return JSONResponse(status_code=exc.status_code, content={"detail": exc.message})

    @app.exception_handler(BusinessRuleError)
    async def business_rule_handler(_, exc: BusinessRuleError) -> JSONResponse:
        return JSONResponse(status_code=400, content={"detail": exc.message})
