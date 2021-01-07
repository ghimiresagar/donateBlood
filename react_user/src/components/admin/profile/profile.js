import React, {useEffect, useState, useContext} from 'react';
import { AuthContext } from '../../../Context/AuthContext';

import Message from '../../message';
import Header from '../../header';

import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

/**
 * This is the layout of the profile.
 */

const Profile = () => {
    // get the authContext which will provide us logged in user's email address
    const authContext = useContext(AuthContext);
    // get the user's email
    const email = {
        email: authContext.user.username
    }
    // get the user's details after fetch
    const [userDetails, setUserDetails] = useState({});
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState(null);
    // array to keep blood types
    const bloodTypeOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    // this will fetch the user's information
    useEffect(() => {
        getQuery()
        .then(body => {
            setUserDetails(body);
        })
        .catch(err => console.log(err));
    }, []);
    // async function to get the user information
    async function getQuery() {
        const data = await fetch("/donation/profile", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(email)
        });
        const body = await data.json();
        return body;
    }
    // async function to update the user information
    async function updateQuery() {
        const data = await fetch("/donation/profile/update", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails)
        });
        const body = await data.json();
        return body;
    }

    // if user types something, store them into corresponding values
    const onChange = e => {
        e.preventDefault();
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
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
            updateQuery()
            .then(body => {
                setTimeout(() => {
                    window.location.reload();
                }, 750);
                setMessage(body.message);
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <Container>
            <Header value="Blood Donor Finder" />
            <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
                <Card.Header as="h5" className="text-center">Update Details</Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="2">
                        </Form.Group>

                        <Form.Group as={Col} md="8" className="m-1 p-3">
                            <Form.Row>
                                <Form.Group as={Col} md="4" className="p-3">
                                    <Form.Label>Email:</Form.Label>
                                </Form.Group>
                                <Form.Group as={Col} md="8" className="p-3">
                                    <Form.Label>{userDetails.username}</Form.Label>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="4" className="p-3">
                                    <Form.Label>Blood Type:</Form.Label>
                                </Form.Group>
                                <Form.Group as={Col} md="8" className="p-2" controlId="validationCustomBloodType">
                                    <InputGroup>
                                        <Form.Control
                                            as="select"
                                            name="blood_type"
                                            placeholder="Blood Type"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            value={userDetails.blood_type}
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
                                <Form.Group as={Col} md="4" className="p-3">
                                <Form.Label>Location:</Form.Label>
                                </Form.Group>
                                <Form.Group as={Col} md="8" className="p-2" controlId="validationCustomLocation">
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            name="location"
                                            placeholder="Location"
                                            aria-describedby="inputGroupPrepend"
                                            defaultValue={userDetails.location}
                                            required
                                            onChange={onChange}
                                        >
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter the location of your nearest hospital.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="4" className="p-3">
                                <Form.Label>Phone Number:</Form.Label>
                                </Form.Group>
                                <Form.Group as={Col} md="8" className="p-2" controlId="validationCustomPhoneNumber">
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            name="phone_number"
                                            placeholder="Phone Number"
                                            aria-describedby="inputGroupPrepend"
                                            defaultValue={userDetails.phone_number}
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
                            <div className="text-center">
                                <Button type="submit">
                                    Submit
                                </Button>
                            </div>
                            <div className="m-1 p-1">
                                {message ? <Message message={message} /> : null }
                            </div>
                        </Form.Group>

                        <Form.Group as={Col} md="2">
                        </Form.Group>
                    </Form.Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Profile;