const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Erro ao ler os dados dos usuários' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'ID do usuário inválido' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'ID do usuário não encontrado' });
      } else {
        res.status(500).send({ message: 'Erro ao ler os dados do usuário' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Dados inválidos fornecidos' });
      } else {
        res.status(500).send({ message: 'Erro ao criar o usuário' });
      }
    });
};

const updateProfileUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { returnDocument: 'after', runValidators: true },
  )
    .orFail()
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Dados inválidos fornecidos' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'ID do usuário não encontrado' });
      } else {
        res
          .status(500)
          .send({ message: 'Erro ao atualizar o perfil do usuário' });
      }
    });
};

const updateAvatarUser = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    { returnDocument: 'after', runValidators: true },
  )
    .orFail()
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Dados inválidos fornecidos' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'ID do usuário não encontrado' });
      } else {
        res
          .status(500)
          .send({ message: 'Erro ao atualizar o avatar do usuário' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfileUser,
  updateAvatarUser,
};
