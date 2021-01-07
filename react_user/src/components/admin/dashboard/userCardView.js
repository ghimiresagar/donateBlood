import React from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'; 

// This component is the view of user on the dashboard

const UserCardView = props => {
    // define body that keeps the content of the card but we don't need to set the details of anything here
    const body = {
        email: props.value.username,
        location: props.value.location,
        phone_number: props.value.phone_number,
        blood_type: props.value.blood_type
    }

    return (
        <Accordion>
            <Card>
                <Card.Header>
                    <Container>
                        <Row>
                            <Col sm={7}>
                                {body.email.split('@')[0]}
                            </Col>
                            <Col sm={3}>
                                Blood Type: <strong>{body.blood_type}</strong>
                            </Col>
                            <Col sm={2}>
                                <Row className="justify-content-end">
                                    <Accordion.Toggle as={Button} eventKey="0">
                                        {"Expand"}
                                    </Accordion.Toggle>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                <Row>
                    <Col sm={12}>
                        <Row>
                            <Col sm={2}>
                                Email: 
                            </Col>
                            <Col sm={10}>
                                {body.email}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={2}>
                                Phone Number:
                            </Col>
                            <Col sm={10}>
                                {body.phone_number}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={2}>
                                Location:
                            </Col>
                            <Col sm={10}>
                                {body.location}
                            </Col>
                        </Row>
                    </Col>
                </Row>    
                </Card.Body>
                </Accordion.Collapse>
            </Card><br></br>
        </Accordion>
    );
}

export default UserCardView;