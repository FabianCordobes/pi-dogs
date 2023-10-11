// Funcion para validar los campos al crear un perro.
function validateDogCreationFields({
   name,
   image,
   minHeight,
   maxHeight,
   minWeight,
   maxWeight,
   minLifeSpan,
   maxLifeSpan,
   temperaments,
 }) {
   // Comprobamos si alguno de los campos requeridos esta vacio.
   if (
     !minHeight ||
     !maxHeight ||
     !minWeight ||
     !maxWeight ||
     !minLifeSpan ||
     !maxLifeSpan ||
     !name ||
     !image
   ) {
     throw new Error("You must fill in all the required information");
   } else if (
     // Comprueba si alguno de los valores de altura, peso o vida es negativo
     minHeight <= 0 ||
     maxHeight <= 0 ||
     minWeight <= 0 ||
     maxWeight <= 0 ||
     minLifeSpan <= 0 ||
     maxLifeSpan <= 0
   ) {
     throw new Error("The height, weight or life span value cannot be negative");
   } else if (minHeight >= maxHeight) { // Comprueba si la altura minima es mayor o igual que la altura maxima.
     throw new Error(
       "The minimum height is greater than or equal to the maximum height, please validate data"
     );
   } else if (minWeight >= maxWeight) { // Comprueba si el peso minimo es mayor o igual que el peso maximp
     throw new Error(
       "The minimum weight is greater than or equal to the maximum weight, please validate data"
     );
   } else if (minLifeSpan >= maxLifeSpan) { // Comprueba si la duracion de vida minima es mayor o igual que la duracion de vida maxima
     throw new Error(
       "The minimum life span is greater than or equal to the maximum weight, please validate data"
     );
   }
 }
 
 module.exports = {
   validateDogCreationFields,
 };