const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Usuario');
const Usuario = mongoose.model('usuarios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = "segredojwt";
const verificaToken = require('../auth');

router.post("/", (req,res) => {
    let erros = [];

    if(!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null) {
        erros.push("Erro, nome invalido");
    }

    if(!req.body.email || typeof req.body.email === undefined || req.body.email === null) {
        erros.push("Erro, e-mail invalido");
    }

    if(!req.body.senha || typeof req.body.senha === undefined || req.body.senha === null) {
        erros.push("Erro, senha invalida");
    }

    if(req.body.senha.length < 4) {
        erros.push("Erro, senha curta demais");
    }

    if(req.body.senha2 !== req.body.senha) {
        erros.push("Erro, as senhas devem coincidir");
    }

    if(erros.length > 0) {
        return res.status(402).json(erros);
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.senha, salt);

        const novoUsuario = {
            nome: req.body.nome,
            senha: hash,
            email: req.body.email
        }

        new Usuario(novoUsuario).save().then((usuarioCriado) => {
            res.status(201).json({message: "Conta criada com sucesso!!!", usuarioCriado:usuarioCriado});
        }).catch((erro) => {
            return res.status(500).json(erro);
        })
    }
})

router.get('/', (req,res) => {
    Usuario.find().then((usuarios) => {
        res.status(200).json(usuarios);
    }).catch((erro) => {
        return res.status(500).json({errorMessage: "Houve um erro interno no servidor", erro:erro});
    })
})

router.post('/login', (req,res) => {
    let erros = [];

    if(!req.body.email || typeof req.body.email === undefined || req.body.email === null) {
        erros.push("Erro, e-mail invalido");
    }

    if(!req.body.senha || typeof req.body.senha === undefined || req.body.senha === null) {
        erros.push("Erro, senha invalida");
    }

    if(erros.length > 0) {
        return res.status(402).json(erros);
    } else {
        Usuario.findOne({email: req.body.email}).then((usuario) => {
            if(!usuario) {
                return res.status(404).json({errorMessage: "Erro, nao esxiste um usuario com este e-mail"});
            }

            bcrypt.compare(req.body.senha, usuario.senha).then((batem) => {
                if(!batem) {
                    return res.status(404).json({errorMessage: "Erro, senha incorreta"});
                }

                const token = jwt.sign({userId: usuario._id}, SECRET, {expiresIn: "50 min"});

                if(token) {
                    res.status(201).json({message: "Login realizado com sucesso", token:token});
                }

            })
        }).catch((erro) => {
            return res.status(500).json({errorMessage: "Houve um erro interno no servidor", erro:erro});
        })
    }
})

router.get('/perfil', verificaToken, (req,res) => {
    const user = req.user;

    Usuario.findOne({_id: user._id}).then((usuario) => {
        const perfil = {
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha
        }

        return res.status(200).json(perfil);
    }).catch((erro) => {
        return res.status(500).json({errorMessage: "Houve um erro interno no servidor", erro:erro});
    })
})

module.exports = router;