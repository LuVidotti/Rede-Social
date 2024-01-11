import Header from "../../components/Header";
import { Container } from "react-bootstrap";
import Titulo from "../../components/Titulo";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import MensagemErro from "../../components/MensagemErro";
import MinhaPostagem from "../../components/MinhaPostagem";
import MensagemSucesso from "../../components/MensagemSucesso";

function Perfil() {
    const [user, setUser] = useState({nome: "", email: ""});
    const [postagens, setPostagens] = useState([]);
    const [mensagemErro, setMensagemErro] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:3000/usuarios/perfil", {
            headers: {
                Authorization: token
            }
        }).then((resposta) => {
            setUser({nome: resposta.data.nome, email: resposta.data.email});
        }).catch((erro) => {
            navigate('/');
        })
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:3000/postagens/minhas-postagens", {
            headers: {
                Authorization: token
            }
        }).then((resposta) => {
            setPostagens(resposta.data);
        }).catch((erro) => {
            console.log(erro);
        })
    }, [postagens]);

    function deletarPostagem(idPostagem) {
        const token = localStorage.getItem("token");

        axios.delete(`http://localhost:3000/postagens/${idPostagem}`, {
            headers: {
                Authorization: token
            }
        }).then((resposta) => {
            setMensagemSucesso(resposta.data.message);
            setTimeout(() => {
                setMensagemSucesso('');
            }, 5000);
        }).catch((erro) => {
            setMensagemErro(erro.response.data.message);
            setTimeout(() => {
                setMensagemErro('');
            }, 5000);
        })
    }

    return (
        <div>
            <Header />
            <Container style={{textAlign: "center"}} className="mb-4">
                <Titulo titulo="Seu perfil"/>
            </Container>

            <Container>
                <div>
                    <h4>Nome: </h4>
                    <p>{user.nome}</p>
                </div>
                <div>
                    <h4>E-mail: </h4>
                    <p>{user.email}</p>
                </div>
                
                <h4>Suas postagens:</h4>

                {
                    mensagemErro !== "" ? <MensagemErro texto={mensagemErro}/> : null
                }

                {
                    mensagemSucesso !== "" ? <MensagemSucesso texto={mensagemSucesso}/> : null
                }

                {
                    postagens.length === 0 ? <MensagemErro texto="Nenhuma postagem cadastrada"/>
                    :
                    postagens.map((postagem) => <MinhaPostagem idPostagem={postagem._id} deletarPostagem={deletarPostagem} key={postagem._id} data={postagem.data} autor={postagem.autorNome} conteudo={postagem.conteudo}/>)
                }
            </Container>
        </div>
    )
}

export default Perfil;