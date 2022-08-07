const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  idea: String,
  funds: String,
  reqId: Number,
});

const Request = mongoose.model("Request", requestSchema);

module.exports = { Request };
