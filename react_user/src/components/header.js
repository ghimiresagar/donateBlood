import React, { useContext } from 'react';

import { AuthContext } from '../Context/AuthContext';
import AuthService from '../Services/AuthService';
import { Nav, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Header = props => {
    const { setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const authNavBar = () => {
        return (
            <Nav className="bg-light">
                <Button variant="light" href="/" className="m-2">Dashboard</Button>
                <Button variant="light" href="/profile" className="m-2">Profile</Button>
                <Button variant="light" onClick={onClickLogout} className="m-2">Logout</Button>
            </Nav>
        )
    }

    const nauthNavBar = () => {
        return (
            <Nav className="bg-light">
                <Button variant="light" href="/login" className="m-2">Login</Button>
                <Button variant="light" href="/register" className="m-2">Register</Button>
            </Nav>
        )
    }

    const onClickLogout = () => {
        AuthService.logout().then(data => {
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        })
    }


    return(
        <>
        <Navbar className="bg-light justify-content-between" variant="light">
            <Navbar.Brand href="/">{props.value}</Navbar.Brand>
                { isAuthenticated ? authNavBar() : nauthNavBar() }
        </Navbar> <hr/>
        </>
    );
}

export default Header;