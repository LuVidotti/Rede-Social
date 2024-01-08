import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"

function Postagem(props) {
    return(
        <div className="container form-control mt-4">
            <h6>{props.autor}:</h6>
            <p>{props.conteudo}</p>
            <small className="d-block mb-2">publicado em: {props.data}</small>
            <button className="btn btn-dark btn-sm">Responder</button>
        </div>
    )
}

export default Postagem;