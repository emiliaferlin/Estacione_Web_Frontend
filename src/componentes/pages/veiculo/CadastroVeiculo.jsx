import { useEffect, useState } from "react";
import {
  deleteVeiculoPorCodigoAPI,
  getVeiculoAPI,
} from "../../../service/VeiculoService";
import Tabela from "./TabelaVeiculo";
import VeiculoContext from "./VeiculoContext";

function CadastroVeiculo() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);

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
      }}
    >
      <Tabela />
    </VeiculoContext.Provider>
  );
}

export default CadastroVeiculo;
