import { useContext } from "react";
import HistoricoContext from "./HistoricoContext";
import Alerta from "../../Alerta";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

function Tabela() {
  const { alerta, listaObjetos, remover } = useContext(HistoricoContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Histórico</h1>
      <Alerta alerta={alerta} />
      <Button variant="primary">
        Novo <i className="bi bi-file-earmark-plus"></i>
      </Button>
      {listaObjetos.length === 0 && <h1>Nenhum histórico encontrada</h1>}
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
              <th>Código Veículo</th>
              <th>Código Vagao</th>
              <th>Data Entrada</th>
              <th>Data Saída</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaObjetos.map((objeto) => (
              <tr key={objeto.id}>
                <td>{objeto.id}</td>
                <td>{objeto.id_veiculo}</td>
                <td>{objeto.id_vaga}</td>
                <td>{objeto.data_entrada}</td>
                <td>{objeto.data_saida}</td>
                <td align="center">
                  <Button variant="info">
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
