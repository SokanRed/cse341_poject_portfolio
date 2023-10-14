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
    res.status(200).json(result);
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
    res.status(201).json(result);

};

module.exports = { getVehicle, getVehicleById, createVehicle };