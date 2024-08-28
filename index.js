const express = require("express");
const app = express();
const path = require("path");
const port = 8000; // Changed port number
const urlRoute = require("./routes/url");
const { ConnectToMongoDb } = require("./connect");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRoutes")


app.set("view engine","ejs");
app.set("views",path.resolve("./views")); 

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use("/url",urlRoute); 
app.use("/",staticRoute);

app.get("/test",async (req,res) => {
    const AllUrls = await URL.find({});
    return res.render("home",{
        urls: AllUrls,
    });
});
ConnectToMongoDb('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log("MongoDb connected Successfully"))
    .catch((err) => console.error("MongoDb connection failed:", err));

app.get("/url/:shortId", async (req, res, next) => { // Added next parameter
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
        );

        if (entry) {
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).json({ Error: "Entry is empty" });
        }
    } catch (err) {
        next(err); 
    }
});
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).send("Internal Server Error");
});

app.listen(port, () => console.log("Server started at port:", port));
