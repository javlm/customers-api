const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;
const app = express();
const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};

mongoose.connect(mongoURI)
  .then((db) => console.log("API is connected to", db.connection.host))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/users", require("./routes/user"));

app.use("/api", (request, response) => {
  response.status(200).json({ message: "Users API working" });
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
