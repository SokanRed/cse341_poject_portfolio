const mongodb = require("../db/connect");

const ObjectId = require('mongodb').ObjectId;


const getMaintenance = async(req, res) => {
    try {
        const Db = await mongodb.getDb().db('portfolio-builder').collection("maintenance").find().toArray();
        res.status(200).json(Db);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving maintenances." });
    }
};

const getMaintenanceById = async(req, res) => {
    try {
        const maintenanceId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDb()
            .db('portfolio-builder')
            .collection("maintenance")
            .find({ _id: maintenanceId })
            .toArray();
        if (result.length === 0) {
            res.status(422).json({ error: `No maintenance found with ID: ${maintenanceId}` });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving the maintenance." });
    }
};

const createMaintenance = async(req, res) => {
    try {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the maintenance." });
    }
};

const updateMaintenanceById = async(req, res) => {
    try {
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
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(422).json({ error: `No maintenance found with ID: ${maintenanceId}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the maintenance." });
    }
};

const deleteMaintenanceById = async(req, res) => {
    try {
        const maintenanceId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDb()
            .db('portfolio-builder')
            .collection("maintenance")
            .deleteOne({ _id: maintenanceId }, true);
        if (result.deletedCount > 0) {
            res.status(200).send("Maintenance was deleted from the database.");
        } else {
            res.status(422).json({ error: `No maintenance found with ID: ${maintenanceId}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the maintenance." });
    }
};

module.exports = { getMaintenance, getMaintenanceById, createMaintenance, updateMaintenanceById, deleteMaintenanceById };