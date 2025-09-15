import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router'
import { useNavigate } from 'react-router'


function NavBar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <Navbar collapseOnSelect expand="lg" className="custom-navbar pt-4 pb-5" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand-text">KS EXPENSE MANAGER</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto gap-4 nav-links">
                        <Nav.Link as={NavLink} to={localStorage.getItem("token")? "/dashboard" : "/login"}>Dashboard</Nav.Link>
                        <Nav.Link as={NavLink} to={localStorage.getItem("token")? "/overview" : "/login"}>Overview</Nav.Link>
                        <Nav.Link as={NavLink} to='/register' disabled={localStorage.getItem("token")}>Register</Nav.Link>
                        {localStorage.getItem("token") ?
                            <Nav.Link onClick={handleLogout} className="logout-btn">Log-Out</Nav.Link> :
                            <Nav.Link as={NavLink} to='/login'>Log-In</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
