const cardsRouter = require("express").Router();
const fs = require("fs");
const path = require("path");

cardsRouter.get("/", (req, res) => {
  const cardsPath = path.join(__dirname, "../data/cards.json");
  fs.readFile(cardsPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Erro ao ler os dados dos cards" });
      return;
    }

    const cards = JSON.parse(data);

    res.send(cards);
  });
});

module.exports = cardsRouter;
