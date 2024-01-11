function MinhaPostagem(props) {
    return (
        <div className="container form-control mt-4">
            <h6>{props.autor}:</h6>
            <p>{props.conteudo}</p>
            <small className="d-block mb-2">publicado em: {props.data}</small>
        </div>
    )
}

export default MinhaPostagem;