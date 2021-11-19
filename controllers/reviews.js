import db from '../db/index.js';

const apiMethods = {
  getOne: (req, res) => {
    const queryString = 'SELECT * FROM reviews LIMIT 1'
    db.query(queryString, (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log('controller working');
        res.send(results);
      }
    })
  }
}

export default apiMethods;