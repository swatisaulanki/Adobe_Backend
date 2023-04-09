const mongoose = require("mongoose");
require("dotenv").config();

const connections = mongoose.connect(process.env.MONGO_DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

module.exports = connections;