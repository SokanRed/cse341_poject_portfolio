const router = require('express').Router();

const controllerVehicle = require('../controllers/vehicle');

router.get('/vehicle', controllerVehicle.getVehicle);

router.get('/vehicle/:id', controllerVehicle.getVehicleById);

router.post('/vehicle', controllerVehicle.createVehicle);

// router.put('/vehicle/:id', controllerVehicle.putVehicleById);

router.delete('/vehicle/:id', controllerVehicle.deleteVehicleById);

module.exports = router;