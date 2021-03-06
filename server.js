const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const router = require("express").Router();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/pizza-hunt",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// use this to log mongo queries being executed
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
