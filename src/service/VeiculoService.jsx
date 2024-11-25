import { getToken } from "../seguranca/Autenticacao";

export const getVeiculoAPI = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/veiculo`,
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

export const getVeiculoPorCodigoAPI = async (codigo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/veiculo/${codigo}`,
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

export const deleteVeiculoPorCodigoAPI = async (codigo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/veiculo/${codigo}`,
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

export const cadastraVeiculoAPI = async (objeto, metodo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/veiculo`,
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
