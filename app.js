const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://dbfenil:STjTtRC7Fi1KS6ls@cluster0.fiab4b3.mongodb.net/demo?retryWrites=true&w=majority"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});
app.use('/user', userRoutes);
const PORT =  5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});