const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express()
dotenv.config();
const noteRoutes = require("./routes/notes.Routes");
app.use(cors());
app.use(express.json())
app.use("/api/notes", noteRoutes);


mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("mongodb connected"))
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT);
