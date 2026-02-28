use mongodb::{
    error::{Error},
    Database,
};

use crate::models::booking::Booking;

const COLLECTION_NAME: &str = "bookings";

pub async fn init_booking_collection(db: &Database) -> Result<(), Error> {
    let collections = db.list_collection_names(None).await?;
    if !collections.iter().any(|name| name == COLLECTION_NAME) {
        db.create_collection(COLLECTION_NAME, None).await?;
        println!("✓ created collection: {}", COLLECTION_NAME);
    }
    Ok(())
}

pub async fn create_booking(db: &Database, booking: Booking) -> Result<Booking, Error> {
    let collection = db.collection::<Booking>(COLLECTION_NAME);
    let result = collection.insert_one(booking.clone(), None).await?;

    let mut created = booking;
    created.id = result.inserted_id.as_object_id();

    Ok(created)
}