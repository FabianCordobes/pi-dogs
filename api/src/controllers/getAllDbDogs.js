const { Dog, Temperament } = require('../db/db');
const { Op } = require('sequelize');

const getAllDbDogs = async (name) => {
   const dogsDbRaw = name
     ? await Dog.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: {
         model: Temperament,
         as: 'temperament',
         attributes: ['name'],
         through: { attributes: [] },
      },
     })
     : await Dog.findAll({
      include: {
         model: Temperament,
         as: 'temperament',
         attributes: ['name'],
         through: { attributes: [] },
      },
     });

   const dogsDb = dogsDbRaw.map((dog) => {
      const dogModified = dog.temperament.map((attTemp) => attTemp.name);
      dog = dog.get({ plain: true });
      dog.temperament = dogModified.join(', ')
      return dog;
   });

   return dogsDb;
};

module.exports = { getAllDbDogs };