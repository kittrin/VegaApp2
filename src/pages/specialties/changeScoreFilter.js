import {useFonts} from "expo-font";
import React, {useCallback, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";

export const ChangeScoreFilter = ({navigation, route}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })
    const disciplineSetId = route.params.disciplineSetId
    const includeBudget = route.params.includeBudget
    const includeContract = route.params.includeContract
    const [number, setNumber] = useState('')
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    return (
        <ScrollView
            onLayout={onLayoutRootView}
            style={styles.content}
        >
            <TopMenu navigation={navigation}/>
            <View style={styles.title_main}>
                <Pressable style={styles.btn_block}
                           onPress={() => navigation.navigate('change-budget', {disciplineSetId: disciplineSetId})}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Специальности</Text>
            </View>
            <View style={styles.main}>
                <Text style={styles.que}>
                    Какие баллы ЕГЭ ты получил?
                </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setNumber}
                    value={number}
                    placeholder='Введи сумму всех баллов'
                    keyboardType="numeric"
                />
                <Pressable style={styles.btnSave} onPress={() => navigation.navigate('region-list', {
                    disciplineSetId: disciplineSetId,
                    includeBudget: includeBudget,
                    includeContract: includeContract,
                    scoreFilter: number
                })}>
                    <Text style={styles.btnSaveText}>Отправить</Text>
                </Pressable>
                <Pressable style={styles.btnEnter}
                           onPress={() => navigation.navigate('region-list', {
                               disciplineSetId: disciplineSetId,
                               includeBudget: includeBudget,
                               includeContract: includeContract,
                               scoreFilter: 1000
                           })}
                >
                    <Text style={styles.btnEnterText}>
                        Я не хочу вводить баллы, просто покажи специальности
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    content: {
        backgroundColor: '#F9F9F9',
        height: '100%'
    },
    title_main: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    btn_block: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text_btn: {
        color: '#341460',
        fontSize: 13,
        textDecorationLine: 'underline'
    },
    img_btn: {
        marginRight: 5
    },
    title_text: {
        fontSize: 16,
        color: '#341460',
        fontWeight: 600
    },
    main: {
        paddingHorizontal: 30
    },
    que: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#5F3C8F',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#fff',
        marginBottom: 10
    },
    textInput: {
        paddingHorizontal: 11,
        paddingVertical: 11,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#00000040',
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        marginBottom: 10
    },
    btnSave: {
        backgroundColor: '#977EB8',
        borderRadius: 85,
        paddingHorizontal: 30,
        paddingVertical: 13,
        marginBottom: 10
    },
    btnSaveText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
    },
    btnEnter: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#5F3C8F',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
    },
    btnEnterText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#5F3C8F',
    }
})