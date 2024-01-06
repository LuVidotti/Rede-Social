import Header from "../../components/Header";
import { Container } from "react-bootstrap";
import Titulo from "../../components/Titulo";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Perfil() {
    const [user, setUser] = useState({nome: "", email: ""});
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
            </Container>
        </div>
    )
}

export default Perfil;