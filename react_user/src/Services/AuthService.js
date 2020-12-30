export default {
    register: user => {
        return fetch('/registration', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            // send the response to the front end and display the message
            return res.json().then(data => data);
        })
    },
    login: user => {
        return fetch('/', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 401 )
                return res.json().then(data => data);
            else {
                return {
                    isAuthenticated: false, user: {username: ""}, message: { msgBody: "Error Loggin In!", msgError: true }
                }
            }
        });
    },
    logout: () => {
        return fetch('/logout')
            .then(res => res.json())
            .then(data => data);
    },
    isAuthenticated: () => {
        return fetch('/authenticated')
            .then(res => {
                if ( res.status !== 401 ){
                    return res.json().then(data => data);
                }
                else {
                    return {
                        isAuthenticated: false, user: {username: ""}
                    }
                }
            });
    }
}