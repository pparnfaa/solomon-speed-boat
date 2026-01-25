# Backend - Solomon Speed Boat

Rust backend API using Axum web framework.

## Prerequisites

- Rust 1.70+ ([Install Rust](https://rustup.rs/))
- Cargo (comes with Rust)

## Getting Started

### 1. Setup Environment

Create a `.env` file in the backend directory:

```
PORT=5100
```

### 2. Install Dependencies

```bash
cargo build
```

### 3. Run the Server

**Development mode:**
```bash
cargo run
```

**With auto-reload (requires `cargo-watch`):**
```bash
# Install cargo-watch first
cargo install cargo-watch

# Then run with auto-reload
cargo watch -x run
```

The server will start on `http://localhost:5100` (or the PORT in your .env file)

## Available Commands

| Command | Description |
|---------|-------------|
| `cargo run` | Run the server |
| `cargo build` | Build the project |
| `cargo test` | Run tests |
| `cargo fmt` | Format code |
| `cargo clippy` | Lint code |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check endpoint |

**Example:**
```bash
curl http://localhost:5100/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-25T12:34:56Z"
}
```

## Project Structure

```
src/
├── main.rs        # Entry point & server setup
├── app.rs         # Router configuration
└── handlers/      # Request handlers
    ├── mod.rs
    └── health.rs  # Health check handler
```

## Environment Variables

- `PORT` - Server port (default: 3000)

## Troubleshooting

**Port already in use:**
```bash
# Change the PORT in .env file or use a different port
PORT=3001 cargo run
```

**Dependency issues:**
```bash
cargo clean
cargo build
```