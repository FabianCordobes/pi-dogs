const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'dog',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			image: {
				type: DataTypes.STRING,
				defaultValue:
					'https://previews.123rf.com/images/istanbul2009/istanbul20091507/istanbul2009150700640/42444132-imagen-vectorial-silueta-del-perro-en-su-defecto-plantean-aislados-sobre-fondo-blanco.jpg',
				validate: {
					isUrl: true,
				},
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			height: {
				type: DataTypes.JSONB,
				allowNull: false,
			},
			weight: {
				type: DataTypes.JSONB,
				allowNull: false,
			},
			life_span: {
				type: DataTypes.STRING(30),
				set(value) {
					this.setDataValue('life_span', `${value} years`);
				},
			},
			price: {
				type: DataTypes.STRING(30),
				defaultValue: '0',
			},
			price: {
				type: DataTypes.STRING(30),
				defaultValue: '0',
			},
		},
		{
			timestamps: false,
		}
	);
};
