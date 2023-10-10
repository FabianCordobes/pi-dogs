// Importamos el módulo DataTypes de sequelize.
const { DataTypes } = require("sequelize");

// Exportamos una función que define el modelo 'Dog' e inyecta la conexión de sequelize.
module.exports = (sequelize) => {
  // Definimos el modelo 'Dog'.
  return sequelize.define(
    "dog", // Nombre del modelo en la base de datos.
    {
      id: {
        type: DataTypes.UUID, // Tipo de dato UUID.
        defaultValue: DataTypes.UUIDV4, // Valor por defecto generado automáticamente.
        allowNull: false, // No permite valores nulos.
        primaryKey: true, // Define la clave primaria.
      },
      image: {
        type: DataTypes.TEXT, // Tipo de dato para una URL de imagen.
        allowNull: false, // No permite valores nulos.
      },
      name: {
        type: DataTypes.STRING, // Tipo de dato para el nombre del perro.
        allowNull: false, // No permite valores nulos.
      },
      minHeight: {
        type: DataTypes.INTEGER, // Tipo de dato para la altura mínima.
        validate: { min: 1, max: 100 }, // Valida que esté entre 1 y 100.
        allowNull: false, // No permite valores nulos.
      },
      maxHeight: {
        type: DataTypes.INTEGER, // Tipo de dato para la altura máxima.
        validate: { min: 1, max: 100 }, // Valida que esté entre 1 y 100.
        allowNull: false, // No permite valores nulos.
      },
      minWeight: {
        type: DataTypes.INTEGER, // Tipo de dato para el peso mínimo.
        validate: { min: 1, max: 100 }, // Valida que esté entre 1 y 100.
        allowNull: false, // No permite valores nulos.
      },
      maxWeight: {
        type: DataTypes.INTEGER, // Tipo de dato para el peso máximo.
        validate: { min: 1, max: 100 }, // Valida que esté entre 1 y 100.
        allowNull: false, // No permite valores nulos.
      },
      minLifeSpan: {
        type: DataTypes.INTEGER, // Tipo de dato para la esperanza de vida mínima.
        validate: { min: 1, max: 20 }, // Valida que esté entre 1 y 20.
        allowNull: false, // No permite valores nulos.
      },
      maxLifeSpan: {
        type: DataTypes.INTEGER, // Tipo de dato para la esperanza de vida máxima.
        validate: { min: 1, max: 20 }, // Valida que esté entre 1 y 20.
        allowNull: false, // No permite valores nulos.
      },
      breed_group: {
        type: DataTypes.STRING, // Tipo de dato para el grupo de raza.
        allowNull: true, // Permite valores nulos.
      },
      bred_for: {
        type: DataTypes.STRING, // Tipo de dato para la finalidad de cría.
        allowNull: true, // Permite valores nulos.
      },
      db: {
        type: DataTypes.BOOLEAN, // Tipo de dato para una bandera booleana.
        defaultValue: true, // Valor por defecto verdadero.
        allowNull: false, // No permite valores nulos.
      },
    },
    {
      timestamps: false, // Desactiva la inclusión de timestamps (created_at, updated_at).
    }
  );
};
