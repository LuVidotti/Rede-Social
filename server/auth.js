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

    
}

module.exports = verificaToken;