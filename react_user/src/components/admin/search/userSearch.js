import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UserSearch(props) {
    // blood types for options
    const bloodTypeOptions = ["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    return (
        <Form>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Search Type:</Form.Label>
                    <Form.Control 
                        as="select"
                        name="type"
                        required
                        defaultValue= 'Blood Type' 
                        onChange={props.onChangeHandleType}
                        style={{"cursor": "pointer"}}>
                        <option value="blood_type">Blood Type</option>
                        <option value="location">Location</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Options:</Form.Label>
                    { props.bloodSelected ?
                        <Form.Control 
                            as="select"
                            name="value"
                            required
                            defaultValue=""
                            onChange={props.onChangeHandle}
                            style={{"cursor": "pointer"}}>
                            { bloodTypeOptions.map(element => <option key={element}>{element}</option>) }
                        </Form.Control>
                    :
                        <Form.Control 
                            type="text"
                            name="value"
                            required
                            placeholder="Pokhara" 
                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                            onChange={props.onChangeHandle}
                            >
                        </Form.Control>
                    }
                </Form.Group>
            </Row>
            <Button variant="warning" style={{ width: '100%'}} onClick={() => window.location.reload()}>Clear All Filter</Button>
        </Form>
    );
}

export default UserSearch;