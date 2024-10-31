import { useContext } from "react";
import Alerta from "../../widgets/Alerta";
import VeiculoContext from "./VeiculoContext";
import Col from "react-bootstrap/Col";
import CampoEntrada from "../../widgets/CampoEntrada";
import Dialogo from "../../widgets/Dialogo";

function Formulario() {
  const {
    objeto,
    handleChange,
    acaoCadastrar,
    alerta,
    exibirForm,
    setExibirForm,
  } = useContext(VeiculoContext);

  return (
    <Dialogo
      id="modalEdicao"
      titulo="Veículo"
      idform="formulario"
      acaoCadastrar={acaoCadastrar}
      exibirForm={exibirForm}
      setExibirForm={setExibirForm}
    >
      <Alerta alerta={alerta} />
      <Col xs={12} md={12}>
        <CampoEntrada
          value={objeto.id}
          id="txtId"
          name="id"
          label="Código"
          tipo="number"
          onchange={handleChange}
          msgvalido="Dado inserido com sucesso"
          msginvalido="Campo obrigatório"
          requerido={true}
          readonly={false}
          maxCaracteres={40}
        />
      </Col>
      <Col xs={12} md={12}>
        <CampoEntrada
          value={objeto.placa}
          id="txtPlaca"
          name="placa"
          label="Paca"
          tipo="text"
          onchange={handleChange}
          msgvalido="Dado inserido com sucesso"
          msginvalido="Campo obrigatório"
          requerido={true}
          readonly={false}
          maxCaracteres={40}
        />
      </Col>
      <Col xs={12} md={12}>
        <CampoEntrada
          value={objeto.modelo}
          id="txtModelo"
          name="modelo"
          label="Modelo"
          tipo="text"
          onchange={handleChange}
          msgvalido="Dado inserido com sucesso"
          msginvalido="Campo obrigatório"
          requerido={true}
          readonly={false}
          maxCaracteres={40}
        />
      </Col>
      <Col xs={12} md={12}>
        <CampoEntrada
          value={objeto.cor}
          id="txtCor"
          name="cor"
          label="Cor"
          tipo="text"
          onchange={handleChange}
          msgvalido="Dado inserido com sucesso"
          msginvalido="Campo obrigatório"
          requerido={true}
          readonly={false}
          maxCaracteres={40}
        />
      </Col>
    </Dialogo>
  );
}

export default Formulario;
