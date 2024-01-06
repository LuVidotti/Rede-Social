import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Header() {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:3000/usuarios/perfil", {
            headers: {
                Authorization: token
            }
        }).then(() => {
            setUser(true);
        }).catch((erro) => {
            if(erro) {
                setUser(false);
            }
        })
    }, [user]);

    function logout() {
        localStorage.removeItem("token");
        setUser(false);
    }

    return(
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">LuWitter</Navbar.Brand>
                    {
                        user === false ? 
                            <Nav className="me-auto">
                                <Nav.Link href='/'>Home</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/cadastrar">Cadastrar</Nav.Link>
                            </Nav>
                        : 
                            <Nav className="me-auto">
                                <Nav.Link href='/'>Home</Nav.Link>
                                <Nav.Link href="/amigos">Adicionar amigo</Nav.Link>
                                <Nav.Link href="/perfil">Perfil</Nav.Link>
                                <Nav.Link href="/" onClick={logout}>Sair</Nav.Link>
                            </Nav>
                    }
                    
                </Container>
            </Navbar>
        </>
    )
}

export default Header;