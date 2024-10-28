import { useState, useEffect } from "react";
import VagaContext from "./VagaContext";
import Tabela from "./TabelaVaga";
import {
  getVagaAPI,
  getVagaPorCodigoAPI,
  deleteVagaPorCodigoAPI,
  cadastraVagaAPI,
} from "../../../service/VagaService";
import Formulario from "./Formulario";

function CadastroVaga() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [exibirForm, setExibirForm] = useState(false);
  const [objeto, setObjeto] = useState({ id: "", numero_vaga: "" });

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({ id: 0, numero_vaga: "" });
    setExibirForm(true);
  };

  const editarObjeto = async (id) => {
    setObjeto(await getVagaPorCodigoAPI(id));
    setEditar(true);
    setAlerta({ status: "", message: "" });
    setExibirForm(true);
  };

  const acaoCadastrarVaga = async (e) => {
    e.preventDefault();
    const metodo = editar ? "PUT" : "POST";
    try {
      let retornoAPI = await cadastraVagaAPI(objeto, metodo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      setObjeto(retornoAPI.objeto);
      if (!editar) {
        setEditar(true);
      }
    } catch (e) {
      console.log(e);
    }

    recuperaVaga();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  };

  const recuperaVaga = async () => {
    setListaObjetos(await getVagaAPI());
  };

  const remover = async (id) => {
    if (window.confirm("Deseja remover este objeto?")) {
      let retornoAPI = await deleteVagaPorCodigoAPI(id);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      recuperaVaga();
    }
  };

  useEffect(() => {
    recuperaVaga();
  }, []);

  return (
    <VagaContext.Provider
      value={{
        alerta,
        setAlerta,
        listaObjetos,
        remover,
        objeto,
        editarObjeto,
        novoObjeto,
        acaoCadastrarVaga,
        handleChange,
        exibirForm,
        setExibirForm,
      }}
    >
      <Tabela />
      <Formulario />
    </VagaContext.Provider>
  );
}

export default CadastroVaga;
