#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();

    // Connect to MongoDB
    let database = backend::db::connect()
        .await
        .expect("Failed to connect to MongoDB");
    backend::repositories::booking_repositories::init_booking_collection(&database)
        .await
        .expect("Failed to init bookings collection");

    let app = backend::app::create_router(database);

    let port = std::env::var("PORT").unwrap_or_else(|_| "5100".to_string());
    let addr = format!("0.0.0.0:{}", port);
    let listener = tokio::net::TcpListener::bind(&addr)
        .await
        .unwrap();

    println!("Server listening on http://{}", addr);

    axum::serve(listener, app).await.unwrap_or_default();
}
