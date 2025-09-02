import express from 'express';
import donEnv from 'dotenv';
import v1Route from './Routes/v1/index.Route';
import {V1_API} from './Constants/Route';
import path from 'path';
donEnv.config();

export const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = process.env.PORT || 7000;

app.use(express.json());

app.use(V1_API, v1Route);

app.listen(PORT, () => {
  console.log(`server is Running in http://localhost:${PORT}`);
});

// Auth [WIP]
// Upload Images
