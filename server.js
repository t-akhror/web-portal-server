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
  origin: "https://reviews-app.onrender.com",
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
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen request
    app.listen(process.env.PORT, () => {
      console.log("connected DB and listening port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
