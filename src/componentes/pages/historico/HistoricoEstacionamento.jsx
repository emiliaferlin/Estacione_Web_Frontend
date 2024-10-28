import { useState, useEffect } from 'react';
import HistoricoContext from './HistoricoContext';
import Tabela from './TabelaHistorico';
import {
    getHistoricoAPI, getHistoricoPorCodigoAPI,
    deleteHistoricoPorCodigoAPI, cadastraHistoricoAPI
} from '../../../service/HistoricoService';

function CadastroHistorico() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const recuperaHistorico = async () => {
        setListaObjetos(await getHistoricoAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteHistoricoPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaHistorico();
        }
    }

    useEffect(() => {
        recuperaHistorico();
    }, []);

    return (
		<HistoricoContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos,
                remover
            }
        }>
            <Tabela/>
        </HistoricoContext.Provider>
   )
}

export default CadastroHistorico;