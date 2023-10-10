// Importamos los módulos necesarios.
require('dotenv').config();
const { Sequelize } = require('sequelize');
const factoryDogs = require('./model_dogs');
const factoryTemperaments = require('./model_temperaments');

const { DB_USER, DB_HOST, DB_PASSWORD, DB_NAME } = process.env;
console.log(process.env.DB_HOST);

// Creamos una instancia de Sequelize para gestionar la base de datos.
const sequelize = new Sequelize(`${DB_HOST}`, {
	logging: false,
	native: false,
});

// Importamos los modelos y los inicializamos con la instancia de Sequelize.
const Dog = factoryDogs(sequelize);
const Temperament = factoryTemperaments(sequelize);

// Definimos las relaciones entre los modelos Dog y Temperament.
Dog.belongsToMany(Temperament, { through: 'dog_temperament' });
Temperament.belongsToMany(Dog, { through: 'dog_temperament' });

// Exportamos la instancia de Sequelize, junto con los modelos Dog y Temperament.
module.exports = {
	db: sequelize,
	Dog,
	Temperament,
};
