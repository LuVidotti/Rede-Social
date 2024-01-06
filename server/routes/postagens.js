const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require('../models/Postagem');
const Postagem = mongoose.model("postagens");
const verificaToken = require('../auth');
require('../models/Usuario');
const Usuario = mongoose.model('usuarios');

router.get('/', (req,res) => {
    Postagem.find().then((postagens) => {
        res.status(200).json(postagens);
    }).catch((erro) => {
        res.status(500).json({errorMessage: "Erro interno no servidor", erro:erro});
    })
})

router.post('/', verificaToken, (req,res) => {
    const user = req.user;
    let erros = [];

    if(!req.body.conteudo || typeof req.body.conteudo === undefined || req.body.conteudo === null) {
        erros.push("Erro, conteudo invalido");
    }

    if(erros.length > 0) {
        res.status(400).json(erros);
    } else {
        const novaPostagem = {
            autor: user._id,
            conteudo: req.body.conteudo
        }

        new Postagem(novaPostagem).save().then((postagemSalva) => {
            res.status(201).json({message: "Postagem adicionada com sucesso!!!", postagemSalva:postagemSalva});
        }).catch((erro) => {
            res.status(500).json({errorMessage: "Erro interno no servidor", erro:erro});
        })
    }
})

router.delete('/:idPostagem', verificaToken, (req,res) => {
    Postagem.deleteOne({_id: req.params.idPostagem}).then(() => {
        res.status(200).json({message: "Postagem deletada com sucesso!!!"});
    }).catch((erro) => {
        res.status(500).json({errorMessage: "Erro interno no servidor", erro:erro});
    })
})

module.exports = router;