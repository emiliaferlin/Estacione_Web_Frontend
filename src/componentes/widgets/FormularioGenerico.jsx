import { Col } from "react-bootstrap";
import React from "react";
import Alerta from "./Alerta";
import Dialogo from "./Dialogo";
import CampoEntrada from "./CampoEntrada";

function FormularioGenerico({
  titulo,
  alerta,
  campos,
  handleChange,
  acaoCadastrar,
  exibirForm,
  setExibirForm,
}) {
  return (
    <Dialogo
      id="modalEdicao"
      titulo={titulo}
      idform="formulario"
      acaoCadastrar={acaoCadastrar}
      exibirForm={exibirForm}
      setExibirForm={setExibirForm}
    >
      <Alerta alerta={alerta} />
      {campos.map((campo) => (
        <Col xs={12} md={12} key={campo.id}>
          <CampoEntrada
            value={campo.value}
            id={campo.id}
            name={campo.name}
            label={campo.label}
            tipo={campo.tipo}
            onchange={handleChange}
            msgvalido="Dado inserido com sucesso"
            msginvalido="Campo obrigatório"
            requerido={campo.requerido}
            readonly={campo.readonly}
            maxCaracteres={campo.maxCaracteres}
          />
        </Col>
      ))}
    </Dialogo>
  );
}

export default FormularioGenerico;
