const express = require('express');
const router  = express.Router();
const upload  = require('../middleware/upload');
const { validateSeries } = require('../middleware/validate');
const ctrl    = require('../controllers/seriesController');

router.get('/',                ctrl.getAll);
router.get('/:id',             ctrl.getById);
router.post('/',               upload.single('image'), validateSeries, ctrl.create);
router.put('/:id',             upload.single('image'), validateSeries, ctrl.update);
router.delete('/:id',          ctrl.remove);

router.get('/:id/rating',      ctrl.getRating);
router.post('/:id/rating',     ctrl.addRating);

module.exports = router;
