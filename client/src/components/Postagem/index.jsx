import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"

function Postagem() {
    return(
        <div className="container form-control mt-4">
            <h6>LuVidotti:</h6>
            <p>aqui eh corinthians caralho</p>
            <small className="d-block mb-2">publicado em: 22/12/2023</small>
            <button className="btn btn-dark btn-sm">Responder</button>
        </div>
    )
}

export default Postagem;