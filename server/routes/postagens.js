const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require('../models/Postagem');
const Postagem = mongoose.model("postagens");
const verificaToken = require('../auth');
require('../models/Resposta');
const Resposta = mongoose.model('respostas');

router.get('/', (req,res) => {
    Postagem.find().populate('autorId').then((postagens) => {
        res.status(200).json(postagens);
    }).catch((erro) => {
        res.status(500).json({errorMessage: "Erro interno no servidor", erro:erro});
    })
})

router.get('/minhas-postagens', verificaToken, (req,res) => {
    const user = req.user;

    Postagem.find({autorId: user._id}).populate('autorId').then((postagens) => {
        res.status(200).json(postagens);
    }).catch((erro) => {
        res.status(500).json({errorMessage: "Erro interno no servidor", erro:erro});
    })
})

router.get('/:id', (req,res) => {
    Postagem.findOne({_id: req.params.id}).then((postagem) => {
        res.status(200).json(postagem);
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
            autorId: user._id,
            autorNome: user.nome,
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
    Resposta.deleteMany({postagemId: req.params.idPostagem}).then(() => {
        Postagem.deleteOne({_id: req.params.idPostagem}).then(() => {
            res.status(200).json({message: "Postagem excluida com sucesso!!!"});
        }).catch((erro) => {
            res.status(500).json({errorMessage: "Erro interno no servidor", erro:erro});
        })
    }).catch((erro) => {
        res.status(500).json({errorMessage: "Erro interno no servidor", erro:erro});
    })
})

//Respostas

router.post('/respostas', verificaToken, (req,res) => {
    const user = req.user;
    let erros = [];

    if(!req.body.conteudo || typeof req.body.conteudo === undefined || req.body.conteudo === null) {
        erros.push("Erro, conteudo invalido");
    }

    if(erros.length > 0) {
        res.status(402).json(erros);
    } else {
        const novaResposta = {
            autorId: user._id,
            autorNome: user.nome,
            postagemId: req.body.postagemId,
            conteudo: req.body.conteudo
        }

        new Resposta(novaResposta).save().then((respostaSalva) => {
            res.status(201).json({message: "Resposta adicionada com sucesso!!!", respostaSalva:respostaSalva});
        }).catch((erro) => {
            res.status(500).json({errorMessage: "Erro interno no servidor", erro:erro});
        })
    }
})

router.get('/respostas/:postagemId', (req,res) => {
    Resposta.find({postagemId: req.params.postagemId}).populate('postagemId').then((respostas) => {
        res.status(200).json(respostas);
    }).catch((erro) => {
        res.status(500).json({errorMessage: "Erro interno no servidor", erro:erro});
    })
})

module.exports = router;