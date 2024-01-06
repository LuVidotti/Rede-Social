const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Postagem = new Schema({
    autor: {
        type: Schema.Types.ObjectId,
        ref: "usuarios"
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