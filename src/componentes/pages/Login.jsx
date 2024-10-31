import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";
import "../../App.css";

const Login = () => {
  const { nome, setNome, senha, setSenha, setIsAuthenticated } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (nome && senha) {
      localStorage.setItem("nome", nome);
      localStorage.setItem("senha", senha);
      setIsAuthenticated(true);
      navigate("/");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div className="login-view">
      <div className="login-container">
        <div className="dados-container">
          <label>Nome: </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="dados-container">
          <label>Senha: </label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className="dados-container">
          <button className="todos-button" onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
