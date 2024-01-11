import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalElemento(props) {
    if(!props.mostrarModal) {
        return null
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'fixed', top: "20%", backdropFilter: "blur(5px)" }}
            >
            <Modal.Dialog>
                <Modal.Header closeButton onClick={props.fecharModal}>
                <Modal.Title>Responda a esta postagem</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <textarea onChange={(e) => props.setConteudoResposta(e.target.value)} name="conteudo" rows={8} style={{width: "100%"}}></textarea>
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={props.fecharModal}>Fechar</Button>
                <Button onClick={() => props.enviarResposta()} variant="primary">Responder</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default ModalElemento;