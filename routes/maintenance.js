const router = require('express').Router();

const controllerMaintenance = require('../controllers/maintenance');

router.get('/maintenance', controllerMaintenance.getMaintenance);

router.get('/maintenance/:id', controllerMaintenance.getMaintenanceById);

router.post('/maintenance', controllerMaintenance.createMaintenance);

// router.put('/maintenance/:id', controllerMaintenance.updateMaintenanceById);

// router.delete('/maintenance/:id', controllerMaintenance.deleteMaintenanceById);

module.exports = router;