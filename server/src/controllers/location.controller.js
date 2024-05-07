
import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import HttpStatus from '../utils/HttpStatus.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Location } from '../models/location.model.js'


const registerLocation = asyncHandler ( async (req,res) =>{

    // TODO:

    const {name, latitude, longitude, category } = req.body
    //console.log("name: ", name);

    const location = await Location.create({
        name,
        latitude,
        longitude,
        category
    })

    if (!location) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong")
    }

    return res.status(HttpStatus.CREATED).json(
        new ApiResponse(HttpStatus.OK, location, "User registered Successfully")
    )


})

const searchLocation = asyncHandler ( async (req,res) =>{
    const { name, category } = req.query;

    // Build query object based on available query parameters
    const query = {};

    if (name) {
        // Case-insensitive search by name
        query.name = { $regex: new RegExp(name, 'i') };
    }
    if (category) {
        // Search by category
        query.category = category;
    }
    // Fetch locations based on the query
    const locations = await Location.find(query);

    if (!locations || locations.length === 0) {
        throw new ApiError(HttpStatus.NOT_FOUND, "No locations found with the specified criteria");
    }

    return res.status(HttpStatus.OK).json(
        new ApiResponse(HttpStatus.OK, locations, "Locations found successfully")
    );

    
})

const getAllLocations = asyncHandler ( async (req,res) =>{

    // Fetch all locations from the database
    const locations = await Location.find();

    if (!locations || locations.length === 0) {
        throw new ApiError(HttpStatus.NOT_FOUND, "No locations found");
    }

    return res.status(HttpStatus.OK).json(
        new ApiResponse(HttpStatus.OK, locations, "All locations retrieved successfully")
    );
})

export {
    registerLocation,
    searchLocation,
    getAllLocations
}




