const express = require('express');
const controller = require('../controller/api_doctors')
const router = express.Router();

router.get('/',controller.getDoctors);
router.get('/:id',controller.getDoctorsById);
router.get('/:id/availability',controller.getAvailability);
router.post('/book',controller.bookSlot);

module.exports = router;