import {Image, StyleSheet, TextInput, View} from "react-native";
import {useFonts} from "expo-font";
import {useCallback} from "react";
import * as SplashScreen from "expo-splash-screen";
import React from "@types/react";


export const Registr = () => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular':require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium':require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold':require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    if (!fontsLoaded) {
        return;
    }

    return(
        <View onLayout={onLayoutRootView}>
            <View style={styles.loginBlock}>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder={'Пароль'}
                    keyboardType='default'
                    style={styles.textInput}
                    secureTextEntry={true}/>
                <Image style={styles.imageLogin} source={require('../profile/icons/password.png')}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    loginBlock: {
        position: 'relative',
        justifyContent: 'center',
        marginBottom: 10,
    },
    imageLogin: {
        position: 'absolute',
        right: 20,
        width: 15,
        height: 18,
        zIndex: 2
    },
    textInput: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderRadius: 46,
        fontSize: 12,
        color: '#8E73B2',
        fontFamily: 'Montserrat-Regular',
        shadowColor: 'rgba(19,18,66,0.06)',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 6
    },
    button: {
        backgroundColor: '#5F3C8F',
        borderRadius: 85,
        alignItems: 'center',
        paddingVertical: 12,
        marginTop: 15
    },
    textButton: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 13,
        color: '#fff'
    }
})