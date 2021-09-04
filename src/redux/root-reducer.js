import { combineReducers } from "redux"
import contactsReducers from './reducer'

const rootReducer = combineReducers({
    data: contactsReducers
})

export default rootReducer;