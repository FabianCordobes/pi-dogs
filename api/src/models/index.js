// Importamos los módulos necesarios.
const { Sequelize } = require("sequelize");
const factoryDogs = require("./model_dogs");
const factoryTemperaments = require("./model_temperaments");
const { DB_USER, DB_HOST, DB_PASSWORD } = require("../utils/config");

// Creamos una instancia de Sequelize para gestionar la base de datos.
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogsapi`,
  {
    logging: false, // Evita que se muestren las consultas SQL en la consola
    native: false, // No utiliza pg-native para obtener un aumento de velocidad
  }
);

// Importamos los modelos y los inicializamos con la instancia de Sequelize.
const Dog = factoryDogs(sequelize);
const Temperament = factoryTemperaments(sequelize);

// Definimos las relaciones entre los modelos Dog y Temperament.
Dog.belongsToMany(Temperament, { through: "dog_temperament" });
Temperament.belongsToMany(Dog, { through: "dog_temperament" });

// Exportamos la instancia de Sequelize, junto con los modelos Dog y Temperament.
module.exports = {
  db: sequelize,
  Dog,
  Temperament,
};
