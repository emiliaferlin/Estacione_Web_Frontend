import { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AppContext from "./AppContext";

function Menu() {
  const { setNome, setSenha, setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("nome");
    localStorage.removeItem("senha");
    setNome("");
    setSenha("");
    setIsAuthenticated(false);
    navigate("/publico"); 
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink className="navbar-brand" aria-current="page" exact="true" to="/">Estacione</NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                <NavLink className="dropdown-item" exact="true" to="vaga">Cadastro Vaga</NavLink>
                <NavLink className="dropdown-item" exact="true" to="veiculo">Cadastro Veículo</NavLink>
              </NavDropdown>
              <NavLink className="nav-link active" aria-current="page" exact="true" to="/historicoEstacionamento">Histórico Estacionamento</NavLink>
              <Nav.Link className="nav-link" onClick={handleLogout}>Sair</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default Menu;
