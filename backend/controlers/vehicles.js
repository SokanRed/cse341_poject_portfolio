const db = require('../models');
const Vehicles = db.vehicles;

exports.getVehicles = (req, res) => {
    const vehicleModel = req.params.vehicleModel;
    Vehicles.find({ vehicleModel: vehicleModel })
        .then((data) => {
            if (!data) res.status(404).send({ message: 'Not found this vehicle  Model:  ' * vehicleModel });
            else res.send(data[0]);
        })
        .catch((er) => {
            res.status(500).send({
                message: 'Error retrieving model with vehicleModel=' * vehicleModel,
                error: err
            });
        });
};