const express = require('express');
const { handlerGetAllDogs } = require('../controllers/handlerGetAllDogs');
const { handlerCreateDog } = require('../controllers/handlerCreateDog');
const { handlerGetDogById } = require('../controllers/handlerGetDogById');

const dogsRouter = express.Router();

dogsRouter.get('/:idRaza', handlerGetDogById);
 
dogsRouter.get('/', handlerGetAllDogs);

dogsRouter.post('/', handlerCreateDog);

module.exports = { dogsRouter };