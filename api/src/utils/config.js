require("dotenv").config();

// Obtiene las variables de entorno y las exportam
const env = process.env;

module.exports = {
  // Exporta las variables de entorno
  DB_USER: env.DB_USER,
  DB_PASSWORD: env.DB_PASSWORD,
  DB_HOST: env.DB_HOST,
  URL: "https://pi-dogs-texg.onrender.com/",
  API_KEY: env.API_Key,
};