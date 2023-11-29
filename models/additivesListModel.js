const mongoose = require("mongoose");

const AdditivesSchema = new mongoose.Schema({
  number: String,
  name: String,
});

const AdditivesList = mongoose.model("Additives", AdditivesSchema);

module.exports = AdditivesList;
