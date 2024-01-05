const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rotaUsuarios = require('./routes/usuarios');
const cors = require('cors');

//config
    //mongoose
    mongoose.connect('mongodb://127.0.0.1:27017/redesocial').then(() => {
        console.log("Conectado ao banco de dados com sucesso!!!");
    }).catch((erro) => {
        console.log("Erro ao se conectar ao banco de dados, erro: "+erro);
    })

    //body-parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //cors
    app.use(cors());

//rotas
app.use('/usuarios', rotaUsuarios);

app.get('/', (req,res) => {
    res.send("ola mundo!!!");
})


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})