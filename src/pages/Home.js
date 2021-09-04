import React, { useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from 'react-router';

// Dispatch an action 
import { useSelector, useDispatch } from "react-redux"
// import the function you want to use 
import { loadContacts, deleteContact } from '../redux/actions';


const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  
  const useStyles = makeStyles({
    table: {
      marginTop: 100,
      minWidth: 900,
    },
  });
  

function Home() {
    const buttonStyles = useButtonStyles()
    const classes = useStyles();
    let history = useHistory()
    // useDispatch: Loads data to reducers 
    let dispatch = useDispatch()

    const { contacts } = useSelector(state => state.data)

    console.log(``, )
    useEffect(() => {
        dispatch(loadContacts())
    }, [])

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this contact?")) {
            dispatch(deleteContact(id))
        }
    }
    
    return (
        <div>
            <div className={buttonStyles.root}>
                <Button variant="contained" color="primary" onClick={() => history.push("/addContact")}>Add Contact</Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Phone Number</StyledTableCell>
                        <StyledTableCell align="center">Address</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {contacts && contacts.map((contact) => (
                        <StyledTableRow key={contact.id}>
                        <StyledTableCell component="th" scope="row">
                            {contact.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">{contact.email}</StyledTableCell>
                        <StyledTableCell align="center">{contact.number}</StyledTableCell>
                        <StyledTableCell align="center">{contact.address}</StyledTableCell>
                        <StyledTableCell align="center">
                            <div className={buttonStyles.root}>
                                <ButtonGroup variant="contained" aria-label="contained primary button group">
                                    <Button style={{marginRight: "5px"}} color="secondary" onClick={() => handleDelete(contact.id)}>Delete</Button>
                                    <Button color="primary" onClick={() => history.push(`editContact/${contact.id}`)}>Edit</Button>
                                </ButtonGroup>
                                </div>
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Home
