import { configureStore, combineReducers } from '@reduxjs/toolkit'
import UserReducer from './userSlice'
import ContactReducer from './ContactsSlice'
import ConversationReducer from './ConversationSlice'
import BlogReducer from './BlogSlice'
const rootReducer = combineReducers({
    user: UserReducer,
    contact: ContactReducer,
    conversation: ConversationReducer,
    blog: BlogReducer
})
export const store = configureStore({
    reducer: rootReducer,
})
