import { useContext } from "react";
import VagaContext from "./VagaContext";
import Alerta from "../../Alerta";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

function Tabela() {
  const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } =
    useContext(VagaContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vagas</h1>
      <Alerta alerta={alerta} />
      <Button variant="primary" onClick={() => novoObjeto()}>
        Novo <i className="bi bi-file-earmark-plus"></i>
      </Button>
      {listaObjetos.length === 0 && <h1>Nenhuma vaga encontrada</h1>}
      {listaObjetos.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                Código
              </th>
              <th>Vaga</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaObjetos.map((objeto) => (
              <tr key={objeto.id}>
                <td>{objeto.id}</td>
                <td>{objeto.numero_vaga}</td>
                <td align="center">
                  <Button
                    variant="info"
                    onClick={() => editarObjeto(objeto.codigo)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      remover(objeto.id);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Tabela;
