const validators = (form) => {  // Define una función llamada 'validators' que toma un objeto 'form' como argumento
  const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;  // Expresión regular para validar el formato del nombre
  const regexURL = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;  // Expresión regular para validar el formato de la URL de la imagen
  const regexNumber = /^[0-9]+$/;  // Expresión regular para validar que un valor sea un número

  let errors = {};  // Inicializa un objeto vacío llamado 'errors' para almacenar los mensajes de error

  // NAME
  errors.name = !form.name  // Si no se ha proporcionado un nombre
    ? "Name is required"  // Establece un mensaje de error que indica que el nombre es obligatorio
    : !regexName.test(form.name)  // Si el nombre no coincide con el formato permitido
    ? "The name can only contain letters and spaces"  // Establece un mensaje de error que indica el formato incorrecto
    : form.name.length > 25  // Si la longitud del nombre es mayor que 25 caracteres
    ? "The name must be less than 20 characters "  // Establece un mensaje de error que indica que el nombre no debe exceder los 20 caracteres
    : "";  // No hay error en el nombre

  // IMAGE
  errors.image = !form.image  // Si no se ha proporcionado una URL de imagen
    ? "Image is required"  // Establece un mensaje de error que indica que la imagen es obligatoria
    : !regexURL.test(form.image)  // Si la URL de la imagen no coincide con el formato permitido
    ? "The URL entered is not correct"  // Establece un mensaje de error que indica el formato incorrecto
    : "";  // No hay error en la URL de la imagen

  // MIN-HEIGHT
  errors.minHeight = !parseInt(form.minHeight)  // Si no se ha proporcionado una altura mínima válida
    ? "Min height is required"  // Establece un mensaje de error que indica que la altura mínima es obligatoria
    : !regexNumber.test(form.minHeight)  // Si la altura mínima no es un número válido
    ? "The height must be a number"  // Establece un mensaje de error que indica que la altura debe ser un número
    : parseInt(form.minHeight) <= 0 || parseInt(form.minHeight) >= parseInt(form.maxHeight)  // Si la altura mínima está fuera del rango válido
    ? "The minimum height cannot be less than 0 or greater than the maximum height"  // Establece un mensaje de error de rango incorrecto
    : parseInt(form.minHeight) > 100  // Si la altura mínima es mayor que 100
    ? "The height cannot exceed 100 centimeters"  // Establece un mensaje de error que indica que la altura no debe exceder los 100 centímetros
    : "";  // No hay error en la altura mínima

  // MAX-HEIGHT
  errors.maxHeight = !parseInt(form.maxHeight)  // Si no se ha proporcionado una altura máxima válida
    ? "Max height is required"  // Establece un mensaje de error que indica que la altura máxima es obligatoria
    : !regexNumber.test(form.maxHeight)  // Si la altura máxima no es un número válido
    ? "The height must be a number"  // Establece un mensaje de error que indica que la altura debe ser un número
    : parseInt(form.maxHeight) <= 0 || parseInt(form.minHeight) >= parseInt(form.maxHeight)  // Si la altura máxima está fuera del rango válido
    ? "The maximum height cannot be less than 0 or less than the minimum height"  // Establece un mensaje de error de rango incorrecto
    : parseInt(form.maxHeight) > 100  // Si la altura máxima es mayor que 100
    ? "The height cannot exceed 100 centimeters"  // Establece un mensaje de error que indica que la altura no debe exceder los 100 centímetros
    : "";  // No hay error en la altura máxima

  // MIN-WEIGHT
  errors.minWeight = !parseInt(form.minWeight)  // Si no se ha proporcionado un peso mínimo válido
    ? "Min weight is required"  // Establece un mensaje de error que indica que el peso mínimo es obligatorio
    : !regexNumber.test(form.minWeight)  // Si el peso mínimo no es un número válido
    ? "The weight must be a number"  // Establece un mensaje de error que indica que el peso debe ser un número
    : parseInt(form.minWeight) <= 0 || parseInt(form.minWeight) >= parseInt(form.maxWeight)  // Si el peso mínimo está fuera del rango válido
    ? "The minimum weight cannot be less than 0 or greater than the maximum weight"  // Establece un mensaje de error de rango incorrecto
    : parseInt(form.minWeight) > 100  // Si el peso mínimo es mayor que 100
    ? "The weight cannot exceed 100 kilograms"  // Establece un mensaje de error que indica que el peso no debe exceder los 100 kilogramos
    : "";  // No hay error en el peso mínimo

  // MAX-WEIGHT
  errors.maxWeight = !parseInt(form.maxWeight)  // Si no se ha proporcionado un peso máximo válido
    ? "Max weight is required"  // Establece un mensaje de error que indica que el peso máximo es obligatorio
    : !regexNumber.test(form.maxWeight)  // Si el peso máximo no es un número válido
    ? "The weight must be a number"  // Establece un mensaje de error que indica que el peso debe ser un número
    : parseInt(form.maxWeight) <= 0 || parseInt(form.minWeight) >= parseInt(form.maxWeight)  // Si el peso máximo está fuera del rango válido
    ? "The maximum weight cannot be less than 0 or less than the minimum weight"  // Establece un mensaje de error de rango incorrecto
    : parseInt(form.maxWeight) > 100  // Si el peso máximo es mayor que 100
    ? "The weight cannot exceed 100 kilograms"  // Establece un mensaje de error que indica que el peso no debe exceder los 100 kilogramos
    : "";  // No hay error en el peso máximo

  // MIN-LIFE SPAN
  errors.minLifeSpan = !parseInt(form.minLifeSpan)  // Si no se ha proporcionado un valor válido para la duración de vida mínima
  ? "Min life span is required"  // Establece un mensaje de error que indica que la duración de vida mínima es obligatoria
  : !regexNumber.test(form.minLifeSpan)  // Si la duración de vida mínima no es un número válido
  ? "The Life span must be a number"  // Establece un mensaje de error que indica que la duración de vida debe ser un número
  : parseInt(form.minLifeSpan) <= 0 || parseInt(form.minLifeSpan) >= parseInt(form.maxLifeSpan)  // Si la duración de vida mínima está fuera del rango válido
  ? "The minimum life span cannot be less than 0 or greater than the maximum life span"  // Establece un mensaje de error de rango incorrecto
  : parseInt(form.minLifeSpan) > 20  // Si la duración de vida mínima es mayor que 20
  ? "The life span cannot exceed 20 years"  // Establece un mensaje de error que indica que la duración de vida no debe exceder los 20 años
  : "";  // No hay error en la duración de vida mínima

// MAX LIFE SPAN
errors.maxLifeSpan = !parseInt(form.maxLifeSpan)  // Si no se ha proporcionado un valor válido para la duración de vida máxima
? "Max life span is required"  // Establece un mensaje de error que indica que la duración de vida máxima es obligatoria
: !regexNumber.test(form.maxLifeSpan)  // Si la duración de vida máxima no es un número válido
? "The Life span must be a number"  // Establece un mensaje de error que indica que la duración de vida debe ser un número
: parseInt(form.maxLifeSpan) <= 0 || parseInt(form.maxLifeSpan) <= parseInt(form.minLifeSpan)  // Si la duración de vida máxima está fuera del rango válido
? "The maximum life span cannot be less than 0 or less than the minimum life span"  // Establece un mensaje de error de rango incorrecto
: parseInt(form.maxLifeSpan) > 20  // Si la duración de vida máxima es mayor que 20
? "The life span cannot exceed 20 years"  // Establece un mensaje de error que indica que la duración de vida no debe exceder los 20 años
: "";  // No hay error en la duración de vida máxima

// BREED GROUP
errors.breed_group = !regexName.test(form.breed_group)  // Si el grupo de raza no coincide con el formato permitido
  ? "The breed group can only contain letters and spaces"  // Establece un mensaje de error que indica que el grupo de raza solo puede contener letras y espacios
  : "";  // No hay error en el grupo de raza

// TEMPERAMENTS
if (!form.temperaments.length) {  // Si no se han seleccionado temperamentos
  errors.temperaments = "The breed must have at least one temperament";  // Establece un mensaje de error que indica que se debe seleccionar al menos un temperamento
} else {
  errors.temperaments = "";  // No hay error en los temperamentos
}

return errors;  // Devuelve el objeto 'errors' que contiene los mensajes de error
};

export default validators;  // Exporta la función 'validators' para su uso en otros módulos