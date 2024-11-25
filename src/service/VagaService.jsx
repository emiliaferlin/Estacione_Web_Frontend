import { getToken } from "../seguranca/Autenticacao";

export const getVagaAPI = async () => {
  const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/vaga`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: getToken(),
    },
  });
  const data = await response.json();
  return data;
};

export const getVagaPorCodigoAPI = async (codigo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/vaga/${codigo}`,
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

export const deleteVagaPorCodigoAPI = async (codigo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/vaga/${codigo}`,
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

export const cadastraVagaAPI = async (objeto, metodo) => {
  const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/vaga`, {
    method: metodo,
    headers: { "Content-Type": "application/json", authorization: getToken() },
    body: JSON.stringify(objeto),
  });
  const data = await response.json();
  return data;
};
