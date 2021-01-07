import React, { useState, useEffect } from 'react';

import UserCardView from './userCardView';
import UserSearch from '../search/userSearch';
import Message from '../../message';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';

const DashboardLayout = props => {
    // check to determine is blood is selected or location for search
    const [bloodSelected, setBloodSelected] = useState(false);
    // body of the search
    const [search, setSearch] = useState({
        type: "blood_type",
        value: "A+"
    });
    // set a variable to get the users from the server
    const [detailBody, setDetailBody] = useState([]);
    // array to keep the user cards
    const [userCards, setUserCards] = useState([]);
    // variable to check and perform a call to the database
    const [change, setChange] = useState(0);
    const [message, setMessage] = useState('');

    // this will fetch the users
    useEffect(() => {
        if (change === 0) {
            getQueryUnfiltered()
            .then(body => {
                setDetailBody(body);
            })
            .catch(err => console.log(err));
        } else {
            getQueryFiltered()
            .then(body => {
                setDetailBody(body);
            })
            .catch(err => console.log(err));
        }
    }, [change]);
    // async function to get unfiltered query; gets the top users from the database
    async function getQueryUnfiltered() {
        const data = await fetch("/donation");
        const body = await data.json();
        return body;
    }
    // async function to get filtered query; gets the top users from the database with the filter
    async function getQueryFiltered() {
        const data = await fetch("/donation/filtered", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(search)
        });
        const body = await data.json();
        return body;
    }

    // convert the array of objects (detailBody) into UserCardView
    detailBody.map(element => {
        userCards.push(<UserCardView key={element._id} value={element} />)
    });

    // create a function to pass to the child component so it can pass back search paras
    const onChangeHandle = (e) => {
        e.preventDefault();

        setSearch({ ...search, [e.target.name]: e.target.value });
        // clear the users so the search brings a new set of users
        setDetailBody([]);
        setUserCards([]);
        // set change if e.target.value is not empty
        if (e.target.value !== "")
            setChange(change+1);
    }

    // function to detect if the search type was changed
    const onChangeHandleType = (e) => {
        e.preventDefault();

        setSearch({ ...search, [e.target.name]: e.target.value });
        // clear the users so the search brings a new set of users
        setDetailBody([]);
        setUserCards([]);
        // change what has been selected
        setBloodSelected(!bloodSelected);
        // set change if e.target.value is not empty
        if (e.target.value !== "")
            setChange(change+1);
    }

    return(
        <Container>
            <UserSearch onChangeHandleType={onChangeHandleType} onChangeHandle={onChangeHandle} bloodSelected={bloodSelected} />
            <br></br>
            {message ? <Message message={message} /> : null }
            <br></br>
            <div>
                {userCards}
            </div>
        </Container>
    );
}

export default DashboardLayout;