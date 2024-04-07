
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 5001;

// MongoDB connection
mongoose.connect(
    "mongodb+srv://dbfenil:STjTtRC7Fi1KS6ls@cluster0.fiab4b3.mongodb.net/demo?retryWrites=true&w=majority"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
app.use("/product", productRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});