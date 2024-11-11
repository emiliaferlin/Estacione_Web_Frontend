import Alerta from "../../widgets/Alerta";
import Col from "react-bootstrap/Col";
import CampoEntrada from "../../widgets/CampoEntrada";
import Dialogo from "../../widgets/Dialogo";
import CampoSelect from "../../widgets/CampoSelect";

function Formulario({
  titulo,
  alerta,
  campos,
  handleChange,
  acaoCadastrar,
  exibirForm,
  setExibirForm,
  listaVaga,
  listaVeiculo,
  objeto,
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
      <Col xs={12} md={12}>
        <CampoSelect
          value={objeto.id_veiculo}
          id="idVeiculo"
          name="id_veiculo"
          label="Veículo"
          onchange={handleChange}
          msgvalido="Dado inserido com sucessoa"
          msginvalido="Informe o Veículo"
          requerido={true}
        >
          {listaVeiculo.map((veiculo) => (
            <option key={veiculo.id} value={veiculo.id}>
              {veiculo.placa}
            </option>
          ))}
        </CampoSelect>
      </Col>
      <Col xs={12} md={12}>
        <CampoSelect
          value={objeto.id_vaga}
          id="idVaga"
          name="id_vaga"
          label="Vaga"
          onchange={handleChange}
          msgvalido="Dado inserido com sucesso"
          msginvalido="Informe a Vaga"
          requerido={true}
        >
          {listaVaga.map(
            (vaga) => (
              console.log(vaga),
              (
                <option key={vaga.id} value={vaga.id}>
                  {vaga.numero_vaga}
                </option>
              )
            )
          )}
        </CampoSelect>
      </Col>
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

export default Formulario;
