import React, { useState, useEffect } from 'react'
import { render } from "react-dom";
import { useForm } from "react-cool-form";
import ItemDataService from '../services/item';
import { useAuth0 } from '@auth0/auth0-react';
import { FormControl, FormLabel, TextField, Button, MenuItem, makeStyles } from "@material-ui/core";






const AddItem = props => {

    const { getAccessTokenSilently, user } = useAuth0();
    var ItemService = null
    useEffect(async () => {
        var token = await getAccessTokenSilently()
        ItemService = new ItemDataService(token)
    })

    let editing = props.editing;

    if (editing) {
        var initialItemState = props.currentItem
    } else {
        var initialItemState = {
            itemname: '',
            description: '',
            itemslot: '',
            effect: '',
        }
    }

    const [itemname, setItemname] = useState(initialItemState.itemname);
    const [description, setDescription] = useState(initialItemState.description);
    const [itemslot, setItemslot] = useState(initialItemState.itemslot);
    const [effect, setEffect] = useState(initialItemState.effect);

    const handleItemnameChange = event => {
        setItemname(event.target.value);
    }

    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    }

    const handleItemslotChange = event => {
        setItemslot(event.target.value);
    }

    const handleEffectChange = event => {
        setEffect(event.target.value);


    }


    const useStyles = makeStyles((theme) => ({

        submitButton: {
            marginTop: 7,
            marginBottom: 7,
            height: 50
        },
        form: {
            marginBottom: 10,
            display: 'flex'
        }

    }));

    const classes = useStyles();

    const saveItem = async () => {

        var data = {
            itemname: itemname,
            description: description,
            itemslot: itemslot,
            effect: effect,
            item_id: props.match.params.id,
            name: user.name,
            user_id: user.sub,
            user_img: user.picture,
        };
        if (editing) {

            data.item_id = props.currentItem._id
            ItemService.updateItem(data)
                .then(response => {
                    props.refreshItem(props.match.params.id)
                    props.editAlertTrue();
                    props.hideEditItem()


                })
                .catch(e => {
                    console.log(e)
                });
        } else {
            ItemService.createItem(data)
                .then(response => {
                    props.getAllItems();
                    props.alertTrue();
                    props.hideAddItem()


                })
                .catch(e => {
                    console.log(e);
                });
        }
    }



    const { form } = useForm();


    return (


        <form ref={form} noValidate >
            <FormLabel htmlFor="description">{editing ? "Edit" : "Create"} Item</FormLabel>
            <FormControl className={classes.form}>
                <TextField
                    type="text"
                    id="itemname"
                    placeholder="Item Name"
                    required
                    value={itemname}
                    onChange={handleItemnameChange}
                    name="itemname"
                    defaultValue={itemname}

                />

                <TextField
                    type="text"
                    multiline
                    minRows={3}
                    maxRows={20}
                    id="description"
                    placeholder="Item Description (flavor text)"
                    required
                    value={description}
                    onChange={handleDescriptionChange}
                    name="description"
                />

                <TextField
                    type="text"
                    id="effect"
                    multiline
                    minRows={3}
                    maxRows={20}
                    placeholder="Item Attributes (mechanical effects)"
                    required
                    value={effect}
                    onChange={handleEffectChange}
                    name="effect"
                />

                <TextField
                    select
                    id="itemslot"
                    required
                    value={itemslot}
                    onChange={handleItemslotChange}
                    name="itemslot"
                    label="Select an Itemslot"
                    defaultValue=""
                >

                    <MenuItem value="Weapon">Weapon</MenuItem>
                    <MenuItem value="Chest">Chest (worn armor)</MenuItem>
                    <MenuItem value="Back">Back (cloaks, backpacks)</MenuItem>
                    <MenuItem value="Arms">Arms (shields, bracers, gauntlets)</MenuItem>
                    <MenuItem value="Feet">Feet</MenuItem>
                    <MenuItem value="Neck">Neck (amulets)</MenuItem>
                    <MenuItem value="Rings">Rings</MenuItem>
                    <MenuItem value="Waist">Waist (belt, pouches)</MenuItem>
                    <MenuItem value="Other">Misc / Other / No slot</MenuItem>

                </TextField >
            </FormControl>

            {itemname.length > 3 && description.length > 3 && effect.length > 3 && itemslot ? (<Button type="submit" variant="contained" color="secondary" onClick={saveItem} className={classes.submitButton} >
                Submit
            </Button>) : null}
        </form>
    );
}

export default AddItem