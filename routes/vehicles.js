const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehicles');
const validation = require('../middleware/validate')

router.get('/', vehiclesController.getAll);
router.get('/:id', validation.saveVehicles, vehiclesController.getSingle);
router.post('/', vehiclesController.createVehicle);
router.put('/:id', validation.saveVehicles, vehiclesController.updateVehicle);
router.delete('/:id', validation.saveVehicles, vehiclesController.deleteVehicle);

module.exports = router;