const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
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
  Card.findByIdAndDelete(cardId)
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

const likeCard = (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { returnDocument: 'after' },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'ID do card inválido' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'ID do card não encontrado' });
      } else {
        res.status(500).send({ message: 'Erro ao curtir o card' });
      }
    });
};

const dislikeCard = (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { returnDocument: 'after' },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'ID do card inválido' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'ID do card não encontrado' });
      } else {
        res.status(500).send({ message: 'Erro ao descurtir o card' });
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
