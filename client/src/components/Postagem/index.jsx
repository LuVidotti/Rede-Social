import { useState, useEffect } from 'react';
import axios from 'axios';
import ModalElemento from '../../components/Modal'
import MensagemSucesso from '../MensagemSucesso';
import MensagemErro from '../MensagemErro';
import Resposta from '../Resposta';

function Postagem(props) {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [conteudoResposta, setConteudoResposta] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [respostas, setRespostas] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/postagens/respostas/${props.idPostagem}`).then((resposta) => {
            setRespostas(resposta.data);
        }).catch((erro) => {
            console.log(erro);
        })
    }, [respostas]);

    function fecharModal() {
        setMostrarModal(false);
    }

    function enviarResposta() {
        const token = localStorage.getItem('token');

        axios.post('http://localhost:3000/postagens/respostas', {
            postagemId: props.idPostagem,
            conteudo: conteudoResposta
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
        setMostrarModal(false);
    }

    return(
        <div>
            <div className="container form-control mt-4">
                <h6>{props.autor}:</h6>
                <p>{props.conteudo}</p>
                <small className="d-block mb-2">publicado em: {props.data}</small>
                <button onClick={() => setMostrarModal(true)} className="btn btn-dark btn-sm">Responder</button>
            </div>

            {
                mensagemSucesso !== "" ? <MensagemSucesso texto={mensagemSucesso} /> : null
            }
            {
                mensagemErro !== "" ? <MensagemErro texto={mensagemErro} /> : null
            }

            <ModalElemento mostrarModal={mostrarModal} fecharModal={fecharModal} setConteudoResposta={setConteudoResposta} enviarResposta={enviarResposta}/>

            {
                respostas.map((resposta) => <Resposta key={resposta._id} data={resposta.data} conteudo={resposta.conteudo} autor={resposta.autorNome} autorResposta={resposta.postagemId.autorNome}/>)
            }
        </div>
        
    )
}

export default Postagem;