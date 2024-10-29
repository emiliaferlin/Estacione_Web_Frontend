import { useContext, useState } from 'react'
import Alerta from '../../Alerta';
import VeiculoContext from './VeiculoContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(VeiculoContext);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        if (form.checkValidity() === true) {
            acaoCadastrar(event);
        }
    };

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Veículo</Modal.Title>
            </Modal.Header>
            <form id='formulario' onSubmit={handleSubmit} noValidate
                validated={validated}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Alerta alerta={alerta} />
                            <Col xs={12} md={12}>
                                <FloatingLabel controlId="txtCodido" label="Código" className="mb-3">
                                    <Form.Control type="number" readOnly name="id"
                                        value={objeto.id}
                                        onChange={handleChange} />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={12}>
                                <FloatingLabel controlId="txtPlaca" label="Placa" className="mb-3">
                                    <Form.Control type="text" required name="numero_Placa"
                                        value={objeto.placa}
                                        onChange={handleChange} placeholder="Informe a placa" />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={12}>
                                <FloatingLabel controlId="txtModelo" label="Modelo" className="mb-3">
                                    <Form.Control type="text" required name="numero_Modelo"
                                        value={objeto.modelo}
                                        onChange={handleChange} placeholder="Informe o modelo" />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={12}>
                                <FloatingLabel controlId="txtCor" label="Cor" className="mb-3">
                                    <Form.Control type="text" required name="numero_Cor"
                                        value={objeto.cor}
                                        onChange={handleChange} placeholder="Informe a cor" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setExibirForm(false)}>
                        Fechar
                    </Button>
                    <Button variant="success" type="submit">
                        Salvar  <i className="bi bi-save"></i>
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default Formulario;