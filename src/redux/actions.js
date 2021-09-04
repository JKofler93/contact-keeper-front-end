import axios from "axios";
import * as types from "./actionTypes";

// Provide the action here
// What is the type?
// what is the payload?
const getContacts = (contacts) => ({
    type: types.GET_CONTACTS,
    payload: contacts,
});

const getContact = (contact) => ({
    type: types.GET_CONTACT,
    payload: contact,
});

const contactDeleted = () => ({
    type: types.DELETE_CONTACT
});

const contactAdded = () => ({
    type: types.ADD_CONTACT
});

const contactEdited = () => ({
    type: types.EDIT_CONTACT
});

export const loadContacts = () => {
    return function (dispatch) {
        axios
            .get(`http://localhost:3000/contacts`)
            .then(res => {
                console.log("res:", res.data)
                dispatch(getContacts(res.data));
            })
            .catch(error => console.log(error))
    };
};

export const deleteContact = (id) => {
    return function (dispatch) {
        axios
            .delete(`http://localhost:3000/contacts/${id}`)
            .then(res => {
                console.log("res:", res.data)
                // Deletes a contact
                dispatch(contactDeleted());
                //Updates state to contacts that were not deleted
                dispatch(loadContacts());
            })
            .catch(error => console.log(error))
    };
};

export const addContact = (contact) => {
    return function (dispatch) {
        axios
            .post(`http://localhost:3000/contacts`, contact)
            .then(res => {
                console.log("res:", res.data)
                // Deletes a contact
                dispatch(contactAdded());
                dispatch(loadContacts());
            })
            .catch(error => console.log(error))
    };
};


export const getSingleContact = (id) => {
    return function (dispatch) {
        axios
            .get(`http://localhost:3000/contacts/${id}`)
            .then(res => {
                console.log("res:", res.data)
                dispatch(getContact(res.data));
            })
            .catch(error => console.log(error))
    };
};

export const editContact = (contact, id) => {
    return function (dispatch) {
        axios
            .patch(`http://localhost:3000/contacts/${id}`, contact)
            .then(res => {
                console.log("res:", res.data)

                dispatch(contactEdited());
                dispatch(loadContacts());
            })
            .catch(error => console.log(error))
    };
};