const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Postagem = new Schema({
    autorId: {
        type: Schema.Types.ObjectId,
        ref: "usuarios"
    },
    autorNome: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
})

mongoose.model("postagens", Postagem);