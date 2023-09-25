const express = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRouter = require('./dogsRouter');
const temperamentRouter = require('./temperamentsRouter')

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogRouter);
router.use('/temperaments', temperamentRouter);

router.get('/', (req, res) => {
   res.send('Bienvenido a mi API !')
})

module.exports = router;
