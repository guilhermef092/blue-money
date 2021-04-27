import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes.js';

dotenv.config();
const app = express();
const {SERVER_PORT} = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(SERVER_PORT, () => {
  console.log(`SERVIDOR RODANDO NA PORTA: ${SERVER_PORT}`);
});