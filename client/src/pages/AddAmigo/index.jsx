import Container from "react-bootstrap/esm/Container";
import Header from "../../components/Header";
import Titulo from "../../components/Titulo";
import Form from 'react-bootstrap/Form';
import CardAmigo from "../../components/CardAmigo";
import axios from 'axios';
import { useState, useEffect } from "react";
import MensagemSucesso from '../../components/MensagemSucesso';
import MensagemErro from '../../components/MensagemErro';

function AddAmigo() {
    const [usuarios, setUsuarios] = useState([]);
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/usuarios').then((resposta) => {
            setUsuarios(resposta.data);
        }).catch((erro) => {
            console.log(erro);
        })
    }, []);

    function adicionarAmigo(idAmigo) {
        const token = localStorage.getItem("token");

        axios.post("http://localhost:3000/amigos", {
            amigoId: idAmigo
        }, {
            headers: {
                Authorization: token
            }
        }).then((resposta) => {
            setMensagemSucesso(resposta.data.message);
            setTimeout(() => {
                setMensagemSucesso('');
            }, 3000);
        }).catch((erro) => {
            setMensagemErro(erro.response.data.message);
            setTimeout(() => {
                setMensagemErro('');
            }, 3000);
        })
    }

    return(
        <div>
            <Header />
            <Container style={{textAlign: "center"}}>
                <Titulo titulo="Adicionar amigo"/>
                {
                    mensagemSucesso !== "" ? <MensagemSucesso texto={mensagemSucesso}/> : null
                }

                {
                    mensagemErro !== "" ? <MensagemErro texto={mensagemErro}/> : null
                }
                <div style={{marginTop: "2em"}}>
                    <Form>
                        <Form.Control type="text" placeholder="digite o nome de um amigo..." />
                    </Form>
                </div>

                {
                    usuarios.map((usuario) => <CardAmigo key={usuario._id} adicionarAmigo={adicionarAmigo} idAmigo={usuario._id} nome={usuario.nome}/>)
                }
            </Container>
        </div>
    )
}

export default AddAmigo;