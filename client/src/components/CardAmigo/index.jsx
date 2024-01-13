function CardAmigo(props) {
    return(
        <div className="container form-control mt-4" style={{width: "70%"}}>
            <h6>{props.nome}</h6>
            <button onClick={() => props.adicionarAmigo(props.idAmigo)} className="btn btn-primary btn-sm">Adicionar amigo</button>
        </div>
    )
}

export default CardAmigo;