import { useState, useEffect } from 'react';
import VagaContext from './VagaContext';
import Tabela from './TabelaVaga';
import {
    getVagaAPI, getVagaPorCodigoAPI,
    deleteVagaPorCodigoAPI, cadastraVagaAPI
} from '../../../service/VagaService';

function CadastroVaga() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const recuperaVaga = async () => {
        setListaObjetos(await getVagaAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteVagaPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaVaga();
        }
    }

    useEffect(() => {
        recuperaVaga();
    }, []);

    return (
		<VagaContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos,
                remover
            }
        }>
            <Tabela/>
        </VagaContext.Provider>
   )
}

export default CadastroVaga;