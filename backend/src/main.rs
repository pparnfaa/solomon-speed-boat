mod app;
mod handlers;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    
    let app = app::create_router();

    let port = std::env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    let listener = tokio::net::TcpListener::bind(format!("localhost:{}", port))
        .await
        .unwrap();
    
    println!("Server running on http://localhost:{}", port);
    
    axum::serve(listener, app)
        .await
        .unwrap_or_default();
}
