// import express and other files for the server
import express from 'express';
// bodyParser to parsing data
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

// import routes for routing
import postRoutes from './routes/posts.js';

// initialize app and 
const app = express();
// dotenv.conig();

// MIDDLEWARE
// set up body parser for recieving json data and data from form
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
// app.use post for all post routes
app.use('/posts', postRoutes);

// CONNECTION URL
const CONNECTION_URL = 'mongodb+srv://js_mastery:123123123@practice.jto9p.mongodb.net/test';
// PORT
const PORT = process.env.PORT|| 5000;

// connecting our app to the mongodb url
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);