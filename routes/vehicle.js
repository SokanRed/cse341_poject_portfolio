const router = require('express').Router();

const controllerVehicle = require('../controllers/vehicle');

const { vehicleIdValidate, vehicleDataValidate } = require('../validations/vehicle_valid');

const { validate } = require('../validations/validator');


router.get('/vehicle', controllerVehicle.getVehicle);

router.get('/vehicle/:id', vehicleIdValidate, validate, controllerVehicle.getVehicleById);

router.post('/vehicle', vehicleDataValidate, validate, controllerVehicle.createVehicle);

router.put('/vehicle/:id', vehicleIdValidate, vehicleDataValidate, validate, controllerVehicle.updateVehicleById);

router.delete('/vehicle/:id', vehicleIdValidate, validate, controllerVehicle.deleteVehicleById);


module.exports = router;