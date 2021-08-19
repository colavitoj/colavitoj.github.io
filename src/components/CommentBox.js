import React from 'react'
import { Grid, Avatar, Paper, Button, Box } from '@material-ui/core/'
import { useAuth0 } from '@auth0/auth0-react';

const CommentBox = (props) => {
    const date = new Date(props.comment.date)
    const { user } = useAuth0()




    return (


        <Paper style={{ padding: "40px 20px", display: 'flex', marginTop: '7px' }}>
            <Grid container wrap="nowrap" spacing={2} justifyContent="flex-start">
                <Grid item>
                    <Avatar alt="Remy Sharp" src={props.comment.user_img} />
                </Grid>
                <Grid item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>{props.comment.name}</h4>
                    <p style={{ textAlign: "left" }}>
                        {props.comment.text}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        {date.toUTCString()}
                    </p>
                </Grid>
                <Box> {user.sub === props.comment.user_id ? (<Button variant="contained" color="secondary" onClick={() => props.deleteComment(props.comment._id)}> Delete</Button>) : null} </Box>
            </Grid>


        </Paper>




    );
}

export default CommentBox
