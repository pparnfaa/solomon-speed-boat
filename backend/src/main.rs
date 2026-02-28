mod app;
mod db;
mod handlers;
mod models;
mod repositories;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();

    // Connect to MongoDB
    let database = db::connect().await.expect("Failed to connect to MongoDB");
    repositories::booking_repositories::init_booking_collection(&database)
        .await
        .expect("Failed to init bookings collection");

    let app = app::create_router(database);

    let port = std::env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    let listener = tokio::net::TcpListener::bind(format!("localhost:{}", port))
        .await
        .unwrap();

    println!("Server running on http://localhost:{}", port);

    axum::serve(listener, app).await.unwrap_or_default();
}
