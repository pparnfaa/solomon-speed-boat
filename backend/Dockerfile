# syntax=docker/dockerfile:1

# Build stage — edition = "2024" (Rust 1.85+); Cargo.lock deps need Rust 1.88+
FROM rust:1.88-bookworm AS builder

WORKDIR /app

# Cache dependency compilation across source changes
COPY Cargo.toml Cargo.lock ./
RUN mkdir src \
    && echo "fn main() {}" > src/main.rs \
    && echo "pub fn dummy() {}" > src/lib.rs \
    && cargo build --release \
    && rm -rf src

COPY src ./src

RUN touch src/main.rs src/lib.rs \
    && cargo build --release

# Runtime stage — minimal Debian image with TLS roots for MongoDB Atlas
FROM debian:bookworm-slim AS runtime

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --system --no-create-home --shell /usr/sbin/nologin appuser

WORKDIR /app

COPY --from=builder /app/target/release/backend /usr/local/bin/backend

USER appuser

EXPOSE 5100

ENV PORT=5100

CMD ["backend"]
