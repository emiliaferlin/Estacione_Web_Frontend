import { useEffect, useState } from "react";
import TabelaGenerica from "../../widgets/TabelaGenerica";
import FormularioGenerico from "../../widgets/FormularioGenerico";
import VeiculoContext from "./VeiculoContext";
import {
  cadastraVeiculoAPI,
  deleteVeiculoPorCodigoAPI,
  getVeiculoAPI,
  getVeiculoPorCodigoAPI,
} from "../../../service/VeiculoService";
import { useNavigate } from "react-router-dom";
import WithAuth from "../../../seguranca/WithAuth";

function CadastroVeiculo() {
  let navigate = useNavigate();
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [exibirForm, setExibirForm] = useState(false);
  const [objeto, setObjeto] = useState({
    placa: "",
    modelo: "",
    cor: "",
  });

  const colunas = ["id", "placa", "modelo", "cor"];
  const colunasDes = ["Código", "Placa", "Modelo", "Cor"];

  const campos = [
    {
      id: "txtPlaca",
      name: "placa",
      label: "Placa",
      tipo: "text",
      value: objeto.placa,
      requerido: true,
      readonly: false,
      maxCaracteres: 40,
    },
    {
      id: "txtModelo",
      name: "modelo",
      label: "Modelo",
      tipo: "text",
      value: objeto.modelo,
      requerido: true,
      readonly: false,
      maxCaracteres: 40,
    },
    {
      id: "txtCor",
      name: "cor",
      label: "Cor",
      tipo: "text",
      value: objeto.cor,
      requerido: true,
      readonly: false,
      maxCaracteres: 40,
    },
  ];

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({ placa: "", modelo: "", cor: "" });
    setExibirForm(true);
  };

  const editarObjeto = async (id) => {
    try {
      setObjeto(await getVeiculoPorCodigoAPI(id));
      setEditar(true);
      setAlerta({ status: "", message: "" });
      setExibirForm(true);
    } catch (err) {
      navigate("/login", { replace: true });
    }
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
      navigate("/login", { replace: true });
      console.log(e);
    }

    setExibirForm(false);
    recuperaVeiculo();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  };

  const recuperaVeiculo = async () => {
    try {
      setListaObjetos(await getVeiculoAPI());
    } catch (err) {
      navigate("/login", { replace: true });
    }
  };

  const remover = async (codigo) => {
    try {
      if (window.confirm("Deseja remover este Veículo?")) {
        let retornoAPI = await deleteVeiculoPorCodigoAPI(codigo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        recuperaVeiculo();
      }
    } catch (err) {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    recuperaVeiculo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <TabelaGenerica
        alerta={alerta}
        colunas={colunas}
        colunasDes={colunasDes}
        dados={listaObjetos}
        onNovo={novoObjeto}
        onEditar={editarObjeto}
        onRemover={remover}
        titulo={"Veículo"}
      />
      <FormularioGenerico
        titulo="Veículo"
        alerta={alerta}
        campos={campos}
        handleChange={handleChange}
        acaoCadastrar={acaoCadastrarVeiculo}
        exibirForm={exibirForm}
        setExibirForm={setExibirForm}
      />
    </VeiculoContext.Provider>
  );
}

export default WithAuth(CadastroVeiculo);
