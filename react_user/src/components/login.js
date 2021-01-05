import React, { useState, useContext } from 'react';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';

import Message from './message';
import Header from './header';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const Login = props => {
    const [validated, setValidated] = useState(false);
    const [ user, setUser ] = useState({
        username: "",
        password: ""
    });
    const [ message, setMessage ] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // form validation
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        // check validation of username and password
        AuthService.login(user).then(data => {
            const { isAuthenticated, user, message } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                window.location.href += '/';
            } else {
                setMessage(message);
            }
        })       
    }
  
    return (
        <Container>
          <Header value="Blood Donor Finder" />
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="4">
                </Form.Group>

                <Form.Group as={Col} md="4" className="m-1 p-3">
                    <h2 className="text-center">Login</h2> 
                    <hr/> <br />
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                            <Form.Label>Username/Email:</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    onChange={onChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="validationCustomPassword">
                            <Form.Label>Password:</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    onChange={onChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a password.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <div className="text-center">
                        <Button type="submit">
                            Submit
                        </Button>
                    </div>
                    <div className="m-1 p-1">
                        {message ? <Message message={message} /> : null }
                    </div>
                </Form.Group>

                <Form.Group as={Col} md="4">
                </Form.Group>
            </Form.Row>
          </Form>
      </Container>
    );
  }

  export default Login;
