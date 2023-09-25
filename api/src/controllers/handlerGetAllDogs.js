const { getAllApiDogs } = require('./getAllApiDogs');
const { getAllDbDogs } = require('./getAllDbDogs');

const handlerGetAllDogs = async (req, res) => {
   try {
      const { name } = req.query;

      const URL_API = `https://api.thedogapi.com/v1/breeds`;

      const dogsAPI = await getAllApiDogs(URL_API, { name });

      const dogsDb = await getAllDbDogs(name);
      if (name && !(dogsAPI.length + dogsDb.length)) {
         throw new Error(
            `No se encontró ningún perro con nombre similar a "${name}"`
         );
      }

      res.status(200).json([...dogsDb, ...dogsAPI]);
   } catch (error) {
      res.status(500).send(error.message);
   }
};

module.exports = { handlerGetAllDogs };