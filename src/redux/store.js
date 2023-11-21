import { configureStore, combineReducers } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import UserReducer from './userSlice'
import ContactReducer from './ContactsSlice'
import ConversationReducer from './ConversationSlice'
import BlogReducer from './BlogSlice'
import SessionReducer from './SessionSlice'
import CalendarReducer from './CalendarSlice'
import NotificationReducer from './NotificationSettingSlice'
const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
}
const rootReducer = combineReducers({
    user: UserReducer,
    contact: ContactReducer,
    conversation: ConversationReducer,
    blog: BlogReducer,
    session: SessionReducer,
    calendar: CalendarReducer,
    notificationTab: NotificationReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)
