import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function BootstrapNavbar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/stack">
                Stack
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/linkedlist">
                Linked List
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default BootstrapNavbar;
