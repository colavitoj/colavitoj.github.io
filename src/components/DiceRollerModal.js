import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, IconButton, ButtonGroup, Fab, makeStyles, TextField, FormHelperText } from '@material-ui/core/';
import Draggable from 'react-draggable';
import { ReactComponent as D4 } from '../assets/icons/d4.svg'
import { ReactComponent as D6 } from '../assets/icons/d6.svg'
import { ReactComponent as D8 } from '../assets/icons/d8.svg'
import { ReactComponent as D10 } from '../assets/icons/d10.svg'
import { ReactComponent as D12 } from '../assets/icons/d12.svg'
import { ReactComponent as D20 } from '../assets/icons/d20.svg'


function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}


export default function DiceRoller() {
    const [open, setOpen] = React.useState(false);
    const [roll, setRoll] = useState(0);
    const [mod, setMod] = useState(0);
    const [result, setResult] = useState(0);
    const [die, setDie] = useState(20)

    const handleClickOpen = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const useStyles = makeStyles({
        iconButtonStyle: {
            maxHeight: 80,
            width: 80,
            '&:hover': {
                outline: 'none',
                backgroundColor: 'transparent'
            },
            BorderStyle: 'none',

        },
        buttonGroup: {
            width: '100%',
            display: 'flex',
            verticalAlign: 'middle'
        },
        floatingActionButton: {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        },
        scrollPaper: {
            alignItems: 'baseline',
            // position: 'absolute'
        }



    });


    const DiceRoll = (num, mod) => {

        var tempRoll = Math.floor(Math.random() * (num) + 1);
        var tempResult = 0

        if (mod !== 0) {
            tempResult = tempRoll + parseInt(mod);
        }
        else {
            tempResult = tempRoll
        }
        setDie(num)
        setRoll(tempRoll)
        setResult(tempResult)
        return
    }

    const classes = useStyles()


    return (


        <div style={{ verticalAlign: 'middle' }}>
            <div>
                <div>
                    <Fab color="secondary" aria-label="add" className={classes.floatingActionButton} onClick={handleClickOpen}>
                        <D20 />
                    </Fab>
                </div>

            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                hideBackdrop
                disableEnforceFocus
                disableBackdropClick

            >

                <DialogTitle style={{ cursor: 'move', textAlign: 'center' }} id="draggable-dialog-title">
                    Dice Roller
                </DialogTitle>
                <DialogActions>
                    <ButtonGroup className={classes.buttonGroup} style={{ justifyContent: 'center' }}>

                        <IconButton className={classes.iconButtonStyle} onClick={() => DiceRoll(4, mod)} >
                            <D4 />
                        </IconButton>

                        <IconButton className={classes.iconButtonStyle} onClick={() => DiceRoll(6, mod)} >
                            <D6 />
                        </IconButton>

                        <IconButton className={classes.iconButtonStyle} onClick={() => DiceRoll(8, mod)} >
                            <D8 />
                        </IconButton>

                        <IconButton className={classes.iconButtonStyle} onClick={() => DiceRoll(10, mod)} >
                            <D10 />
                        </IconButton>

                        <IconButton className={classes.iconButtonStyle} onClick={() => DiceRoll(12, mod)}>
                            <D12 />
                        </IconButton>

                        <IconButton className={classes.iconButtonStyle} onClick={() => DiceRoll(20, mod)} >
                            <D20 />
                        </IconButton>
                    </ButtonGroup >


                </DialogActions>

                <DialogContent>
                    <TextField
                        type="number"
                        value={mod}
                        onChange={event => setMod(event.target.value)}
                        id="dice-mod-text"
                        aria-describedby="dice-mod-helper-text"></TextField>

                    <FormHelperText id="dice-mod-helper-text">Set Dice Roll Modifier</FormHelperText>
                </DialogContent>




                <DialogContent>
                    <DialogContentText>
                        The D{die} shows a <strong>{roll}</strong> + a modifier of <strong>{mod}</strong> = <strong>{result}</strong>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} variant="contained" color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        setRoll(0);
                        setMod(0);
                        setResult(0);
                    }}
                        color="secondary"
                        variant="contained">
                        Reset
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}