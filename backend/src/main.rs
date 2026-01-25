mod app;
mod handlers;

#[tokio::main]
async fn main() {
    let app = app::create_router();

    let listener = tokio::net::TcpListener::bind("localhost:5000")
        .await
        .unwrap();
    
    println!("Server running on http://localhost:5000");
    
    axum::serve(listener, app)
        .await
        .unwrap_or_default();
}
