const cardsRouter = require('express').Router();
const { getCards } = require('../controllers/cards');

cardsRouter.get('/', getCards);

module.exports = cardsRouter;
