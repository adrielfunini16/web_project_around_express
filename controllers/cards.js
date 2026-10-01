const card = require('../models/card');

const getCards = (req, res) => {
  card
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  card
    .create({ name, link, owner })
    .then((newCard) => res.status(201).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Dados inválidos fornecidos' });
      } else {
        res.status(500).send({ message: 'Erro ao criar o card' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  card
    .findByIdAndDelete(cardId)
    .orFail()
    .then(() => {
      res.send({ message: 'Card deletado com sucesso' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'ID do card inválido' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: ' ID do card não encontrado' });
      } else {
        res.status(500).send({ message: 'Erro ao deletar o card' });
      }
    });
};

module.exports = { getCards, createCard, deleteCard };
