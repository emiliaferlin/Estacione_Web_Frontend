import React from "react";
import { Button, Table } from "react-bootstrap";
import Alerta from "../widgets/Alerta";

function TabelaGenerica({
  alerta,
  colunasDes,
  colunas,
  dados,
  onNovo,
  onEditar,
  onRemover,
  titulo,
}) {
  console.log(dados);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{titulo}</h1>
      <Alerta alerta={alerta} />
      <Button style={{ marginBottom: "20px" }} variant="primary" onClick={onNovo}>
        Adicionar {titulo} <i className="bi bi-file-earmark-plus"></i>
      </Button>
      {dados.length === 0 && <h1>Nenhum {titulo} encontrado</h1>}
      {dados.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {colunasDes.map((coluna) => (
                <th key={coluna} style={{ textAlign: "center" }}>
                  {coluna}
                </th>
              ))}
              <th style={{ textAlign: "center" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((item) => (
              <tr style={{ textAlign: "center" }} key={item.id}>
                {console.log(colunas)}
                {colunas.map((coluna) => (
                  <td key={coluna}>{item[coluna]}</td>
                ))}

                <td align="center">
                  <Button
                    variant="info"
                    onClick={() => onEditar(item.id)}
                    style={{ marginRight: "5px" }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button variant="danger" onClick={() => onRemover(item.id)}>
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

export default TabelaGenerica;
