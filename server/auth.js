const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('./models/Usuario');
const Usuario = mongoose.model('usuarios');
const SECRET = "segredojwt";

function verificaToken(req,res,next) {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(404).json({message: "Erro, token nao fornecido"});
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) {
            return res.status(403).json({message: "Erro, token invalido"});
        };

        Usuario.findOne({_id: decoded.userId}).then((usuario) => {
            req.user = usuario;
            next();
        })
    })
}

module.exports = verificaToken;