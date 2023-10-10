// Importamos el módulo 'server' que contiene nuestra aplicación.
const server = require('./app-server');

// Importamos los modelos de la base de datos y el controlador de temperamentos.
const { conn } = require('./src/db');
const { controllerTemperaments } = require('./src/controllers/');
const { PORT } = process.env;

// Sincronizamos la base de datos con la opción 'force: true' que reemplaza las tablas existentes.
conn.sync({ force: false }).then(() => {
	// Llamamos al método 'chargeTemperamentsToDB' del controlador de temperamentos.
	controllerTemperaments.chargeTemperamentsToDB().then(() => {
		// Iniciamos el servidor en el puerto 3001 y mostramos un mensaje cuando esté listo.
		server.listen(PORT, () => {
			console.log('% listening at ' + PORT); // eslint-disable-line no-console
		});
	});
});
