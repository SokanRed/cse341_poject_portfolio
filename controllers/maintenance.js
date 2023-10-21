const mongodb = require("../db/connect");

const ObjectId = require('mongodb').ObjectId;


const getMaintenance = async(req, res) => {
    const Db = await mongodb.getDb().db('portfolio-builder').collection("maintenance").find().toArray();
    res.send(Db);
    if (result.acknowledged) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result.error || 'Some error occurred while searching maintenances.');
    }
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
    if (result.acknowledged) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result.error || `There is no maintenance with this Id:  ${maintenanceId}.`);
    }
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
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'Some error occurred while creating the maintenance.');
    }
};

const updateMaintenanceById = async(req, res) => {
    const maintenanceId = new ObjectId(req.params.id);
    const updateMaintenance = {
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
        .replaceOne({ _id: maintenanceId }, updateMaintenance);
    console.log(response);
    if (result.modifiedCount > 0) {
        res.status(204).send("Maintenance was updated.");
    } else {
        res.status(500).json(result.error || 'Some error occurred while updating the maintenance.');
    }
};

const deleteMaintenanceById = async(req, res) => {
    const maintenanceId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('portfolio-builder')
        .collection("maintenance")
        .deleteOne({ _id: maintenanceId }, true);
    console.log(result);
    if (result.deletedCount > 0) {
        res.status(200).send("Maintenance was deleted from database");
    } else {
        res.status(500).json(result.error || `There is no maintenance with this Id:  ${maintenanceId}.`)
    }
};

module.exports = { getMaintenance, getMaintenanceById, createMaintenance, updateMaintenanceById, deleteMaintenanceById };