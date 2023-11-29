require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const IngredientsList = require("./models/ingredientsListModel");
const AdditivesList = require("./models/additivesListModel");
const mongoose = require("mongoose");

const passwordMONGO = process.env.MONGODB_PASSWORD;
const SCRAPE_URL_INGREDIENTS = process.env.SCRAPE_URL;
const SCRAPE_URL_ADDITIVES = process.env.SCRAPE_URL_ADDITIVES;

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
const additives = [];

async function scrapeIngredients() {
  try {
    const response = await axios.get(SCRAPE_URL_INGREDIENTS);
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

async function scrapeAdditives() {
  try {
    const response = await axios.get(SCRAPE_URL_ADDITIVES);
    const html = response.data;
    const $ = cheerio.load(html);

    //   Iterate through all the <td> tags
    $("td a").each((i, element) => {
      const additiveText = $(element).text().trim();
      const parts = additiveText.split(/\s+(.+)/);

      if (parts.length >= 2) {
        const additive = {
          number: parts[0].trim(),
          name: parts[1].trim().replace("-", ""),
        };
        additives.push(additive);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function saveAdditives(additives) {
  try {
    await AdditivesList.insertMany(additives);
    console.log("Additives save to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

async function scrapeAndSaveAdditives() {
  await scrapeAdditives();

  await saveAdditives(additives);
  mongoose.disconnect().then(() => console.log("MongoDB disconnected"));
}

scrapeAndSaveIngredients();
scrapeAndSaveAdditives();

// module.exports = scrapeIngredients;
