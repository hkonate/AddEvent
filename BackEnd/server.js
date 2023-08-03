const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
mongoose.connect(process.env.MONGODB_URL);
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const userRouter = require("./routes/users");
app.use(userRouter);

const eventsRouter = require("./routes/events");
app.use(eventsRouter);

app.listen(PORT, () => {
  console.log("Server LIVE!!!!!");
});
