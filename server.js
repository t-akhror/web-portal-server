const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const reviewRoutes = require("./routes/reviews");

dotenv.config();
// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// delete this body parser
app.use(bodyParser.urlencoded({ extended: true }));

// set cors
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  // accessControlAllowCredentials:true,
  optionSuccessStatus: 200,
};
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

// connection DB
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://akhror:q1w2e3r4@reviews.hz750kl.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    // listen request
    app.listen(4000, () => {
      console.log("connected DB and listening port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
