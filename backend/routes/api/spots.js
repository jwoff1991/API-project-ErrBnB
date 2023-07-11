const express = require("express");


const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();


const validateSpot = [
    check("address")
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check("city")
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
     check("state")
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check("country")
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check("lat")
        .exists({ checkFalsy: true })
        .withMessage("Latitude is not valid"),
    check("lng")
        .exists({ checkFalsy: true })
        .withMessage("Longitude is not valid"),
     check("name")
        .exists({ checkFalsy: true })
        .withMessage("Name must be less than 50 characters"),
    check("description")
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check("price")
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors,
];

//Create a spot
router.post("/", validateSpot, async(req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const  ownerId = req.user.id
    const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price })

    const validSpot = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot. updatedAt
    };

    return res.json(validSpot)
})


module.exports = router;