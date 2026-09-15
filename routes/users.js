const usersRouter = require("express").Router();
const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "../data/users.json");

usersRouter.get("/", (req, res) => {
  fs.readFile(usersPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Erro ao ler os dados dos usuários" });
      return;
    }
    const users = JSON.parse(data);
    res.send(users);
  });
});

usersRouter.get("/:id", (req, res) => {
  fs.readFile(usersPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Erro ao ler os dados do usuários" });
      return;
    }
    const users = JSON.parse(data);
    const user = users.find((item) => item._id === req.params.id);
    if (!user) {
      res.status(404).send({ message: "ID do usuário não encontrado" });
      return;
    }
    res.send(user);
  });
});

module.exports = usersRouter;
