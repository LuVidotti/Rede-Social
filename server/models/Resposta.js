const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Resposta = new Schema({
    autorId: {
        type: Schema.Types.ObjectId,
        ref: "usuarios"
    },
    autorNome: {
        type: String,
        required: true
    },
    postagemId: {
        type: Schema.Types.ObjectId,
        ref: "postagens"
    },
    conteudo: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("respostas", Resposta);