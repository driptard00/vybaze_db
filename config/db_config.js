const mongoose = require("mongoose");

// Connect to MongoDb using Mongoose.
module.exports = mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});