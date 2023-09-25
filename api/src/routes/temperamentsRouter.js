const epress = require('express');

const {
   handlerGetTemperaments,
} = require('../controllers/handlerGetTemperaments');

const termperamentRouter = express.Router();

termperamentRouter.get('/', handlerGetTemperaments);

module.exports = { temperamentRouter };