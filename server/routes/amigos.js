const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Amizade');
const Amizade = mongoose.model("amizades");
const verificaToken = require('../auth');

router.get('/', verificaToken, (req,res) => {
    const user = req.user;

    Amizade.find({userId: user._id}).populate('amigoId').then((amigos) => {
        res.status(200).json(amigos);
    }).catch((erro) => {
        res.status(500).json({errorMessage: "Erro interno no seervidor"});
    })
})

router.post('/', verificaToken, (req,res) => {
    const user = req.user;

    if(!req.body.amigoId || typeof req.body.amigoId === undefined || req.body.amigoId === null) {
        res.status(402).json({message: "Erro, id de amigo invalido"});
    }

    const novoAmigo = {
        userId: user._id,
        amigoId: req.body.amigoId
    }

    new Amizade(novoAmigo).save().then((amizadeNova) => {
        res.status(201).json({message: "Amigo adicionado a lista de amigos com sucesso!!!", amizadeNova:amizadeNova});
    }).catch((erro) => {
        res.status(500).json({errorMessage: "Erro interno no seervidor"});
    })
})

router.delete("/:idAmigo", verificaToken, (req,res) => {
    Amizade.deleteOne({amigoId: req.params.idAmigo}).then(() => {
        res.status(200).json({message: "Amigo excluido da lista de amigos com sucesso!!!"});
    }).catch((erro) => {
        res.status(500).json({errorMessage: "Erro interno no seervidor"});
    })
})

module.exports = router;