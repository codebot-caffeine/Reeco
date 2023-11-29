import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";

import "./Topbar.css";
function BreadcrumbExample() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
  );
}

function TopBar() {
  return (
    <>
      <Navbar className="navbar">
        <Container>
          <Navbar.Brand href="#home">Reeco</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>Store</Nav.Link>
            <Nav.Link>Orders</Nav.Link>
            <Nav.Link >Analytics</Nav.Link>

           
          </Nav>
          <i class="fa-solid fa-cart-shopping text-white ml-auto d-block" ></i>
          
          <p className="text-white mb-0 ms-2">Hello, james <i class="fa-solid fa-caret-down text-white"></i></p>
        </Container>
      </Navbar>
      <Container fluid className="secondaryNav">
      <Container >
          <BreadcrumbExample />
          <div className="navDown">
            <h4>Order 32457ABC</h4>
            <div className="btn-pair">
              <Button variant="outline-primary">Back</Button>
              <Button variant="primary">Approve order</Button>
            </div>
          </div>
        </Container>
      </Container>
        
    </>
  );
}

export default TopBar;
