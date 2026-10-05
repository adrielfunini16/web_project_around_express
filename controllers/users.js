const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => {
      next(err);
    });
};

const updateProfileUser = (req, res, next) => {
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
      next(err);
    });
};

const updateAvatarUser = (req, res, next) => {
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
      next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfileUser,
  updateAvatarUser,
};
