const mongodb = require("../db/connect");

const ObjectId = require('mongodb').ObjectId;


const getVehicle = async(req, res) => {
    const Db = await mongodb.getDb().db('portfolio-builder').collection("vehicle").find().toArray();
    res.send(Db);
};

const getVehicleById = async(req, res) => {
    const vehicleId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('portfolio-builder')
        .collection("vehicle")
        .find({ _id: vehicleId })
        .toArray();
    res.setHeader("Content-Type", "application/json");
    if (result.acknowledged) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result.error || `There is no vehicle with this Id:  ${vehicleId}.`);
    }
};

const createVehicle = async(req, res) => {
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
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'Some error occurred while creating the vehicle.');
    }
};

const updateVehicleById = async(req, res) => {
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
    console.log(result);
    if (result.modifiedCount > 0) {
        res.status(204).send("Vehicle was updated.");
    } else {
        res.status(500).json(result.error || 'Some error occurred while updating the vehicle.');
    }
};

const deleteVehicleById = async(req, res) => {
    const vehicleId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('portfolio-builder')
        .collection("vehicle")
        .deleteOne({ _id: vehicleId }, true);
    console.log(result);
    if (result.deletedCount > 0) {
        res.status(200).send("Vehicle was deleted from database.");
    } else {
        res.status(500).json(result.error || `There is no vehicle with this Id:  ${vehicleId}.`)
    }
};

module.exports = { getVehicle, getVehicleById, createVehicle, updateVehicleById, deleteVehicleById };