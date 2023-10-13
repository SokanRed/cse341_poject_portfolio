const router = require('express').Router();

const controllerVehicle = require('../controllers/vehicles');

router.get('/vehicles', controllerVehicle.getVehicle);

router.get('/vehicles/:id', controllerVehicle.getVehicleById);

router.post('/vehicles', controllerVehicle.postVehicle);

router.put('/vehicles/:id', controllerVehicle.putVehicleById);

router.delete('/vehicles/:id', controllerVehicle.deleteVehicleById);

module.exports = router;