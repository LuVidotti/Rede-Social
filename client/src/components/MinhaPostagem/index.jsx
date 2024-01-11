import { useState, useEffect } from 'react';

function MinhaPostagem(props) {
    const [idPostagem, setIdPostagem] = useState('');

    useEffect(() => {
        setIdPostagem(props.idPostagem);
    }, [props.idPostagem]);

    return (
        <div className="container form-control mt-4">
            <h6>{props.autor}:</h6>
            <p>{props.conteudo}</p>
            <small className="d-block mb-2">publicado em: {props.data}</small>
            <button onClick={() => props.deletarPostagem(idPostagem)} className="btn btn-danger btn-sm">Excluir</button>
        </div>
    )
}

export default MinhaPostagem;