import CriarPostagem from "../../components/CriarPostagem";
import Header from "../../components/Header";
import Postagem from "../../components/Postagem";
import Titulo from "../../components/Titulo";
import Container from "react-bootstrap/esm/Container";

function Principal() {
    return (
        <div className="bg-light" style={{minHeight: "100vh"}}>
            <Header />
            <Container>
                <Titulo titulo="Home"/>
                <CriarPostagem />
                <div className="mt-4">
                    <h4>Postagens:</h4>
                    <Postagem />
                </div>
            </Container>
        </div>
    )
}

export default Principal;