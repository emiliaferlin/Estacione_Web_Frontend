import { useContext } from "react";
import veiculoContext from "./VeiculoContext";
import Alerta from "../../Alerta";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

function Tabela() {
  const { alerta, listaObjetos, remover } = useContext(veiculoContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Veículos</h1>
      <Alerta alerta={alerta} />
      <Button variant="primary">
        Novo <i className="bi bi-file-earmark-plus"></i>
      </Button>
      {listaObjetos.length === 0 && <h1>Nenhuma veículo encontrada</h1>}
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
              <th>Placa</th>
              <th>Modelo</th>
              <th>Cor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaObjetos.map((objeto) => (
              <tr key={objeto.id}>
                <td>{objeto.id}</td>
                <td>{objeto.placa}</td>
                <td>{objeto.modelo}</td>
                <td>{objeto.cor}</td>
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
