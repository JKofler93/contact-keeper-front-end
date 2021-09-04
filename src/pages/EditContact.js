import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router';

// Dispatch an action 
import { useSelector, useDispatch } from "react-redux"
import { editContact, getSingleContact } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
      '& > *': {
        margin: theme.spacing(1),
        width: '45ch',
      },
    },
  }));

function EditContact() {
    const [state, setState] = useState({
        name: "", 
        email: "",
        number: "",
        address: ""
    })
    const [error, setError] = useState("")

    let { id } = useParams();
    let history = useHistory();
    const classes = useStyles();

    let dispatch = useDispatch();
    const { contact } = useSelector((state) => state.data)

    useEffect(() => {
        dispatch(getSingleContact(id))
    }, [])

    useEffect(() => {
        if(contact) {
            setState({ ...contact })
        }
    }, [contact])

    const handleChange = (e) => {
        let { name, value } = e.target
        setState({...state, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name || !email || !address || !number) {
            setError("Please include input in all fields!")
        } else {
            dispatch(editContact(state, id))
            history.push("/")
            setError("");
        }
    }

    const { name, email, number, address } = state;
    return (
        <div>
                <Button style={{width: "100px", marginTop: "20px"}} variant="contained" color="secondary" onClick={() => history.push("/")}>Go Back</Button>
                <h2>Edit Contact</h2>
                {error && <h3 style={{color: "red"}}>{error}</h3>}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="Name" value={name || ""} name="name" type="text" onChange={handleChange} />
                <br/>
                <TextField id="standard-basic" label="Email" value={email || ""} name="email" type="text" onChange={handleChange} />
                <br/>
                <TextField id="standard-basic" label="Number" value={number || ""} name="number" type="tel" onChange={handleChange} />
                <br/>
                <TextField id="standard-basic" label="Address" value={address || ""} name="address" type="text" onChange={handleChange} />
                <br/>
                <Button style={{width: "100px"}} variant="contained" color="primary" type="submit">Update</Button>
            </form>
        </div>
    )
}

export default EditContact;