import React from 'react';
// import { useState } from "react";
import { 
    Container,
    Navbar
} from 'react-bootstrap';

const FooterBar = () => {
    return (
        <>
            <div>
                <Navbar 
                className="footer-bar" 
                bg="light" 
                variant="light"
                >
                    <Container>
                        <Navbar.Text>
                            Let's Dish
                        </Navbar.Text>
                        <Navbar.Text>
                            © Michael Starkman 2022
                        </Navbar.Text>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}

export default FooterBar;