import express from 'express';
import db from '../db/index.js';
const router = express.Router();

router.get('/', (req, res) => {
  const queryString = 'SELECT * FROM reviews LIMIT 1'
  db.query(queryString, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results);
    }
  })
});


export default router;