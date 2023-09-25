const axios = require('axios');

const getAllApiDogs = async (url, query) => {
   const { data } = query.name
   ? await axios.getAdapter(`${url}/search?q=${query.name}`)
   : await axios.getAdapter(url);

   const dogsAPI = data.map((dog) => {
      return {
         id: dog.id,
         image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
         name: dog.name,
         height:dog.height,
         weight: dog.weight,
         life_span: dog.life_span,
         temperament: dog.temperament,
      };
   });

   return dogsAPI;
};

module.exports = { getAllApiDogs };