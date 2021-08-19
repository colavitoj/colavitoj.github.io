import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@material-ui/core/Button'

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <Button variant="outlined" onClick={() => logout()}>
                Logout
            </Button >
        )
    )
}

export default LogoutButton
