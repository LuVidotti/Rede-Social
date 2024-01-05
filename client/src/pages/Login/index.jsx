import Header from "../../components/Header";
import { Container, Form } from "react-bootstrap";
import Titulo from "../../components/Titulo";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import MensagemErro from '../../components/mensagemErro';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const [mensagemErro, setMensagemErro] = useState('');

    function fazerLogin(e) {
        e.preventDefault();

        axios.post("http://localhost:3000/usuarios/login", {
            email: email,
            senha: senha
        }).then((resposta) => {
            localStorage.setItem("token", resposta.data.token);
            navigate('/');
        }).catch((erro) => {
            setMensagemErro(erro.response.data.errorMessage);
        })
    }

    return (
        <div className="bg-light vh-100">
            <Header />
            {
                mensagemErro !== "" ? <MensagemErro texto={mensagemErro}/> : null
            }
            <Container style={{textAlign: "center"}} className="mb-4">
                <Titulo titulo="Login"/>
            </Container>
            <Container className="d-flex align-items-center justify-content-center mt-4">
                <Form onSubmit={(e) => fazerLogin(e)} className="bg-dark" style={{color: "#FFF", padding: "16px", borderRadius: "16px", width: "30vw"}}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu email..." onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite sua senha..." onChange={(e) => setSenha(e.target.value)}/>
                    </Form.Group>
                    <button type="submit" className="btn btn-primary mt-2">Entrar</button>
                </Form>
            </Container>
        </div>
    )
}

export default Login;