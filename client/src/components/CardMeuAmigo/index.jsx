function CardMeuAmigo(props) {
    return (
        <div className="container form-control mt-4" style={{width: "70%"}}>
            <h6>{props.nome}</h6>
            <button onClick={() => props.excluirAmigo(props.idAmigo)} className="btn btn-danger btn-sm">Excluir amigo</button>
        </div>
    )
}

export default CardMeuAmigo;