from fastapi import FastAPI, Request, Response
from prometheus_client import CONTENT_TYPE_LATEST, Counter, generate_latest

REQUEST_COUNTER = Counter("revisa_http_requests_total", "Total HTTP requests", ["method", "path"])


def install_metrics(app: FastAPI) -> None:
    @app.middleware("http")
    async def metrics_middleware(request: Request, call_next):
        REQUEST_COUNTER.labels(method=request.method, path=request.url.path).inc()
        return await call_next(request)

    @app.get("/metrics", include_in_schema=False)
    def metrics() -> Response:
        return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)
