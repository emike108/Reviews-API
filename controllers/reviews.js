import db from '../db/index.js';

const apiMethods = {
  getReviews: async (req, res) => {
    try {
      const productId = req.params.product_id;
      const page = req.params.page;
      const count = req.params.count;

      const queryString1 = `SELECT id AS review_id, rating, summary, recommend, response, body, FROM_UNIXTIME(date/1000) AS date, reviewer_name, helpfulness FROM reviews WHERE product_id=?`
      const response = {
        product: productId,
        page: page || 0,
        count: count || 5,
        results: []
      }
      const reviewsResults = await db.query(queryString1, productId);
      const reviewsResultsData = reviewsResults[0]
      for (let i = 0; i < reviewsResultsData.length; i++) {
        const review = reviewsResultsData[i]
        review['photos'] = []
        const reviewId = review.review_id;
        const queryString2 = `SELECT id, url FROM reviews_photos WHERE review_id=?`;
        const photosResults = await db.query(queryString2, reviewId)
        const photosResultsData = photosResults[0]
        if (photosResultsData.length > 0) {
          for (let x = 0; x < photosResultsData.length; x++) {
            review.photos.push(photosResultsData[x])
          }
        }
        response.results.push(review)
      }
      console.log(`Successfully obtained reviews for product ${productId}`)
      res.status(200).json(response);
    } catch(err) {
      console.error('error at getReviews', err)
      res.status(500).send(err)
    }
  },
  postReviews: {},
  getMetadata: {},
  putHelpfulReview: {},
  putReportReview: {}
}

export default apiMethods;