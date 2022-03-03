const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

router.param('id', tourController.checkID);


router
.route('/')
.get(tourController.getTour)
.post(tourController.checkBody, tourController.createTour);

router
.route('/:id')
.get(tourController.getTourbyId)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = router;