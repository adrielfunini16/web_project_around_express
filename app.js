const mongoose = require('mongoose');
const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6abe93f87695cbc39bab3dd3',
  };

  next();
});
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

const notFoundHandler = (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
};

app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
