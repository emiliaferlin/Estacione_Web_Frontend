import { useContext } from 'react'
import Alerta from '../../Alerta';
import HistoricoContext from './HistoricoContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(HistoricoContext);

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Histórico Estacionamento</Modal.Title>
            </Modal.Header>
            <form id="formulario" onSubmit={acaoCadastrar}>
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
                                <FloatingLabel controlId="txtCodidoVaga" label="Código" className="mb-3">
                                    <Form.Control type="number" readOnly name="idVaga"
                                        value={objeto.id_vaga}
                                        onChange={handleChange} />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={12}>
                                <FloatingLabel controlId="txtCodidoVeiculo" label="Código" className="mb-3">
                                    <Form.Control type="number" readOnly name="idVeiculo"
                                        value={objeto.id_veiculo}
                                        onChange={handleChange} />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={12}>
                                <FloatingLabel controlId="txtDataEntrada" label="Data Entrada" className="mb-3">
                                    <Form.Control type="text" required name="data_entrada"
                                        value={objeto.data_entrada}
                                        onChange={handleChange} placeholder="Informe a Data de Entrada" />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={12}>
                                <FloatingLabel controlId="txtNumeroVaga" label="Data Saída" className="mb-3">
                                    <Form.Control type="text" required name="data_saida"
                                        value={objeto.data_saida}
                                        onChange={handleChange} placeholder="Informe a Data de Saída" />
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