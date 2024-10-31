import { useContext } from "react";
import Alerta from "../../widgets/Alerta";
import HistoricoContext from "./HistoricoContext";
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
  } = useContext(HistoricoContext);

  return (
    <Dialogo
      id="modalEdicao"
      titulo="Histórico Estacionamento"
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
          msgvalido="Código inserido"
          msginvalido="Informe o Código"
          requerido={true}
          readonly={false}
          maxCaracteres={40}
        />
      </Col>
      <Col xs={12} md={12}>
        <CampoEntrada
          value={objeto.id_vaga}
          id="txtIdVaga"
          name="id_vaga"
          label="Código Vaga"
          tipo="number"
          onchange={handleChange}
          msgvalido="Código inserido"
          msginvalido="Informe o Código da Vaga"
          requerido={true}
          readonly={false}
          maxCaracteres={40}
        />
      </Col>
      <Col xs={12} md={12}>
        <CampoEntrada
          value={objeto.id_veiculo}
          id="txtIdVeiculo"
          name="id_veiculo"
          label="Código Veículo"
          tipo="number"
          onchange={handleChange}
          msgvalido="Código inserido"
          msginvalido="Informe o Código do Veículo"
          requerido={true}
          readonly={false}
          maxCaracteres={40}
        />
      </Col>
      <Col xs={12} md={12}>
        <CampoEntrada
          value={objeto.data_entrada}
          id="txtDataEntrada"
          name="data_entrada"
          label="Data Entrada"
          tipo="text"
          onchange={handleChange}
          msgvalido="Data inserida"
          msginvalido="Informe a Data de Entrada"
          requerido={true}
          readonly={false}
          maxCaracteres={40}
        />
      </Col>
      <Col xs={12} md={12}>
        <CampoEntrada
          value={objeto.data_saida}
          id="txtDataSaida"
          name="data_saida"
          label="Data Saída"
          tipo="text"
          onchange={handleChange}
          msgvalido="Data inserida"
          msginvalido="Informe a Data de Saída"
          requerido={true}
          readonly={false}
          maxCaracteres={40}
        />
      </Col>
    </Dialogo>
  );
}

export default Formulario;
