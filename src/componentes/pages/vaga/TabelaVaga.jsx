import { useContext } from 'react'
import VagaContext from './VagaContext';
import Alerta from '../../Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function Tabela() {

    const { alerta, listaObjetos, remover } = useContext(VagaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Vagas</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary">
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>
            {listaObjetos.length === 0 && <h1>Nenhuma vaga encontrada</h1>}
            {listaObjetos.length > 0 && (

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{
                                textAlign: 'center'
                            }}>Ações</th>
                            <th>Código</th>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.codigo}>
                                <td align="center">

                                    <Button variant="info">
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger" onClick={() => { remover(objeto.codigo); }}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;