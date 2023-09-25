const { Dog } = require('../db/db');

const handlerCreateDog = async (req, res) => {
   try {
      const { name, image, height, weight, lifeSpan, temperament, price } = req.body;

      if (!name || !height || !weight || !lifeSpan || !temperament) {
         throw new Error("Faltan datos para la creacion");
      }

      const newDog = await Dog.create({
         name,
         image: image ? image : null,
         height,
         weight,
         life_span: lifeSpan,
         price: price,
      });

      newDog.addTemperament(temperament);

      res.status(201).json(newDog);
   } catch (error) {
      res.status(500).send(error.message);
   }
};

module.exports = { handlerCreateDog };