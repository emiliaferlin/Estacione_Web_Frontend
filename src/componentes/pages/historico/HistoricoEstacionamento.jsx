import { useState, useEffect } from "react";
import HistoricoContext from "./HistoricoContext";
import TabelaGenerica from "../../widgets/TabelaGenerica";
import Formulario from "./Formulario";
import {
  getHistoricoAPI,
  getHistoricoPorCodigoAPI,
  deleteHistoricoPorCodigoAPI,
  cadastraHistoricoAPI,
} from "../../../service/HistoricoService";
import { getVeiculoAPI } from "../../../service/VeiculoService";
import { getVagaAPI } from "../../../service/VagaService";

function CadastroHistorico() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [exibirForm, setExibirForm] = useState(false);
  const [objeto, setObjeto] = useState({
    id_veiculo: 1,
    id_vaga: 1,
    data_entrada: "",
    data_saida: "",
  });
  const [listaVaga, setListaVaga] = useState([]);
  const [listaVeiculo, setVeiculo] = useState([]);

  const recuperaVaga = async () => {
    setListaVaga(await getVagaAPI());
  };

  const recuperaVeiculo = async () => {
    setVeiculo(await getVeiculoAPI());
  };

  const colunas = ["id", "placa", "numero_vaga", "data_entrada", "data_saida"];
  const colunasDes = [
    "Código",
    "Placa do Veículo",
    "Número da Vaga",
    "Data de Entrada",
    "Data de Saída",
  ];
  
  const campos = [
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
      requerido: false,
      readonly: false,
      maxCaracteres: 40,
    },
  ];

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({
      id_veiculo: 0,
      id_vaga: 0,
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

  const acaoCadastrarHistorico = async (e) => {
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
    setExibirForm(false);
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
    recuperaVaga();
    recuperaVeiculo();
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
        acaoCadastrarHistorico,
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
      <Formulario
        titulo="Histórico Estacionamento"
        alerta={alerta}
        campos={campos}
        handleChange={handleChange}
        acaoCadastrar={acaoCadastrarHistorico}
        exibirForm={exibirForm}
        setExibirForm={setExibirForm}
        listaVaga={listaVaga}
        listaVeiculo={listaVeiculo}
        objeto={objeto}
      />
    </HistoricoContext.Provider>
  );
}

export default CadastroHistorico;
