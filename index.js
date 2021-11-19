import express from 'express';


const app = express();
const port = 4000;
const router = express.Router();

app.get('/', (req, res) => {
  res.send('hello world');
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))