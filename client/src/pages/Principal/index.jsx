import CriarPostagem from "../../components/CriarPostagem";
import Header from "../../components/Header";
import Postagem from "../../components/Postagem";
import Titulo from "../../components/Titulo";
import Container from "react-bootstrap/esm/Container";
import axios from 'axios';
import { useState, useEffect } from 'react';
import MensagemSucesso from '../../components/MensagemSucesso';
import MensagemErro from '../../components/MensagemErro'

function Principal() {
    const [conteudoPostagem, setConteudoPostagem] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [postagens, setPostagens] = useState([]);

    async function criarPostagem(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        axios.post("http://localhost:3000/postagens", {
            conteudo: conteudoPostagem
        }, {
            headers: {
                Authorization: token
            }
        }).then((resposta) => {
            setMensagemSucesso(resposta.data.message);
            setMensagemErro('');
        }).catch((erro) => {
            setMensagemErro(erro.response.data.message);
            setMensagemSucesso('')
        })
    }

    useEffect(() => {
        axios.get("http://localhost:3000/postagens").then((resposta) => {
            setPostagens(resposta.data);
        }).catch((erro) => {
            console.log(erro);
        });
    }, [postagens]);

    return (
        <div className="bg-light" style={{minHeight: "100vh"}}>
            <Header />
            {
                mensagemSucesso !== '' ? <MensagemSucesso texto={mensagemSucesso}/> : null
            }
            {
                mensagemErro !== '' ? <MensagemErro texto={mensagemErro}/> : null
            }
            <Container>
                <div style={{textAlign: "center"}}>
                    <Titulo titulo="Home" />
                </div>
                <CriarPostagem setConteudoPostagem={setConteudoPostagem} criarPostagem={criarPostagem}/>
                <div className="mt-4">
                    <h4>Postagens:</h4>
                    {
                        postagens.length === 0 ? <small>Nenhuma postagem cadastrada</small>
                        :
                        postagens.map((postagem) => <Postagem key={postagem._id} autor={postagem.autorNome} conteudo={postagem.conteudo} data={postagem.data}/>)
                    }
                </div>
            </Container>
        </div>
    )
}

export default Principal;