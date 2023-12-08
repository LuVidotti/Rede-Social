import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function CriarPostagem() {
    return(
        <Form className='mt-4'>
            <Form.FloatingLabel label="Adicione uma postagem">
                <Form.Control id='postagem' as="textarea" placeholder='O que voce esta pensando...' style={{height: "100px"}}></Form.Control>
            </Form.FloatingLabel>
            <Button type='submit' className='mt-2 btn btn-primary'>Adicionar postagem</Button>
        </Form>
    )
}

export default CriarPostagem;