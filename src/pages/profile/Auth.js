import {Pressable, View, StyleSheet, Text, TextInput, Image} from "react-native";
import {useFonts} from "expo-font";
import React, {useCallback, useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {useFetching} from "../../hooks/useFetching";
import AuthService from "../../API/Auth";
import {Login} from "./Login";
import * as SecureStore from 'expo-secure-store';

export const Auth = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })

    const [auth, setAuth] = useState(true);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [responseToken, setResponseToken] = useState(undefined);
    const [responseStatus, setResponseStatus] = useState(undefined)
    const [errorAuth, setErrorAuth] = useState(false)
    const [fetchAuth, isLoading, error] = useFetching(async () => {
        const response = await AuthService.auth(login, password);
        await setResponseToken(response.headers.authorization);
        await setResponseStatus(response.status)
    })

    const logIn = async () => {
        if (responseToken !== undefined) {
            navigation.navigate('main');
            setErrorAuth(false)
            setResponseStatus(undefined)
            await SecureStore.setItemAsync(keys[0], login);
            await SecureStore.setItemAsync(keys[1], password);
        }
    }
    const clickLogIn = ()=>{
        if (responseStatus!==200){
            setErrorAuth(true)
        }
        fetchAuth()
    }
    const clickRegistr = ()=>{

    }
    useEffect(() => {
        programOn()
    }, [])
    useEffect(() => {
        fetchAuth()
    }, [])
    useEffect(() => {
        logIn()
    }, [responseToken])

    const keys = ['login', 'password', 'token']
    const programOn = async () => {
        const resultLogin = await SecureStore.getItemAsync(keys[0])
        // console.log('resultLogin: ', resultLogin)
        const resultPass = await SecureStore.getItemAsync(keys[1])
        // console.log('resultPass: ', resultPass)
        if (resultLogin && resultPass) {
            // console.log(true)
            await setLogin(resultLogin);
            await setPassword(resultPass);
            fetchAuth();

        }
    }

    //FONTS
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    if (!fontsLoaded) {
        return;
    }

    return (
        <View onLayout={onLayoutRootView} style={styles.auth}>
            <View style={styles.tabs}>
                <Pressable style={auth ? styles.tabSelect : styles.tab} onPress={() => setAuth(true)}>
                    <Text style={auth ? styles.tabSelectText : styles.tabText}>Войти</Text>
                </Pressable>
                <Pressable style={auth ? styles.tab : styles.tabSelect} onPress={() => setAuth(false)}>
                    <Text style={auth ? styles.tabText : styles.tabSelectText}>
                        Зарегистрироваться
                    </Text>
                </Pressable>
            </View>

                {errorAuth?
                    <Text style={styles.errorMessage}>Неверный логин или пароль</Text>
                    : <Text></Text>
                }

            <Login fetchAuth={clickLogIn}
                   login={login}
                   password={password}
                   setLogin={setLogin}
                   setPassword={setPassword}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    auth: {
        paddingHorizontal: 30,
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        backgroundColor: '#F9F9F9'
    },
    tabs: {
        backgroundColor: '#341460',
        flexDirection: 'row',
        borderRadius: 20,
        paddingHorizontal: 2,
        paddingVertical: 2,
        alignItems: 'center',
        marginBottom: 20
    },
    tab: {
        width: '50%',
        alignItems: 'center',
        paddingVertical: 10,
    },
    tabText: {
        fontFamily: 'Montserrat-Medium',
        color: '#ffffff',
        fontSize: 12
    },
    tabSelect: {
        width: '50%',
        borderRadius: 20,
        backgroundColor: '#fff',
        paddingVertical: 10,
        alignItems: 'center'
    },
    tabSelectText: {
        color: '#341460',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12
    },
    errorMessage: {
        marginTop: 5,
        marginBottom: 5,
        color: '#ff0000'
    }
})