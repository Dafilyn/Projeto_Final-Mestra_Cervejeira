const app = require("./src/app")

const PORT = process.env.PORT

https.createServer(app).listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
