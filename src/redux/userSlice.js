import { createSlice } from "@reduxjs/toolkit"
import { getLocales, getCalendars } from 'expo-localization';
const initialState = {
    currentUser: null,
    loading: false,
    error: false,
    currentTheme: 'light',
    userLocale: getLocales()[0].languageCode === 'zh' ? 'zh_CN' : 'en_US',
}

export const UserSlicer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
            state.currentTheme = action.payload.preferedTheme
            state.userLocale = action.payload.preferedLanguage
            switch (action.payload.preferedLanguage) {
                case 'zh_CN':
                    state.userLocale = "zh_CN"
                    break;
                case 'en_US':
                    state.userLocale = "en_US"
                    break;
                default:
                    const start = getLocales()[0].languageCode
                    if (start === 'zh') {
                        state.userLocale = "zh_CN"
                    } else {
                        state.userLocale = "en_US"
                    }
                    break;
            }
        },
        loginFailure: (state) => {
            state.loading = false
            state.error = true
        },
        logout: (state) => {
            state.loading = false
            state.currentUser = null
            state.error = false
            state.currentTutorial = null
        },
        setTheme: (state, action) => {
            state.currentTheme = action.payload
        },
        setLocale: (state, action) => {
            state.userLocale = action.payload
        },
        // setLoading: (state, action) => {
        //     state.loading = action.payload
        // }
    }
})

export const { loginStart, loginFailure, loginSuccess, logout, setTheme, setLocale } = UserSlicer.actions

export default UserSlicer.reducer