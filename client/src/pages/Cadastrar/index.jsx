import Header from "../../components/Header";
import { Container, Form } from "react-bootstrap";
import Titulo from "../../components/Titulo";

function Cadastrar() {
    return (
        <div className="bg-light vh-100">
            <Header />
            <Container style={{textAlign: "center"}} className="mb-4">
                <Titulo titulo="Criar conta"/>
            </Container>
            <Container className="d-flex align-items-center justify-content-center mt-4">
                <Form className="bg-dark" style={{color: "#FFF", padding: "16px", borderRadius: "16px", width: "30vw"}}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu email..." />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Digite seu nome..." />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite sua senha..." />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Confirme a senha</Form.Label>
                        <Form.Control type="password" placeholder="Confirme a senha..." />
                    </Form.Group>
                    <button type="submit" className="btn btn-primary mt-2">Criar conta</button>
                </Form>
            </Container>
        </div>
    )
}

export default Cadastrar;