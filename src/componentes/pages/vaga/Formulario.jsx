import { useContext } from "react";
import Alerta from "../../widgets/Alerta";
import VagaContext from "./VagaContext";
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
  } = useContext(VagaContext);

  return (
    <Dialogo
      id="modalEdicao"
      titulo="Vaga"
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
          value={objeto.numero_vaga}
          id="txtVaga"
          name="numero_vaga"
          label="Número Vaga"
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
