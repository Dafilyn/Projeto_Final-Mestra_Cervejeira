const express = require("express")
const index = express.Router()

index.get("/", function (req, res) {
    res.status(200).send({
        title: "Reprograma On19 - Projeto Final - API de Cervejas",
        version: "1.5.0"
    })
})

module.exports = index