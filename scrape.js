const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./DB");

async function scrapeIngredients() {
  try {
    const response = await axios.get(process.env.SCRAPE_URL);
    const html = await response.data;

    const $ = cheerio.load(html);
    const veganIngredients = [];
    const nonVeganIngredients = [];
    const bothIngredients = [];

    $("font").each((i, element) => {
      const ingredientText = $(element).text().trim();
      const ingredientsList = ingredientText.replace(":", "");

      if (ingredientText.includes("(V)")) {
        const name = ingredientsList.replace("(V)", "");
        veganIngredients.push({ name, classification: "(V)" });
      }
      if (ingredientText.includes("(A)")) {
        const name = ingredientsList.replace("(A)", "");
        nonVeganIngredients.push({ name, classification: "(A)" });
      }
      if (ingredientText.includes("(B)")) {
        const name = ingredientsList.replace("(B)", "");
        bothIngredients.push({ name, classification: "(B)" });
      }
    });

    await db.createTable();
    await db.insertIngredients(veganIngredients);
    await db.insertIngredients(nonVeganIngredients);
    await db.insertIngredients(bothIngredients);
    console.log("Succeeded successfully");
  } catch (err) {
    console.log(`Error ${err}`);
  }
}

scrapeIngredients();
module.exports = scrapeIngredients;
