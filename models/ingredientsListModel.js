const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: String,
  classification: String,
});

const IngredientsList = mongoose.model("Ingredient", ingredientSchema);

module.exports = IngredientsList;
