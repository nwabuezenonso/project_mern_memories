// import the required dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js"; // import routes for routing

const app = express(); // initialize app
// dotenv.conig();

// MIDDLEWARE
app.use(bodyParser.json({ limit: "30mb", extended: true })); // set up body parser for recieving json data and images
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes); // running up routes

// setting up connection with mongodb
const CONNECTION_URL =
  "mongodb+srv://js_mastery:123123123@practice.jto9p.mongodb.net/test";

const PORT = process.env.PORT || 5000;

// connecting our app to the mongodb url
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
