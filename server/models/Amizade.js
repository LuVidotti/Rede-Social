const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Amizade = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "usuarios"
    },
    amigoId: {
        type: Schema.Types.ObjectId,
        ref: "usuarios"
    }
})

mongoose.model("amizades", Amizade);