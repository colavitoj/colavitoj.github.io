import React from "react";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import { Box } from '@material-ui/core';


const Profile = () => {

    const { user } = useAuth0();
    const { email, nickname } = user;
    const namespace = "http://localhost:3000/roles"
    const userRole = user[namespace][0]



    return (
        <Box>
            <Box className="row align-items-center profile-header">
                <Box className="col-md-2 mb-3">

                </Box>
                <div className="col-md text-center text-md-left">
                    <h2>Hello, {nickname}. Welcome to your profile page!</h2>
                    <p className="lead text-muted">You are registered with the email: {email}</p>
                    {userRole ? (<p>You have been assigned the role of {userRole}.</p>) : (<p>You have been assigned the role of Standard User.</p>)}
                </div>
            </Box>
            <Box className="row">
            </Box>
        </Box>
    );
};

export default withAuthenticationRequired(Profile);