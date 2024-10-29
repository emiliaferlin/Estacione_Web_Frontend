import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core/dist/cjs/popper.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import AppContext from "./componentes/AppContext";
import Home from "./componentes/pages/Home";
import Menu from "./componentes/Menu";
import Login from "./componentes/pages/Login";
import CadastroVaga from "./componentes/pages/vaga/CadastroVaga";
import CadastroVeiculo from "./componentes/pages/veiculo/CadastroVeiculo";
import HistoricoEstacionamento from "./componentes/pages/historico/HistoricoEstacionamento";

function App() {
  const [nome, setNome] = useState(localStorage.getItem("nome") || "");
  const [senha, setSenha] = useState(localStorage.getItem("senha") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("nome")
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Menu />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/vaga",
          element: <CadastroVaga />,
        },
        {
          path: "/veiculo",
          element: <CadastroVeiculo />,
        },
        {
          path: "/historicoEstacionamento",
          element: <HistoricoEstacionamento />,
        },
        {
          path: "/logout",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        nome,
        setNome,
        senha,
        setSenha,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
