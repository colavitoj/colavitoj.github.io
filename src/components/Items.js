import React, { useState, useEffect } from 'react';
import ItemDataService from '../services/item';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Container, Button, makeStyles, Typography, Card } from '@material-ui/core'
import CommentBox from './CommentBox'
import AddComment from './AddComment'
import AddItem from './AddItem'
import AlertSnackbar from './AlertSnackbar';




const Item = props => {
    const [isLoading, setLoading] = useState(true);
    const [item, setItem] = useState(initialItemState);
    const [deleted, setDeleted] = useState(false);
    const [alert, setAlert] = useState(false);
    const [editAlert, setEditAlert] = useState(false);
    const [delAlert, setDelAlert] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [token, setToken] = useState(null);
    const [showAddComment, setShowAddComment] = useState(false);
    const [showEditItem, setShowEditItem] = useState(false);
    const { getAccessTokenSilently, user } = useAuth0();
    const ItemService = new ItemDataService(token)


    const initialItemState = {
        id: '',
        itemname: '',
        description: '',
        effect: '',
        itemslot: '',
        comments: [],
        user_id: '',
        name: '',
        date: ''
    };
    const alertTrue = () => {
        setAlert(true);
    }

    const alertFalse = () => {
        setAlert(false);
    }
    const delAlertFalse = () => {
        setDelAlert(false);
    }


    const getItem = id => {
        ItemService.get(id)
            .then(response => {
                setItem(response.data);
                setLoading(false)
            })
            .catch(e => {
                console.log(e);
            });
    };
    const refreshList = id => {
        getItem(id);
    };

    useEffect(() => {
        setUser();
        getItem(props.match.params.id);
    }, [props.match.params.id]);


    getAccessTokenSilently()
        .then(res => {
            setToken(res)
        })
        .catch(e => {
            console.debug('Error fetching access token', e.message)
        })




    const deleteItem = async (itemId, userId) => {
        var userId = user.sub
        ItemService.deleteItem(itemId, userId)

            .then(response => {
                setDeleted(true)
            })
            .catch(e => {
                setAlert(true)
                console.log(e);

            });
    }

    const deleteComment = async (id, userId) => {
        var userId = user.sub
        ItemService.deleteComment(id, userId)


            .then(response => {
                getItem(props.match.params.id)
                setDelAlert(true)

            })
            .catch(e => {
                setAlert(true)
                console.log(e);

            });

    }

    const setUser = () => {
        const namespace = "http://localhost:3000/roles"
        const userRole = user[namespace][0]
        return setUserRole(userRole);

    }

    const theme = {
        spacing: 5,
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: '65vw',
            marginRight: 15,
            marginLeft: 15,
            marginBottom: 25,
            marginTop: 10,


        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        input: {

            marginBottom: 5,
            margin: theme.spacing(1)
        },
        deleteBtn: {
            marginRight: 10,
            marginTop: 7,
            marginBottom: 7,
            height: 50
        },
        addItemContainer: {

            float: "left",
        },
        effectText: {
            whiteSpace: 'pre-line',
            paddingLeft: 5
        }


    }));


    const classes = useStyles(theme)



    if (isLoading) return <Box>Loading...</Box>

    if (deleted) return (
        <Box>
            <h4>You deleted the item successfully!</h4>
            <Button component={Link} to={"/items/"} variant="contained" color="secondary">Back to Item Repository</Button>


        </Box>
    )


    return (

        <Container>
            {alert ? (
                <AlertSnackbar type="success" alert={alert} text="have submitted the comment" alertFalse={alertFalse} />) : null}
            {delAlert ? (
                <AlertSnackbar type="success" alert={delAlert} text="have deleted the comment" alertFalse={delAlertFalse} />) : null}
            {editAlert ? (
                <AlertSnackbar type="success" alert={delAlert} text="have updated the item" alertFalse={delAlertFalse} />) : null}
            <Box className="row pb-1">
                {item ? (
                    <Box>
                        <Box>

                            <Box>
                                <Card className={classes.root} variant="outlined">

                                    <h2>{item.itemname}</h2>
                                    <br />
                                    <Typography variant="body2" component="p" className={classes.effectText}>
                                        <strong>Description:</strong><br /> {item.description}<br /> <br />
                                        <strong>Effect:</strong><br />

                                    </Typography>
                                    <Typography variant="body2" component="p" className={classes.effectText}>
                                        {item.effect.split("\n").filter(entry => entry.length > 1).map((i, key) => {
                                            console.log(i)
                                            return <li key={key}>{i}</li>;
                                        })}
                                    </Typography>

                                    <br /> <br />
                                    <p2 style={{ paddingLeft: 5 }}>Submitted by {item.name} on {new Date(item.date).toUTCString()}</p2>



                                    <Box>
                                        {userRole === "Admin" ? (<Button onClick={() => deleteItem(item._id)} variant="contained" color="secondary" className={classes.deleteBtn}> Delete</Button>) : null}

                                        {userRole === "Editor" || userRole === "Admin" ? (<Button className={classes.deleteBtn} onClick={() => setShowEditItem(!showEditItem)} variant="contained" color="secondary">Edit Item</Button>) : null}



                                        <Button onClick={() => setShowAddComment(!showAddComment)} variant="contained" color="secondary" className={classes.deleteBtn}>Comment</Button>
                                    </Box>
                                </Card>

                            </Box>
                            {showAddComment ? (<Box className={classes.addItemContainer} borderTop={2} borderColor={'primary'}><AddComment {...props} alertTrue={alertTrue} buttonStyle={classes.deleteBtn} refreshComments={refreshList} hideCommentBox={() => setShowAddComment(false)} /></Box>) : null}
                            {showEditItem ? (<Box className={classes.addItemContainer} borderTop={2} borderColor={'primary'}><AddItem {...props} editing={true} currentItem={item} refreshItem={refreshList} hideEditItem={() => setShowEditItem(!showEditItem)} editAlertTrue={() => setEditAlert(true)} /></Box>) : null}
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        <br />
                        <p>No item selected.</p>
                    </Box>
                )}
                <Box borderTop={2} borderColor={'primary'}>
                    {item.comments.length > 0 ? (
                        item.comments.map((comment, index) => {

                            return (<CommentBox key={index} comment={comment} deleteComment={deleteComment} />)
                        })) : null}

                </Box>
            </Box>


        </Container >
    );

};


export default Item;
