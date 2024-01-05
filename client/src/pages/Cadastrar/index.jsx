import Header from "../../components/Header";
import { Container, Form } from "react-bootstrap";
import Titulo from "../../components/Titulo";
import { useState } from 'react';
import axios from "axios";
import MensagemSucesso from "../../components/mensagemSucesso";
import MensagemErro from "../../components/mensagemErro";

function Cadastrar() {
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState([]);

    function criarConta(e) {
        e.preventDefault();

        axios.post("http://localhost:3000/usuarios", {
            nome: nome,
            email: email,
            senha: senha,
            senha2: senha2
        }).then((resposta) => {
            setMensagemErro([]);
            setMensagemSucesso(resposta.data.message);
        }).catch((erro) => {
            setMensagemSucesso("");
            setMensagemErro(erro.response.data);
        })
    }

    return (
        <div className="bg-light vh-100">
            <Header />
            {
                mensagemSucesso !== "" ? <MensagemSucesso texto={mensagemSucesso}/> : null
            }
            {
                mensagemErro.length > 0 ? mensagemErro.map((erro) => {
                    return <MensagemErro texto={erro}/>
                }) : null
            }
            <Container style={{textAlign: "center"}} className="mb-4">
                <Titulo titulo="Criar conta"/>
            </Container>
            <Container className="d-flex align-items-center justify-content-center mt-4">
                <Form onSubmit={(e) => criarConta(e)} className="bg-dark" style={{color: "#FFF", padding: "16px", borderRadius: "16px", width: "30vw"}}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu email..." onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Digite seu nome..." onChange={(e) => setNome(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite sua senha..." onChange={(e) => setSenha(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Confirme a senha</Form.Label>
                        <Form.Control type="password" placeholder="Confirme a senha..." onChange={(e) => setSenha2(e.target.value)}/>
                    </Form.Group>
                    <button type="submit" className="btn btn-primary mt-2">Criar conta</button>
                </Form>
            </Container>
        </div>
    )
}

export default Cadastrar;