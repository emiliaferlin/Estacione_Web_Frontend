import { useEffect, useState } from "react";
import {
  cadastraVeiculoAPI,
  deleteVeiculoPorCodigoAPI,
  getVeiculoAPI,
  getVeiculoPorCodigoAPI,
} from "../../../service/VeiculoService";
import Tabela from "./TabelaVeiculo";
import VeiculoContext from "./VeiculoContext";
import Formulario from "./Formulario";

function CadastroVeiculo() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [exibirForm, setExibirForm] = useState(false);
  const [objeto, setObjeto] = useState({ id: "", placa: "" , modelo: "", cor: "",});

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({ id: 0, placa: "" , modelo: "", cor: "",});
    setExibirForm(true);
  };

  const editarObjeto = async (id) => {
    setObjeto(await getVeiculoPorCodigoAPI(id));
    setEditar(true);
    setAlerta({ status: "", message: "" });
    setExibirForm(true);
  };

  const acaoCadastrarVeiculo = async (e) => {
    e.preventDefault();
    const metodo = editar ? "PUT" : "POST";
    try {
      let retornoAPI = await cadastraVeiculoAPI(objeto, metodo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      setObjeto(retornoAPI.objeto);
      if (!editar) {
        setEditar(true);
      }
    } catch (e) {
      console.log(e);
    }

    recuperaVeiculo();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  };

  const recuperaVeiculo = async () => {
    setListaObjetos(await getVeiculoAPI());
  };

  const remover = async (codigo) => {
    if (window.confirm("Deseja remover este objeto?")) {
      let retornoAPI = await deleteVeiculoPorCodigoAPI(codigo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      recuperaVeiculo();
    }
  };

  useEffect(() => {
    recuperaVeiculo();
  }, []);

  return (
    <VeiculoContext.Provider
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
      <Tabela />
      <Formulario/>
    </VeiculoContext.Provider>
  );
}

export default CadastroVeiculo;
