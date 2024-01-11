function Resposta(props) {
    return(
        <div style={{width: "70%"}}>
            <div className="container form-control mt-4 bg-secondary">
                <h6>{props.autor} em resposta a: {props.autorResposta}</h6>
                <p>{props.conteudo}</p>
                <small className="d-block mb-2">publicado em: {props.data}</small>
            </div>
        </div>
    )
}

export default Resposta;