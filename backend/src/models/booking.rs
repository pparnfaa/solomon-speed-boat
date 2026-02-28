use chrono::DateTime;
use serde::{Deserialize, Serialize};
use mongodb::bson::oid::ObjectId;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Booking {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub customer_name: String,
    pub boat_type: String,
    pub date: String,
    pub time: DateTime<chrono::Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateBookingRequest {
    pub customer_name: String,
    pub boat_type: String,
    pub date: String,
}