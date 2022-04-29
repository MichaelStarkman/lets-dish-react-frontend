import React from 'react';
// import { useState } from "react";
import { 
    Container,
    Nav,
    Navbar
} from 'react-bootstrap';
import './NavBar.css'

const NavBar = () => {
    return (
        <>
            <div>
                <Navbar 
                className="NavBar" 
                bg="light" 
                variant="light"
                fixed="top"
                >
                    <Container>
                    <Navbar.Brand href="#/">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/004/791/679/small/plate-fork-and-knife-icon-free-vector.jpg" alt="" />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Dishes</Nav.Link>
                        <Nav.Link href="#pricing">Contact</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}

export default NavBar;
