const validators = (form) => {
   const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;
   const regexURL = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
   const regexNumber = /^[0-9]+$/;
 
   let errors = {};
 
   // NAME
   errors.name = !form.name
     ? "Name is required"
     : !regexName.test(form.name)
     ? "The name can only contain letters and spaces"
     : form.name.length > 25
     ? "The name must be less than 20 characters "
     : "";
 
   // IMAGE
   errors.image = !form.image
     ? "Image is required"
     : !regexURL.test(form.image)
     ? "The URL entered is not correct"
     : "";
 
   // MIN-HEIGHT
   errors.minHeight = !parseInt(form.minHeight)
     ? "Min height is required"
     : !regexNumber.test(form.minHeight)
     ? "The height must be a number"
     : parseInt(form.minHeight) <= 0 || parseInt(form.minHeight) >= parseInt(form.maxHeight)
     ? "The minimum height cannot be less than 0 or greater than the maximum height"
     : parseInt(form.minHeight) > 100
     ? "The height cannot exceed 100 centimeters"
     : "";
 
   // MAX-HEIGHT
   errors.maxHeight = !parseInt(form.maxHeight)
     ? "Max height is required"
     : !regexNumber.test(form.maxHeight)
     ? "The height must be a number"
     : parseInt(form.maxHeight) <= 0 || parseInt(form.minHeight) >= parseInt(form.maxHeight)
     ? "The maximum height cannot be less than 0 or less than the minimum height"
     : parseInt(form.maxHeight) > 100
     ? "The height cannot exceed 100 centimeters"
     : "";
 
   // MIN-WEIGHT
   errors.minWeight = !parseInt(form.minWeight)
     ? "Min weight is required"
     : !regexNumber.test(form.minWeight)
     ? "The weight must be a number"
     : parseInt(form.minWeight) <= 0 || parseInt(form.minWeight) >= parseInt(form.maxWeight)
     ? "The minimum weight cannot be less than 0 or greater than the maximum weight"
     : parseInt(form.minWeight) > 100
     ? "The weight cannot exceed 100 kilograms"
     : "";
 
   // MAX-WEIGHT
   errors.maxWeight = !parseInt(form.maxWeight)
     ? "Max weight is required"
     : !regexNumber.test(form.maxWeight)
     ? "The weight must be a number"
     : parseInt(form.maxWeight) <= 0 || parseInt(form.minWeight) >= parseInt(form.maxWeight)
     ? "The maximum weight cannot be less than 0 or less than the minimum weight"
     : parseInt(form.maxWeight) > 100
     ? "The weight cannot exceed 100 kilograms"
     : "";
 
   // MIN-LIFE SPAN
   errors.minLifeSpan = !parseInt(form.minLifeSpan)
     ? "Min life span is required"
     : !regexNumber.test(form.minLifeSpan)
     ? "The Life span must be a number"
     : parseInt(form.minLifeSpan) <= 0 || parseInt(form.minLifeSpan) >= parseInt(form.maxLifeSpan)
     ? "The minimum life span cannot be less than 0 or greater than the maximum life span"
     : parseInt(form.minLifeSpan)> 20
     ? "The life span cannot exceed 20 years"
     : "";
 
   // MAX LIFE SPAN
   errors.maxLifeSpan = !parseInt(form.maxLifeSpan)
   ? "Max life span is required"
   : !regexNumber.test(form.maxLifeSpan)
   ? "The Life span must be a number"
   : parseInt(form.maxLifeSpan) <= 0 || parseInt(form.maxLifeSpan) <= parseInt(form.minLifeSpan)
   ? "The maximum life span cannot be less than 0 or less than the minimum life span"
   : parseInt(form.maxLifeSpan) > 20
   ? "The life span cannot exceed 20 years"
   : "";
 
   //BREED GROUP
   errors.breed_group = !regexName.test(form.breed_group)
     ? "The breed group can only contain letters and spaces"
     : "";
 
   // TEMPERAMENTS
   if (!form.temperaments.length) {
     errors.temperaments = "The breed must have at least one temperament";
   } else {
     errors.temperaments = "";
   }
 
   return errors;
 };
 
 export default validators;