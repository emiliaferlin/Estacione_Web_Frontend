import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';

function Menu() {
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
                            <NavLink className="nav-link active" aria-current="page" exact="true" to="/logout">Sair</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default Menu;