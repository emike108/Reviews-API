import db from '../db/index.js';

const apiMethods = {
  getReviews: async (req, res) => {
    const productId = req.params.product_id;
    const page = req.params.page;
    const count = req.params.count;

    const queryString = `SELECT id AS review_id, rating, summary, recommend, response, body, FROM_UNIXTIME(date/1000) AS date, reviewer_name, helpfulness FROM reviews WHERE product_id=?`
    const response = {
      product: productId,
      page: page || 0,
      count: count || 5,
      results: []
    }
    db.query(queryString, productId, (err, reviewsResults) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Reviews returned for product ID ${productId}`);
        reviewsResults.forEach(review => {
          review['photos'] = []
          const reviewId = review.review_id;
          const queryString = `SELECT id, url FROM reviews_photos WHERE review_id=?`;
          db.query(queryString, reviewId, (err, photosResults) => {
            if (err) console.error('at photos', err)
            if (photosResults.length > 0) {
              photosResults.forEach(photoInfo => {
                review.photos.push(photoInfo)
                console.log(review)
              })
            }
          })
          response.results.push(review)
        })
      }
      res.json(response);
    })
  },
  postReviews: {},
  getMetadata: {},
  putHelpfulReview: {},
  putReportReview: {}
}

export default apiMethods;