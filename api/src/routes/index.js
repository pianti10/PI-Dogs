const { Router } = require('express');
const router = Router();
const breedRoute = require('./Breed.routes');
const temperamentsRoute = require('./Temperament.routes');

router.use('/dogs', breedRoute);
router.use('/temperaments', temperamentsRoute);

module.exports = router;
