import { useState, useEffect } from "react";
import VagaContext from "./VagaContext";
import TabelaGenerica from "../../widgets/TabelaGenerica";
import FormularioGenerico from "../../widgets/FormularioGenerico";
import {
  getVagaAPI,
  getVagaPorCodigoAPI,
  deleteVagaPorCodigoAPI,
  cadastraVagaAPI,
} from "../../../service/VagaService";
import { useNavigate } from "react-router-dom";
import WithAuth from "../../../seguranca/WithAuth";

function CadastroVaga() {
  let navigate = useNavigate();
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [exibirForm, setExibirForm] = useState(false);
  const [objeto, setObjeto] = useState({
    numero_vaga: "",
    ocupada: "",
  });

  const colunas = ["id", "numero_vaga", "ocupada"];
  const colunasDes = ["Código", "Número Vaga", "Disponível"];

  const campos = [
    {
      id: "txtVaga",
      name: "numero_vaga",
      label: "Número Vaga",
      tipo: "text",
      value: objeto.numero_vaga,
      requerido: true,
      readonly: false,
      maxCaracteres: 40,
    },
    {
      id: "txtOcupada",
      name: "ocupada",
      label: "Disponibilidade da Vaga",
      tipo: "number",
      value: objeto.ocupada,
      requerido: true,
      readonly: false,
      maxCaracteres: 40,
    },
  ];

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({ numero_vaga: "", ocupada: 0 });
    setExibirForm(true);
  };

  const editarObjeto = async (id) => {
    try {
      setObjeto(await getVagaPorCodigoAPI(id));
      setEditar(true);
      setAlerta({ status: "", message: "" });
      setExibirForm(true);
    } catch (err) {
      navigate("/login", { replace: true });
    }
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
      navigate("/login", { replace: true });
      console.log(e);
    }

    setExibirForm(false);
    recuperaVaga();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  };

  const recuperaVaga = async () => {
    try {
      setListaObjetos(await getVagaAPI());
    } catch (err) {
      navigate("/login", { replace: true });
    }
  };

  const remover = async (id) => {
    try {
      if (window.confirm("Deseja remover esta Vaga?")) {
        let retornoAPI = await deleteVagaPorCodigoAPI(id);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        recuperaVaga();
      }
    } catch (err) {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    recuperaVaga();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <TabelaGenerica
        alerta={alerta}
        colunas={colunas}
        colunasDes={colunasDes}
        dados={listaObjetos}
        onNovo={novoObjeto}
        onEditar={editarObjeto}
        onRemover={remover}
        titulo={"Vaga"}
      />
      <FormularioGenerico
        titulo="Vaga"
        alerta={alerta}
        campos={campos}
        handleChange={handleChange}
        acaoCadastrar={acaoCadastrarVaga}
        exibirForm={exibirForm}
        setExibirForm={setExibirForm}
      />
    </VagaContext.Provider>
  );
}

export default WithAuth(CadastroVaga);
