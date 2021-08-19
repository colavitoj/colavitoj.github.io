import React from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const AlertSnackbar = props => {

    return (
        < Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={true}
        >
            < Alert variant="filled" severity={props.type} onClose={() => { props.alertFalse() }}>
                You {props.text} successfully.
            </Alert >
        </Snackbar >


    )
}

export default AlertSnackbar