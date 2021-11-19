import express from 'express';
import apiMethods from '../controllers/reviews.js';
const router = express.Router();

router.get('/', apiMethods.getOne);//edit to match docs
// router.post('/', apiMethods.);
// router.get('/meta', apiMethods.);
// router.put('/:review_id/helpful', apiMethods.);
// router.put('/:review_id/report', apiMethods.);

export default router;