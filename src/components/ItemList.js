import React, { useState, useEffect } from 'react';
import ItemDataService from "../services/item";
import { Link } from "react-router-dom";
import { Box, Container, Card, CardActions, CardActionArea, CardContent, Grid, Button, Typography, FormControl, TextField, MenuItem, InputLabel, Select } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';
import AddItem from './AddItem'
import AlertSnackbar from './AlertSnackbar'


const ItemList = props => {

    const [items, setItems] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchItemslot, setSearchItemslot] = useState('');
    const [itemslots, setItemslots] = useState([]);
    const [showAddItem, setShowAddItem] = useState(false)
    const [alert, setAlert] = useState(false)

    const { getAccessTokenSilently } = useAuth0();
    var token = getAccessTokenSilently()
    var ItemService = new ItemDataService(token)


    useEffect(() => {
        retrieveItems();
        retrieveItemslots();
    },
        []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const onChangeSearchItemslot = e => {
        const searchItemslot = e.target.value;
        setSearchItemslot(searchItemslot);
    }

    const retrieveItems = () => {
        ItemService.getAll()
            .then(response => {
                setItems(response.data.items);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveItemslots = () => {
        ItemService.getItemslot()
            .then(response => {
                setItemslots([].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveItems();
    };

    const find = (query, by) => {
        ItemService.find(query, by)
            .then(response => {

                setItems(response.data.items);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const findByName = () => {
        find(searchName, "itemname")
    };
    const findByItemslot = () => {
        if (searchItemslot === "All Itemslots") {
            refreshList();
        } else {
            find(searchItemslot, "itemslot")
        }
    };

    const useStyles = makeStyles((theme) => ({
        root: {
            marginRight: 15,
            marginLeft: 15,
            marginBottom: 25,
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between'
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
        searchButton: {
            marginTop: 7,
            marginBottom: 5,
            height: 50
        },
        selectForm: {
            margin: theme.spacing(1),
            minWidth: 222,
            "& .MuiFilledInput-root": {
                background: "#ebebeb"
            }
        },
        searchForm: {
            "& .MuiFilledInput-root": {
                background: "#ebebeb"
            }
        },
        detailBut: {
            "&:hover": {
                color: '#512DA8'
            },
            // display: 'flex',
            // justifyContent: 'flex-start'
        },
        submitButton: {
            marginTop: 7,
            marginBottom: 7,
            height: 50
        },
        addItemContainer: {

            float: "left",
            padding: 10,
            margin: 10
        },
        effectText: {
            whiteSpace: 'pre-line',
        },
        formContainer: {
            maxWidth: '50%'
        },
        cardActionArea: {

            display: 'flex',
            flex: '1 0 auto',
            alignItems: 'flex-end',
            justifyContent: 'center',
            flexDirection: 'column',

        },
        cardGrid: {
            borderTop: 2,
            borderColor: 'primary'
        },
        cardClass: {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column'
        }
    }));

    const classes = useStyles();

    const alertTrue = () => {
        setAlert(true);
    }

    const alertFalse = () => {
        setAlert(false);
    }

    const hideAddItem = () => {
        setShowAddItem(false)
    }



    return (

        <Container>
            {alert ?
                (<AlertSnackbar
                    type="success"
                    alert={alert}
                    text="submitted the item"
                    alertFalse={alertFalse} />) : null}
            {/* <Card className={classes.formContainer}> */}
            <Box className="row pb-1">

                <form>
                    <TextField
                        InputProps={{
                            className: classes.input
                        }}
                        id="outlined-search"
                        label="Search Item Database"
                        type="search"
                        variant="filled"
                        value={searchName}
                        onChange={onChangeSearchName}
                        className={classes.searchForm}

                    />

                    <Button
                        className={classes.searchButton}
                        type="button"
                        onClick={findByName}
                        variant="contained"
                        color="secondary"

                    >
                        Search
                    </Button>


                </form>


                <Box>
                    <FormControl variant="filled" className={classes.selectForm}>
                        <InputLabel id="demo-simple-select-outlined-label">Itemslot</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={onChangeSearchItemslot}
                            label="Itemslot"
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left"
                                },
                                transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left"
                                },
                                getContentAnchorEl: null
                            }}

                        >
                            <MenuItem defaultValue="">None</MenuItem>
                            {itemslots.map((itemslot, index) => (
                                <MenuItem key={index} value={itemslot}> {itemslot.substr(0, 20)}</MenuItem>
                            ))
                            }
                        </Select>
                    </FormControl>





                    <Button
                        className={classes.searchButton}
                        type="button"
                        onClick={findByItemslot}
                        variant="contained"
                        color="secondary"
                    >
                        Search
                    </Button>
                    <Box>
                        <Button
                            className={classes.submitButton}
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={() => setShowAddItem(!showAddItem)}>Submit a New Item
                        </Button>


                    </Box>

                    {showAddItem ? (<Card className={classes.addItemContainer} borderTop={2} borderColor={'primary'}> <AddItem {...props} alertTrue={alertTrue} hideAddItem={hideAddItem} getAllItems={retrieveItems} /></Card>) : null}
                </Box>

            </Box>

            <Box borderTop={2} borderColor={'primary'}>
                <Grid container className={classes.cardGrid}>
                    {items.map((item, index) => {
                        return (
                            <Grid item container xs={4} className={classes.cardClass} >
                                <Card key={index} className={classes.root} variant="outlined"  >
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>

                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {item.itemname}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">

                                            {item.itemslot}
                                        </Typography>
                                        <Typography variant="body2" component="p" className={classes.effectText}>

                                            <strong>Description:</strong><br /> {item.description}<br /> <br />
                                            <strong>Effect:</strong><br />

                                        </Typography>
                                        <Typography variant="body2" component="p" className={classes.effectText}>
                                            {item.effect.split("\n").filter(entry => entry.length > 1).map((i, key) => {

                                                return <li key={key}>{i}</li>;
                                            })}
                                        </Typography>
                                    </CardContent>
                                    <CardActionArea >
                                        <CardActions className={classes.cardActionArea}>
                                            <Button size="small" className={classes.detailBut} component={Link} variant="contained" color="secondary" to={"/item/" + item._id}>
                                                Show Details
                                            </Button>
                                        </CardActions>
                                    </CardActionArea>
                                </Card>
                            </Grid>









                        );
                    })}

                </Grid>
            </Box>

        </Container >
    );
}


export default ItemList;
