const mongodb = require("../db/connect");

const ObjectId = require('mongodb').ObjectId;


const getMaintenance = async(req, res) => {
    const Db = await mongodb.getDb().db('portfolio-builder').collection("maintenance").find().toArray();
    res.send(Db);
};

const getMaintenanceById = async(req, res) => {
    const maintenanceId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('portfolio-builder')
        .collection("maintenance")
        .find({ _id: maintenanceId })
        .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
};

const createMaintenance = async(req, res) => {
    const createMaintenance = {
        vehicle: req.body.vehicle,
        date: req.body.date,
        mileage: req.body.mileage,
        lubrification: req.body.lubrification,
        brakes: req.body.brakes,
        mirrors: req.body.mirrors,
        tires: req.body.tires,
        suspensionSystem: req.body.suspensionSystem
    };
    const result = await mongodb
        .getDb()
        .db('portfolio-builder')
        .collection("maintenance")
        .insertOne(createMaintenance);
    res.status(201).json(result);

};

module.exports = { getMaintenance, getMaintenanceById, createMaintenance };