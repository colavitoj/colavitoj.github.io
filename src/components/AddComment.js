import React, { useState, useEffect } from 'react';
import ItemDataService from '../services/item';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, TextField, Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router'






const AddComment = props => {
    const { getAccessTokenSilently, user } = useAuth0();
    const history = useHistory()
    var ItemService = null
    useEffect(async () => {
        var token = await getAccessTokenSilently()
        ItemService = new ItemDataService(token)
    })



    let initialCommentState = "";
    let editing = false;

    if (props.location.state && props.location.state.currentItem) {
        editing = true;
        initialCommentState = props.location.state.currentItem.text
    }


    const [comment, setComment] = useState(initialCommentState);


    const useStyles = makeStyles((theme) => ({

        formBox: {
            marginTop: 15,
            marginBottom: 15,
            height: 50
        },
        form: {
            minWidth: 500
        }

    }));
    const classes = useStyles()
    const handleCommentChange = event => {
        setComment(event.target.value);
    }



    const saveComment = async () => {


        var data = {
            text: comment,
            name: user.name,
            user_id: user.sub,
            user_img: user.picture,
            item_id: props.match.params.id
        };
        if (editing) {
            data.item_id = props.location.state.currentItem._id
            ItemService.updateComment(data)
                .then(response => {
                    props.hideCommentBox()
                    props.refreshComments(props.match.params.id)
                    props.alertTrue()

                })
                .catch(e => {
                    console.log(e)
                });
        } else {
            ItemService.createComment(data)
                .then(response => {
                    props.hideCommentBox()
                    props.refreshComments(props.match.params.id)
                    props.alertTrue()

                })
                .catch(e => {
                    console.log(e);
                });
        }
    }


    return (
        <Box>
            <Box>
                <Box className={classes.formBox}>

                    <TextField

                        variant="outlined"
                        id="text"
                        placeholder="Add Comment"
                        className={classes.form}
                        required
                        value={comment}
                        onChange={handleCommentChange}
                        name="text" />



                </Box>

                {comment.length > 10 ? (<Button variant="contained" color="secondary" onClick={saveComment} className={props.buttonStyle}>
                    Submit
                </Button>) : null}
            </Box>

        </Box >
    );
};

export default AddComment;
