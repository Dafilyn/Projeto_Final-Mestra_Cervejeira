const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger/swagger_output.json');

require("dotenv").config();

const express = require('express');
const cors = require("cors");
const index = require("./routes/index");
const rotas = require("./routes/route");
const database = require ("./database/dbConnect");


database.on("error", console.log.bind(console, 'Erro de conexão'))
database.once("open", () => {console.log('Conexão com o banco feita com sucesso')});


const app = express();

app.use(express.json());
app.use(cors());



app.use("/", index);
app.use("/cervejas", rotas)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
