
import mongoose, { Schema } from "mongoose";

// Define the schema for the Location
const locationSchema = new Schema(
    {
        // Name field
        name: {
            type: String,
            required: true,

        },
        // Latitude field
        latitude: {
            type: Number,
            required: true,
        },
        // Longitude field
        longitude: {
            type: Number,
            required: true,

        },
        // Category field
        category: {
            type: String,
            required: true
        }
        
    },
    // Additional options
    {
        timestamps: true // Adds createdAt and updatedAt fields
    }
);



// Create and export the Location model
export const Location = mongoose.model("Location", locationSchema);
