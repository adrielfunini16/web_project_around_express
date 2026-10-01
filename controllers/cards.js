const card = require('../models/card');

const getCards = (req, res) => {
  card
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = { getCards };
