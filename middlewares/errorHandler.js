const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error('err', err);

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: 'Dados inválidos fornecidos' });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: 'ID inválido fornecido' });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Dados inválidos fornecidos' });
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return res.status(404).json({ message: 'ID não encontrado' });
  }

  return res.status(500).json({ message: 'Erro interno do servidor' });
};

module.exports = errorHandler;
