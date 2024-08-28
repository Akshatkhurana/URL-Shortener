const express = require("express");
const router = express.Router();
const { GeneratenewURL, GetAnalytics } = require("../controllers/url")
router.post("/",GeneratenewURL);
router.get("/analytics/:shortId",GetAnalytics);
module.exports = router;