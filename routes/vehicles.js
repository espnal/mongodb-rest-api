const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehicles');
const validation = require('../middleware/validate')
// validation.saveVehicles
router.get('/', vehiclesController.getAll);
router.get('/:id', vehiclesController.getSingle);
router.post('/', validation.saveVehicles, vehiclesController.createVehicle);
router.put('/:id',  validation.saveVehicles, vehiclesController.updateVehicle);
router.delete('/:id', vehiclesController.deleteVehicle);

module.exports = router;