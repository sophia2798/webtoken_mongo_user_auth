const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

const corsOption = {
    origin: "https//localhost:3001"
};

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req,res) => {
    res.json({ message: "Welcome to the MongoDB & WebToken User Auth Test"});
});

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});