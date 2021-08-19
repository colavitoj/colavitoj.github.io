import React, { useState } from 'react';
import clsx from 'clsx';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, Grid, ListItem, Avatar, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EventIcon from '@material-ui/icons/Event';
import MapIcon from '@material-ui/icons/Map';
import ItemList from './ItemList'
import WorldMap from './WorldMap';
import Profile from './Profile'
import Calendar from './Calendar';
import AddItem from './AddItem';
import HomePage from './HomePage'
import Item from './Items';
import { useAuth0 } from "@auth0/auth0-react";
import DiceRoller from './DiceRollerModal';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        vh: '100%',
        vw: '100%'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,

    },
    drawerPaper: {
        width: drawerWidth,
        background: "#ebebeb",
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    listColor: {
        "&:hover": {
            color: '#512DA8'
        },

    }
}));

export default function NavBar() {

    const { user, logout } = useAuth0();
    const { picture } = user;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <BrowserRouter>
            <div className={classes.root}>

                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <Grid
                            justifyContent="space-between"
                            container
                            spacing={2}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Grid item>
                                <Typography variant="h6">
                                    Dungeon Master's Toolbox
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={handleMenuClick}>
                                    <Avatar src={picture} />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    getContentAnchorEl={null}
                                    keepMounted
                                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem button component={Link} to='/profile' className={classes.listColor}> Profile </MenuItem>
                                    <MenuItem onClick={() => logout()}>Logout</MenuItem>
                                </Menu>

                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button component={Link} to='/home' className={classes.listColor}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />


                        </ListItem>
                    </List>


                    <Divider />
                    <List >
                        <ListItem button component={Link} to='/items' className={classes.listColor}>
                            <ListItemIcon>
                                <ListAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Item Database" />
                        </ListItem>
                        <ListItem button component={Link} to='/map' className={classes.listColor}>
                            <ListItemIcon>
                                <MapIcon />
                            </ListItemIcon>
                            <ListItemText primary="World Map" />
                        </ListItem>
                        <ListItem button component={Link} to='/calendar' className={classes.listColor}>
                            <ListItemIcon>
                                <EventIcon />
                            </ListItemIcon>
                            <ListItemText primary="Calendar" />
                        </ListItem>


                    </List>
                </Drawer>
                <main

                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <DiceRoller />
                    <div className={classes.drawerHeader} id="top level" />

                    <Switch>
                        <Route exact path={["/", "/home"]} component={HomePage} />
                        <Route exact path={["/", "/items"]} component={ItemList} />
                        <Route exact path={['/map']} component={WorldMap} />
                        <Route exact path={['/calendar']} component={Calendar} />
                        <Route exact path={['/profile']} component={Profile} />
                        <Route
                            path="/items/:id/edit"
                            render={(props) => (
                                <AddItem {...props} />
                            )}
                        />
                        <Route
                            path="/add-item/"
                            render={(props) => (
                                <AddItem {...props} />
                            )}
                        />

                        <Route
                            path="/item/:id"
                            render={(props) => (
                                <Item {...props} />
                            )}
                        />

                        <Route
                            path="/items/:id/comment"
                            render={(props) => (
                                <div>

                                    <Item {...props} />

                                </div>
                            )}
                        />

                    </Switch>

                </main>
            </div>
        </BrowserRouter >
    );
}