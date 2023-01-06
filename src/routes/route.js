const controller = require("../controllers/Controller");
const express = require("express");
const route = express.Router();

route.get("/login", controller.login);
route.post("/novoUsuario", controller.novoUsuario);
route.patch("/atualizarUsuario/:id", controller.atualizarUsuario);
route.get("/listar", controller.listarCervejas);
route.post("/cadastrar", controller.cadastrarCerveja);
route.patch("/atualizar/:id", controller.atualizarCerveja);
route.delete("/delete/:id", controller.deletarCerveja);

module.exports = route;