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
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const Register = props => {
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState({
        blood_type: "A+",
        username: "",
        password: "",
        location: "",
        phone_number: ""
    });
    const [message, setMessage] = useState(null);
    // array to keep blood types
    const bloodTypeOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    // if user types something, store them into corresponding values
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

        // check if everything has been filled in
        if (form.checkValidity() === true) {
            // check if the email format is correct
            if (user.username.includes("@") && user.username.includes(".")) {
                AuthService.register(user).then(data => {
                   const { isAuthenticated, user, message } = data;
                   // isAuthenticated is only true is user is registered
                   if (isAuthenticated) {
                       // user has been successfully registered and authenticated, send a message to them
                       setMessage(message);
                       // we want to redirect the user to dashboard with out saving their authentication value
                       setTimeout(() => {
                            window.location.href = '/';
                       }, 750);
                   } else {
                       // user was not able to register, display the error message
                       setMessage(message);
                   }
                });
            } else {
                setMessage({msgBody: "Not a valid email address!", msgError: true});
            }
        }
    }

    // popover function
    const popoverLocationInfo = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Why do I have to type in my location?</Popover.Title>
          <Popover.Content>
                We <strong>don't</strong> want to expose our user's location to anyone in the internet. For this reason, please <strong>use the location of the nearest hospital</strong>.
          </Popover.Content>
        </Popover>
    );

    return (
        <Container>
            <Header value="Blood Donor Finder" />
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
                            <Form.Group as={Col} md="12" controlId="validationCustomLocation">
                            <Form.Label>Location:</Form.Label>
                                <InputGroup>
                                    <OverlayTrigger
                                        delay={{ show: 250, hide: 300 }} 
                                        placement="right" 
                                        overlay={popoverLocationInfo}>
                                        <Form.Control
                                            type="text"
                                            name="location"
                                            placeholder="Location"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            onChange={onChange}
                                        >
                                        </Form.Control>
                                    </OverlayTrigger> 
                                    <Form.Control.Feedback type="invalid">
                                        Please enter the location of your nearest hospital.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="validationCustomPhoneNumber">
                            <Form.Label>Phone Number:</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="number"
                                        name="phone_number"
                                        placeholder="Phone Number"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={onChange}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your phone number so people can contact you.
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
                                        Please enter an email address.
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