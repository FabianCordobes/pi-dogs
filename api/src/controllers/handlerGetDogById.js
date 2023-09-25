const { getDbDogsById } = require('./getDbDogById');
const { getApiDogById } = require('./getApiDogById')

const handlerGetDogById = async (req, res) => {
   try {
      const { idRaza } = req.params;
      console.log(idRaza);
      const uuidRegex = 
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

      const URL_API = `https://api.thedogapi.com/v1/breeds`;

      const dogFound = 
      !uuidRegex.test(idRaza) && Number(idRaza)
         ? await getApiDogById(URL_API, idRaza)
         :await getDbDogById(idRaza);

      if (idRaza && !dogFound.id) {
         throw new Error(
            `No se encontró nungún perro con número de id: ${idRaza} `
         );
      }

      res.status(200).json(dogFound);
   } catch (error) {
      res.status(500).send(error.message);
   }
};

module.exports = { handlerGetDogById };