const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models");
const dbConfig = require("./config/db.config");
const Account = db.account;

db.mongoose.connect(`mongodbL//${dbConfig.HOST}/${dbConfig.DB}`, {
    useNewUrlPaser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => {
    console.log("Successfully connected to MongoDB!");
    initial();
})
.catch(err => {
    console.error("Connection Error", err);
    process.exit();
});

initial = () => {
    Account.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Account({
                username: "Child 1"
            }).save(err => {
                if (err) {
                    console.log(err)
                }

                console.log("Added 'Child 1' to Accounts collection!")
            });

            new Account({
                username: "Child 2"
            }).save(err => {
                if (err) {
                    console.log(err)
                }

                console.log("Added 'Child 2' to Accounts collection!")
            });
        };
    });
};

const corsOption = {
    origin: "https//localhost:3001"
};

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req,res) => {
    res.json({ message: "Welcome to the MongoDB & WebToken User Auth Test"});
});

// ROUTES 
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});