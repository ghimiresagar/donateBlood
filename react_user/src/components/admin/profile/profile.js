import React, {useEffect, useState, useContext} from 'react';
import { AuthContext } from '../../../Context/AuthContext';

import Header from '../../header';

import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';

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

    // this will fetch the user's information
    useEffect(() => {
        getQuery()
        .then(body => {
            setUserDetails(body)
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

    console.log(userDetails)
    return (
        <Container>
            <Header value="Blood Donor Finder" />
            <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
                <Card.Header as="h5" className="text-center">Update Details</Card.Header>
                <Card.Body>
                    <div className="text-center">
                        Email:
                        <br></br>
                        Blood Type:
                        <br></br>
                        Location:
                        <br></br>
                        Phone number:
                        <br></br>
                    </div>
                    <br></br>
                    <div className="text-center">
                    <Button variant="primary">
                        Update
                    </Button>    
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Profile;