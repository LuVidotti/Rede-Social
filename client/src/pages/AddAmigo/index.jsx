import Container from "react-bootstrap/esm/Container";
import Header from "../../components/Header";
import Titulo from "../../components/Titulo";
import Form from 'react-bootstrap/Form';
import CardAmigo from "../../components/CardAmigo";

function AddAmigo() {
    return(
        <div>
            <Header />
            <Container style={{textAlign: "center"}}>
                <Titulo titulo="Adicionar amigo"/>
                <div style={{marginTop: "2em"}}>
                    <Form>
                        <Form.Control type="text" placeholder="digite o nome de um amigo..." />
                    </Form>
                </div>

                <CardAmigo />
            </Container>
        </div>
    )
}

export default AddAmigo;