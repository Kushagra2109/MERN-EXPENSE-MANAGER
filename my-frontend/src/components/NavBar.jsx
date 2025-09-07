import React from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link, NavLink } from 'react-router'
import { useNavigate } from 'react-router'



function NavBar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary pb-4 pt-4" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">KS EXPENSE MANAGER</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto gap-5">
                        <Nav.Link as={NavLink} to="/dashboard" href="#features">Dashboard</Nav.Link>
                        <Nav.Link as={NavLink} to="/overview" href="#pricing">Overview</Nav.Link>
                        <Nav.Link  as={NavLink} to='/register' disabled={localStorage.getItem("token")}>Register</Nav.Link>
                        {localStorage.getItem("token") ?
                        <Nav.Link onClick={handleLogout} >Log-Out</Nav.Link>:
                        <Nav.Link as={NavLink} to='/login'>Log-In</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar