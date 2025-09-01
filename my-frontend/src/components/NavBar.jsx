import React from 'react'
import { Container, Navbar, Nav , NavDropdown } from 'react-bootstrap'
import { Link ,NavLink } from 'react-router'

function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary pb-4 pt-4" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">KS EXPENSE MANAGER</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto gap-5">
                        <Nav.Link as={NavLink}  to="/" href="#features">Dashboard</Nav.Link>
                        <Nav.Link as={NavLink}  to="/overview" href="#pricing">Overview</Nav.Link>
                        <Nav.Link as={NavLink}  to="/contact" href="#pricing">Contact</Nav.Link>
                        <Nav.Link as={NavLink}  to="/help" href="#pricing">Help</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar