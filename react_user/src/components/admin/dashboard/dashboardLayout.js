import React, { useState, useEffect } from 'react';

import UserCardView from './userCardView';

import 'bootstrap/dist/css/bootstrap.css';

const DashboardLayout = props => {
    // set a variable to get the users from the server
    const [detailBody, setDetailBody] = useState([]);
    // array to keep the user cards
    const [userCards] = useState([]);

    // this will fetch the users
    useEffect(() => {
        getQuery()
        .then(body => {
            setDetailBody(body);
        })
        .catch(err => console.log(err));
    }, []);
    async function getQuery() {
        const data = await fetch("/donation");
        const body = await data.json();
        return body;
    }

    // convert the array of objects (detailBody) into UserCardView
    detailBody.map(element => {
        userCards.push(<UserCardView key={element._id} value={element} />)
    });

    return(
        <>
            {userCards}
        </>
    );
}

export default DashboardLayout;