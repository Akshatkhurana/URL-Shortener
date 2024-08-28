const URL = require("../models/url");

async function GeneratenewURL(req,res) {
    const { nanoid } = await import('nanoid');
    const shortID = nanoid(8);
    const body = req.body;
    if(!body.url) return res.status(400).json({Error : "URL is required"})
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    })
    // return res.json({id : shortID});
    return res.render("home", {
        id: shortID,
    })
}
async function GetAnalytics(req,res) {
    const shortId = req.params.shortID;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}
module.exports = {
    GeneratenewURL,
    GetAnalytics,
}