import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

require("dotenv").config()

const app = express();
const corsOptions = {
    origin: 'http://localhost:5500', // Allow only requests from this origin
    methods: 'GET,POST,PUT,DELETE', // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};

app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser())
app.use(bodyParser.json());
const server = http.createServer(app);
server.listen(8080, () => {
    console.log("Server is running on port 8080");
});

const MONGO_URL = process.env.MONGO_URL;
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) =>console.log(error));
app.use('/api/v1/', router());