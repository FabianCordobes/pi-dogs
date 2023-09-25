const axios = require('axios');

const getApiDogById = async (url, id) => {
   const { data } = await axios.getAdapter(`${url}/${id}`);

   const dogAPI = {
      id: data.id,
      image: `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`,
      name: data.name,
      height: data.height,
      weight: data.weight,
      life_span: data.life_span,
      temperament: data.temperament,
   };

   return dogAPI;
};

module.exports = { getApiDogById };