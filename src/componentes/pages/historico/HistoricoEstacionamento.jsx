import { useState, useEffect } from "react";
import HistoricoContext from "./HistoricoContext";
import TabelaGenerica from "../../widgets/TabelaGenerica";
import FormularioGenerico from "../../widgets/FormularioGenerico";
import {
  getHistoricoAPI,
  getHistoricoPorCodigoAPI,
  deleteHistoricoPorCodigoAPI,
  cadastraHistoricoAPI,
} from "../../../service/HistoricoService";

function CadastroHistorico() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [exibirForm, setExibirForm] = useState(false);
  const [objeto, setObjeto] = useState({
    id: 0,
    id_vaga: 0,
    id_veiculo: 0,
    data_entrada: "",
    data_saida: "",
  });

  const colunas = ["id", "id_vaga", "id_veiculo", "data_entrada", "data_saida"];
  const colunasDes = [
    "Código",
    "Código Vaga",
    "Código Veículo",
    "Data de Entrada",
    "Data de Saída",
  ];

  const campos = [
    {
      id: "txtId",
      name: "id",
      label: "Código",
      tipo: "number",
      value: objeto.id,
      requerido: true,
      readonly: false,
      maxCaracteres: 40,
    },
    {
      id: "txtIdVaga",
      name: "id_vaga",
      label: "Código Vaga",
      tipo: "number",
      value: objeto.id_vaga,
      requerido: true,
      readonly: false,
      maxCaracteres: 40,
    },
    {
      id: "txtIdVeiculo",
      name: "id_veiculo",
      label: "Código Veículo",
      tipo: "number",
      value: objeto.id_veiculo,
      requerido: true,
      readonly: false,
      maxCaracteres: 40,
    },
    {
      id: "txtDataEntrada",
      name: "data_entrada",
      label: "Data Entrada",
      tipo: "text",
      value: objeto.data_entrada,
      requerido: true,
      readonly: false,
      maxCaracteres: 40,
    },
    {
      id: "txtDataSaida",
      name: "data_saida",
      label: "Data Saída",
      tipo: "text",
      value: objeto.data_saida,
      requerido: true,
      readonly: false,
      maxCaracteres: 40,
    },
  ];

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({
      id: 0,
      id_vaga: 0,
      id_veiculo: 0,
      data_entrada: "",
      data_saida: "",
    });
    setExibirForm(true);
  };

  const editarObjeto = async (id) => {
    setObjeto(await getHistoricoPorCodigoAPI(id));
    setEditar(true);
    setAlerta({ status: "", message: "" });
    setExibirForm(true);
  };

  const acaoCadastrarVeiculo = async (e) => {
    e.preventDefault();
    const metodo = editar ? "PUT" : "POST";
    try {
      let retornoAPI = await cadastraHistoricoAPI(objeto, metodo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      setObjeto(retornoAPI.objeto);
      if (!editar) {
        setEditar(true);
      }
    } catch (e) {
      console.log(e);
    }

    recuperaHistorico();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  };

  const recuperaHistorico = async () => {
    setListaObjetos(await getHistoricoAPI());
  };

  const remover = async (codigo) => {
    if (window.confirm("Deseja remover este objeto?")) {
      let retornoAPI = await deleteHistoricoPorCodigoAPI(codigo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      recuperaHistorico();
    }
  };

  useEffect(() => {
    recuperaHistorico();
  }, []);

  return (
    <HistoricoContext.Provider
      value={{
        alerta,
        setAlerta,
        listaObjetos,
        remover,
        objeto,
        editarObjeto,
        novoObjeto,
        acaoCadastrarVeiculo,
        handleChange,
        exibirForm,
        setExibirForm,
      }}
    >
      <TabelaGenerica
        alerta={alerta}
        colunas={colunas}
        colunasDes={colunasDes}
        dados={listaObjetos}
        onNovo={novoObjeto}
        onEditar={editarObjeto}
        onRemover={remover}
        titulo={"Histórico"}
      />
      <FormularioGenerico
        titulo="Histórico Estacionamento"
        alerta={alerta}
        campos={campos}
        handleChange={handleChange}
        acaoCadastrar={acaoCadastrarVeiculo}
        exibirForm={exibirForm}
        setExibirForm={setExibirForm}
      />
    </HistoricoContext.Provider>
  );
}

export default CadastroHistorico;
