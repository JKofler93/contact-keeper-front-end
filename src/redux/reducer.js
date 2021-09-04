import * as types from "./actionTypes";

const initialState = {
    contacts: [], 
    contact: {}, 
    loading: true
}

const contactsReducers = (state = initialState, action) => {

    switch (action.type) {

        case types.GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false,
            };

        case types.DELETE_CONTACT:
        case types.ADD_CONTACT:
            return {
                ...state,
                loading: false,
            };

        case types.GET_CONTACT:
            return {
                ...state,
                contact: action.payload,
                loading: false,
            };
        
        
        
        default: 
            return state;
    };


}; 

export default contactsReducers;