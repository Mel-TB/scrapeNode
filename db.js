const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

function createTable() {
  const query = `
  CREATE TABLE IF NOT EXISTS list_ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(300) NOT NULL,
    classification VARCHAR(15) NOT NULL
  )
  `;
  return pool.query(query);
}

function insertIngredients(ingredients) {
  const query = `
  INSERT INTO list_ingredients(name, classification) VALUES ($1, $2)
  
  
  `;
  const queries = ingredients.map((ingredient) => {
    return pool.query(query, [ingredient.name, ingredient.classification]);
  });
  return Promise.all(queries);
}

module.exports = {
  createTable,
  insertIngredients,
};
