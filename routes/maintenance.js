const router = require('express').Router();

const controllerMaintenance = require('../controllers/maintenance');

const { maintenanceIdValidate, maintenanceDataValidate } = require('../validations/maintenance_valid');

const { validate } = require('../validations/validator');


router.get('/maintenance', controllerMaintenance.getMaintenance);

router.get('/maintenance/:id', maintenanceIdValidate, validate, controllerMaintenance.getMaintenanceById);

router.post('/maintenance', maintenanceDataValidate, validate, controllerMaintenance.createMaintenance);

router.put('/maintenance/:id', maintenanceIdValidate, maintenanceDataValidate, validate, controllerMaintenance.updateMaintenanceById);

router.delete('/maintenance/:id', maintenanceIdValidate, validate, controllerMaintenance.deleteMaintenanceById);


module.exports = router;