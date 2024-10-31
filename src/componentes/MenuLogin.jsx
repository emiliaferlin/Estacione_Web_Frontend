import { Container, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

function MenuLogin() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink
            className="navbar-brand"
            aria-current="page"
            exact="true"
            to="/publico"
          >
            Estacione
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default MenuLogin;
