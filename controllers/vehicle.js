const mongodb = require("../db/connect");

const ObjectId = require('mongodb').ObjectId;


const getVehicle = async(req, res) => {
    try {
        const Db = await mongodb.getDb().db('portfolio-builder').collection("vehicle").find().toArray();
        res.status(200).json(Db);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving vehicles." });
    }
};

const getVehicleById = async(req, res) => {
    try {
        const vehicleId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDb()
            .db('portfolio-builder')
            .collection("vehicle")
            .find({ _id: vehicleId })
            .toArray();
        if (result.length === 0) {
            res.status(422).json({ error: `No vehicle found with ID: ${vehicleId}` });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving the vehicle." });
    }
};

const createVehicle = async(req, res) => {
    try {
        const createVehicle = {
            brand: req.body.brand,
            model: req.body.model,
            horsePower: req.body.horsePower,
            fuelType: req.body.fuelType,
            color: req.body.color,
            category: req.body.category,
            transmission: req.body.transmission,
            numberPassenger: req.body.numberPassenger
        };
        const result = await mongodb
            .getDb()
            .db('portfolio-builder')
            .collection("vehicle")
            .insertOne(createVehicle);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the vehicle." });
    }
};

const updateVehicleById = async(req, res) => {
    try {
        const vehicleId = new ObjectId(req.params.id);
        const updateVehicle = {
            brand: req.body.brand,
            model: req.body.model,
            horsePower: req.body.horsePower,
            fuelType: req.body.fuelType,
            color: req.body.color,
            category: req.body.category,
            transmission: req.body.transmission,
            numberPassenger: req.body.numberPassenger
        };
        const result = await mongodb
            .getDb()
            .db('portfolio-builder')
            .collection("vehicle")
            .replaceOne({ _id: vehicleId }, updateVehicle);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(422).json({ error: `No vehicle found with ID: ${vehicleId}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the vehicle." });
    }
};

const deleteVehicleById = async(req, res) => {
    try {
        const vehicleId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDb()
            .db('portfolio-builder')
            .collection("vehicle")
            .deleteOne({ _id: vehicleId }, true);
        if (result.deletedCount > 0) {
            res.status(200).send("Vehicle was deleted from the database.");
        } else {
            res.status(422).json({ error: `No vehicle found with ID: ${vehicleId}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the vehicle." });
    }
};

module.exports = { getVehicle, getVehicleById, createVehicle, updateVehicleById, deleteVehicleById };