import React, {useState} from 'react';
import AuthService from '../Services/AuthService';

import Message from './message';
import Header from './header';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const Register = props => {
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState({
        blood_type: "A+",
        username: "",
        password: ""
    });
    const [message, setMessage] = useState(null);

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

        // check if the email format is correct
        if (user.username.includes("@") && user.username.includes(".")) {
            AuthService.register(user).then(data => {
               const { isAuthenticated, user, message } = data;
               if (isAuthenticated) {
                   // user has been successfully registered and authenticated
                   // we want to redirect the user to dashboard with out saving their authentication value
                   setMessage(message);
                   window.location.href = '/';
               } else {
                   setMessage(message);
               }
            });
        } else {
            setMessage({msgBody: "Not a valid email address!", msgError: true});
        }
    }

    const bloodTypeOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    console.log(user)

    return (
        <Container>
            <Header value="Donate Blood" />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="4">
                    </Form.Group>

                    <Form.Group as={Col} md="4" className="m-1 p-3">
                        <h2 className="text-center">Register</h2> 
                        <hr/> <br />
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="validationCustomBloodType">
                                <Form.Label>Blood Type:</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        as="select"
                                        name="blood_type"
                                        placeholder="Blood Type"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={onChange}
                                        style={{"cursor":"pointer"}}
                                    >
                                    { bloodTypeOptions.map(element => <option key={element}>{element}</option>) }
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your Blood Type.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="validationCustomEmail">
                                <Form.Label>Email:</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        placeholder="Email"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={onChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter an Email.
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

export default Register;