const mongoose = require('mongoose');
const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

const app = express();
const { PORT = 3000 } = process.env;

mongoose
  .connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6abe93f87695cbc39bab3dd3',
  };

  next();
});
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
