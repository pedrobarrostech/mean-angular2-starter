import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import catCtrl from '../controllers/cat';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/cats - Get list of cats */
  .get(catCtrl.list)

  /** POST /api/cats - Create new cat */
  .post(validate(paramValidation.createCat), catCtrl.create);

router.route('/:catId')
  /** GET /api/cats/:catId - Get cat */
  .get(catCtrl.get)

  /** PUT /api/cats/:catId - Update cat */
  .put(validate(paramValidation.updateCat), catCtrl.update)

  /** DELETE /api/cats/:catId - Delete cat */
  .delete(catCtrl.remove);

/** Load cat when API with catId route parameter is hit */
router.param('catId', catCtrl.load);

export default router;
