import express from "express";
import cors from 'cors';
import { gettingCoords } from './markergetter.js';

const app = express();
const port = 3000;

app.use(cors());

app.get('/get-markers', async (req, res) => {
  const coords = await gettingCoords();
  res.json(coords);
});

app.listen(port, () => {
  console.log('running server at localhost:', port);
});