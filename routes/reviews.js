import express from 'express';
import apiMethods from '../controllers/reviews.js';
const router = express.Router();

router.get('/:product_id', apiMethods.getReviews);
// router.post('/:product_id', apiMethods.postReviews);
router.get('/meta/:product_id', apiMethods.getMetadata);
// router.put('/:review_id/helpful', apiMethods.putHelpfulReview);
// router.put('/:review_id/report', apiMethods.putReportReview);

export default router;