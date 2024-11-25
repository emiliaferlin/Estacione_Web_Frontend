import { getToken } from "../seguranca/Autenticacao";

export const getHistoricoAPI = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/historicoEstacionamento`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: getToken(),
      },
    }
  );
  const data = await response.json();
  return data;
};

export const getHistoricoPorCodigoAPI = async (codigo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/historicoEstacionamento/${codigo}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: getToken(),
      },
    }
  );
  const data = await response.json();
  return data;
};

export const deleteHistoricoPorCodigoAPI = async (codigo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/historicoEstacionamento/${codigo}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: getToken(),
      },
    }
  );
  const data = await response.json();
  return data;
};

export const cadastraHistoricoAPI = async (objeto, metodo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/historicoEstacionamento`,
    {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        authorization: getToken(),
      },
      body: JSON.stringify(objeto),
    }
  );
  const data = await response.json();
  return data;
};
