import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { getuser, signin, signinWithGoogle, usersignup } from '../../api/user.api'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice'
import { auth, provider } from '../../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
WebBrowser.maybeCompleteAuthSession()

const { width } = Dimensions.get('window')
export default function Login() {
    const { formatMessage } = useIntl()
    const [focusedname, setFocusedname] = useState(false)
    const [focusedpassword, setFocusedpassword] = useState(false)
    const [focusednameSup, setFocusednameSup] = useState(false)
    const [focusedpasswordSup, setFocusedpasswordSup] = useState(false)
    const [focusedemail, setFocusedemail] = useState(false)
    const [signup, setSignup] = useState(false)
    const [sigInInfo, setSignInInfo] = useState({})
    const [sigUpInfo, setSignUpInfo] = useState({})
    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const registerUser = async () => {
        dispatch(loginStart())
        await usersignup(sigUpInfo)
            .then((res) => {
                console.log('token', res.token);
                AsyncStorage.setItem('token', res.token)
                dispatch(loginSuccess(res.user))
                navigate('Home')
                // message.success('Register Successfully! Have a nice trip!!!')
            })
            .catch(() => {
                dispatch(loginFailure())
                // message.error('Registration Failure! Try again please')
            })
    }
    const { currentUser } = useSelector(state => state.user)
    useEffect(() => {
        currentUser && navigate('Home')
    }, [])
    const UserSignIn = async () => {
        await signin(sigInInfo)
            .then((res) => {
                AsyncStorage.setItem('token', res.token)
                dispatch(loginSuccess(res.user))
                navigate('Home')
            })
            .catch(() => {
                dispatch(loginFailure())
            })
    }
    const SignInWithGoogle = async () => {
        // dispatch(loginStart())
        // signInWithPopup(auth, provider)
        //     .then(async (res) => {
        //         console.log('daozhele');
        //         await signinWithGoogle({ name: res.user.displayName, email: res.user.email, avator: res.user.photoURL })
        //             .then((res) => {
        //                 AsyncStorage.setItem('token', res.token)
        //                 dispatch(loginSuccess(res.user))
        //                 navigate('Home')
        //                 // message.success('Login Successfully! Welcome Back!!!')
        //             })
        //     })
        //     .catch(() => {
        //         dispatch(loginFailure())
        //         // message.error('Login with Google failure! Try again please')
        //     })
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign -in the user with the credential
        auth().signInWithCredential(googleCredential).then(user => {
            console.log(user);
        })

    }
    return (
        <SafeAreaView style={style.container}>
            {!signup ? <>
                <Text style={style.logo}>Medal - FitnessApp</Text>
                <View>
                    <Text style={style.welcomeText}>{formatMessage({ id: 'app.login.welcomeback' })}</Text>
                    <View style={style.haventRegisteredContainer}>
                        <Text style={style.commentText}>{formatMessage({ id: 'app.login.notRegisteredYet' })}</Text>
                        <TouchableOpacity>
                            <Text style={style.toggle} onPress={() => setSignup(true)}>&nbsp;{formatMessage({ id: 'app.login.signup' })}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Input */}
                <KeyboardAvoidingView>
                    <TextInput
                        style={focusedname ? [style.TextInput, style.TextInputFocused] : style.TextInput}
                        placeholder={formatMessage({ id: 'app.login.name' })}
                        onFocus={() => setFocusedname(true)}
                        onBlur={() => setFocusedname(false)}
                        onChangeText={(name) => setSignInInfo({ ...sigInInfo, name })}
                        required
                    />
                    <TextInput
                        style={focusedpassword ? [style.TextInput, style.TextInputFocused] : style.TextInput}
                        placeholder={formatMessage({ id: 'app.login.password' })}
                        secureTextEntry={true}
                        onFocus={() => setFocusedpassword(true)}
                        onBlur={() => setFocusedpassword(false)}
                        onChangeText={(password) => setSignInInfo({ ...sigInInfo, password })}
                        required
                    />
                </KeyboardAvoidingView>
                {/* sign btn */}
                <View>
                    <TouchableOpacity style={style.btn} onPress={UserSignIn}>
                        <Text style={style.btnText}>
                            {formatMessage({ id: 'app.login.signin' })}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.btn} onPress={SignInWithGoogle}>
                        <Text style={style.btnText}>
                            {formatMessage({ id: 'app.login.signinwithgoogle' })}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={style.commentText}>
                    {formatMessage({ id: 'app.login.forgetPassword' })}
                    <Text >Get help</Text> signing in
                </Text>
            </> : <>
                <Text style={style.logo}>FitnessApp</Text>
                <View>
                    <Text style={style.welcomeText}>{formatMessage({ id: 'app.login.getStarted' })}</Text>
                    <View style={style.haventRegisteredContainer}>
                        <Text style={style.commentText}>{formatMessage({ id: 'app.login.alreadyhaveacc' })}</Text>
                        <TouchableOpacity>
                            <Text style={style.toggle} onPress={() => setSignup(false)}>&nbsp;{formatMessage({ id: 'app.login.signin' })}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Input */}
                <KeyboardAvoidingView>
                    <TextInput
                        style={focusednameSup ? [style.TextInput, style.TextInputFocused] : style.TextInput}
                        placeholder={formatMessage({ id: 'app.login.name' })}
                        onFocus={() => setFocusednameSup(true)}
                        onBlur={() => setFocusednameSup(false)}
                        onChangeText={(name) => setSignUpInfo({ ...sigUpInfo, name })}
                        required
                    />
                    <TextInput
                        style={focusedemail ? [style.TextInput, style.TextInputFocused] : style.TextInput}
                        placeholder={formatMessage({ id: 'app.login.email' })}
                        onFocus={() => setFocusedemail(true)}
                        onBlur={() => setFocusedemail(false)}
                        onChangeText={(password) => setSignUpInfo({ ...sigUpInfo, password })}
                        required
                    />
                    <TextInput
                        style={focusedpasswordSup ? [style.TextInput, style.TextInputFocused] : style.TextInput}
                        placeholder={formatMessage({ id: 'app.login.password' })}
                        secureTextEntry={true}
                        onFocus={() => setFocusedpassword(true)}
                        onBlur={() => setFocusedpassword(false)}
                        onChangeText={(password) => setSignUpInfo({ ...sigUpInfo, password })}
                        required
                    />
                </KeyboardAvoidingView>
                {/* sign btn */}
                <View>
                    <TouchableOpacity style={style.btn} onPress={registerUser}>
                        <Text style={style.btnText}>
                            {formatMessage({ id: 'app.login.signup' })}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={style.commentText}>
                    By signing up, I agree to the <Text>Terms of Services</Text> and <Text>Privacy policy</Text>
                </Text>
            </>}
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-around'
    },
    logo: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        marginBottom: 20
    },
    welcomeText: {
        fontSize: width * 0.08,
        marginBottom: 10
    },
    haventRegisteredContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    commentText: {
        color: '#bbb'
    },
    toggle: {
        fontWeight: 'bold'
    },
    TextInput: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#bbb',
        marginBottom: 14
    },
    TextInputFocused: {
        borderBottomColor: '#151111',
    },
    btn: {
        backgroundColor: 'black',
        height: 60,
        borderRadius: 20,
        width: '100%',
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 16
    },

}
)