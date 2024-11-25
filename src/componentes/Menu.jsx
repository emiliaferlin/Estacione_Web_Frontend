import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { getUsuario, logout } from "../seguranca/Autenticacao";

function Menu() {
  const usuario = getUsuario();

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink className="navbar-brand" exact="true" to="/privado">
            Estacione
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {usuario && (
                <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                  <NavLink className="dropdown-item" exact="true" to="vaga">
                    Vagas
                  </NavLink>
                  <NavLink className="dropdown-item" exact="true" to="veiculo">
                    Veiculos
                  </NavLink>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
          <NavLink
            className="dropdown-item"
            exact="true"
            to="historicoEstacionamento"
          >
            Histórico Estacionamento
          </NavLink>
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown
              title={usuario ? "Usuário: " + usuario.nome : "Usuário"}
              id="basic-nav-dropdown"
            >
              {usuario ? (
                <NavLink
                  className="dropdown-item"
                  exact="true"
                  to="/"
                  onClick={() => logout()}
                >
                  Sair
                </NavLink>
              ) : (
                <NavLink className="dropdown-item" exact="true" to="login">
                  Entrar
                </NavLink>
              )}
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default Menu;
