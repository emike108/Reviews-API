import db from '../db/index.js';

const apiMethods = {
  getReviews: async (req, res) => {
    try {
      const productId = req.params.product_id;
      const page = req.params.page;
      const count = req.params.count;

      const generatedResponse = {
        product: productId,
        page: page || 0,
        count: count || 5,
        results: []
      }

      const queryString1 = `SELECT id AS review_id, rating, summary, recommend, response, body, FROM_UNIXTIME(date/1000) AS date, reviewer_name, helpfulness FROM reviews WHERE product_id=?`
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
        generatedResponse.results.push(review)
      }
      console.log(`Successfully obtained reviews for product ${productId}`)
      res.status(200).json(generatedResponse);
    } catch(err) {
      console.error('error at getReviews', err)
      res.status(500).send(err)
    }
  },
  getMetadata: async (req, res) => {
    try {
      const productId = req.params.product_id;

      const generatedResponse = {
        product: productId,
        ratings: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        },
        recommended: {
          false: 0,
          true: 0
        },
        characteristics: {}
      }

      const queryString = `SELECT id, name FROM characteristics WHERE product_id=?`
      const charQuery = await db.query(queryString, productId)
      const productCharacteristics = charQuery[0]
      for (let i = 0; i < productCharacteristics.length; i++) {
        const charToAdd = productCharacteristics[i].name
        const idToAdd = productCharacteristics[i].id
        generatedResponse.characteristics[charToAdd] = {
          id: idToAdd,
          value: 0
        }
      }
      const queryString2 = `SELECT rating, recommend FROM reviews WHERE product_id=${productId}`
      const rateAndRecommend = await db.query(queryString2)
      const rateAndRecommendCount = rateAndRecommend[0]
      for (let x = 0; x < rateAndRecommendCount.length; x++) {
        const currentRating = rateAndRecommendCount[x].rating
        const currentRecommend = rateAndRecommendCount[x].recommend
        generatedResponse.ratings[currentRating]++
        generatedResponse.recommended[currentRecommend]++
      }
      const queryString3 = `SELECT cr.value, c.name FROM characteristic_reviews cr INNER JOIN reviews r ON cr.review_id=r.id INNER JOIN characteristics c ON cr.characteristic_id=c.id WHERE r.product_id=${productId}`
      const charValues = await db.query(queryString3)
      const numberOfRows = await db.query(`SELECT COUNT(*) AS number FROM reviews WHERE product_id=${productId}`)
      const numberOfReviews = numberOfRows[0][0]['number']
      const charValuesData = charValues[0];
      for (let y = 0; y < charValuesData.length; y++) {
        const charDescription = charValuesData[y].name
        const charValue = charValuesData[y].value
        generatedResponse.characteristics[charDescription].value += (charValue/numberOfReviews)
      }

      res.status(200).json(generatedResponse)

    } catch(err) {
      console.error('error at getMetadata', err)
      res.status(500).send(err)
    }
  },
  postReviews: {},
  putHelpfulReview: {},
  putReportReview: {}
}

export default apiMethods;