const cervejas = require("../models/Cervejas");
const users = require("../models/users");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const login = (req, res) => {
    const { email, senha } = req.body;
    users.findOne({ email}, (error, user) => {
        if (error) {
            return res.status(500).send({ message: error.message });
        }
        if (user) {
            bcrypt.compare(senha, user.senha, (err, same) => {
                if (same) {
                    const token = jwt.sign({ email: user.email }, SECRET, {
                        expiresIn: "1d"
                    });
                    return res.status(200).send({ token });
                }
                return res.status(401).send({ message: "Senha inválida" });
            });
        } else {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }
    });
}

const novoUsuario = (req, res) => {
    const { email, senha } = req.body;
    users.findOne({ email },
        (error, user) => {
            if (error) {
                return res.status(500).send({ message: error.message });
            }
            if (user) {
                return res.status(409).send({ message: "Usuário já cadastrado" });
            }
            bcrypt.hash(senha, 10, (errBcrypt, hash) => {
                if (errBcrypt) {
                    return res.status(500).send({ message: errBcrypt.message });
                }
                users.create({
                    email,
                    senha: hash
                }, (err, user) => {
                    if (err) {
                        return res.status(400).send({ message: err.message });
                    }
                    return res.status(201).send({ message: "Usuário criado com sucesso" });
                });
            });
        });
}


const atualizarUsuario = (req, res) => {

        const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: "Você precisa estar logado para acessar essa rota" });
    }
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: err.message });
        }
        console.log(decoded);
    });


    const idParam = req.params.id;
    const userBody = req.body;
    const options = { new: true };
    
    users.findByIdAndUpdate(
        idParam,
        userBody,
        options,
        (error, user) => {
            if (error) {
                return res.status(500).send({ message: error.message });
            }
            if (user) {
                return res.status(200).send(user);
            }
            return res.status(404).send({ message: "Usuário não encontrado" });
        }
    );
}


const listarCervejas = (req, res) => {
    cervejas.find((error, cervejas) => {
        if (error) {
            return res.status(500).send({ message: error.message });
        }   
        return res.status(200).send(cervejas);
    })
}

const cadastrarCerveja = (req, res) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: "Você precisa estar logado para acessar essa rota" });
    }
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: err.message });
        }
        console.log(decoded);
    });

    const newcerveja = new cervejas(req.body);

    if (!req.body) {
        return res.status(400).send({ message: "O body não pode estar vazio" });
    }

    cervejas.findOne({nome: req.body.nome}, (error, cerveja) => {
        if (error) {
            return res.status(500).send({ message: error.message });
        }
        if (cerveja) {
            return res.status(409).send({ message: "Cerveja já cadastrada" });
        }
        if(!cerveja) {
            newcerveja.save((error) => {
                if (error) {
                    return res.status(400).send({ message: error.message });
                }
                return res.status(201).send(newcerveja.toJSON());
            });
        }
    });
    
}

const atualizarCerveja = (req, res) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: "Você precisa estar logado para acessar essa rota" });
    }
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: err.message });
        }
        console.log(decoded);
    });

    const idParam = req.params.id;
    const cervejaBody = req.body;
    const options = { new: true };

    cervejas.findByIdAndUpdate(
        idParam,
        cervejaBody,
        options,
        (error, cerveja) => {
            if (error) {
                return res.status(500).send({ message: error.message });
            }
            if (cerveja) {
                return res.status(200).send(cerveja.toJSON());
            }
            return res.status(404).send({ message: "Cerveja não encontrada" });
        }
    );
}

const deletarCerveja = (req, res) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: "Você precisa estar logado para acessar essa rota" });
    }
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: err.message });
        }
        console.log(decoded);
    });

    const idParam = req.params.id;
    
    cervejas.findByIdAndDelete(idParam, (error, cerveja) => {
        if (error) {
            return res.status(500).send({ message: error.message });
        }
        if (cerveja) {
            return res.status(200).send({ message: "Cerveja excluída com sucesso" });
        }
        return res.status(404).send({ message: "Cerveja não encontrada" });
    });
}



module.exports = {
    login,
    novoUsuario,
    atualizarUsuario,
    listarCervejas,
    cadastrarCerveja,
    atualizarCerveja,
    deletarCerveja,
};
