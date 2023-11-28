require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const IngredientsList = require("./models/ingredientsListModel");
const mongoose = require("mongoose");

const passwordMONGO = process.env.MONGODB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://melinda:${passwordMONGO}@ingredients.djvhixv.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const veganIngredients = [];
const nonVeganIngredients = [];
const bothIngredients = [];

async function scrapeIngredients() {
  try {
    const response = await axios.get(
      "https://www.veganpeace.com/ingredients/ingredients.htm"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    //   Iterate through all the <font> tags
    $("font").each((i, element) => {
      const ingredientText = $(element).text().trim();
      const ingredientsList = ingredientText.replace(":", "");

      // Check if text contains (V) === Vegan
      if (ingredientText.includes("(V)")) {
        const name = ingredientsList.replace("(V)", "");
        veganIngredients.push({ name, classification: "Vegan" });
      }
      // Check if text contains (A) === Animals
      if (ingredientText.includes("(A)")) {
        const name = ingredientsList.replace("(A)", "");
        nonVeganIngredients.push({ name, classification: "Non-Vegan" });
      }

      // Check if text contains (B) === Both
      if (ingredientText.includes("(B)")) {
        const name = ingredientsList.replace("(B)", "");
        bothIngredients.push({
          name,
          classification: "Both",
        });
      }
    });

    const veganIngredientsLength = veganIngredients.length;
    const nonVeganIngredientsLength = nonVeganIngredients.length;
    const bothIngredientsLength = bothIngredients.length;

    console.log(veganIngredientsLength);
    console.log(nonVeganIngredientsLength);
    console.log(bothIngredientsLength);
  } catch (error) {
    console.log(error);
  }
}

async function saveIngredients(ingredients) {
  try {
    await IngredientsList.insertMany(ingredients);
    console.log("Ingredients save to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

async function scrapeAndSaveIngredients() {
  await scrapeIngredients();

  await saveIngredients(veganIngredients);
  await saveIngredients(nonVeganIngredients);
  await saveIngredients(bothIngredients);

  mongoose.disconnect().then(() => console.log("MongoDB disconnected"));
}

scrapeAndSaveIngredients();

module.exports = scrapeIngredients;
