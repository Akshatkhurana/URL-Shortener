const mongoose = require("mongoose");

async function ConnectToMongoDb(url) {
    return mongoose.connect(url);
}
module.exports = {
    ConnectToMongoDb,
}