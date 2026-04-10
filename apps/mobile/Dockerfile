FROM ghcr.io/cirruslabs/flutter:stable
WORKDIR /app
COPY . .
CMD ["flutter", "run", "-d", "web-server", "--web-hostname", "0.0.0.0", "--web-port", "8080"]
