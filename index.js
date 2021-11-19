import express from 'express';
import reviewsRouter from './routes/reviews.js';
import db from './db/index.js';

const app = express();
const port = 4000;
// const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/reviews', reviewsRouter);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => console.log(`Listening ot http://localhost:${port}`));