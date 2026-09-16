const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;

app.use("/cards", cardsRouter);

app.use("/users", usersRouter);

const notFoundHandler = (req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
};

app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
