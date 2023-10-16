import {useFonts} from "expo-font";
import React, {useCallback, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";

export const ChangeBudget = ({navigation, route}) =>{
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })
    const disciplineSetId = route.params.disciplineSetId? route.params.disciplineSetId :'5af9eec5-4542-44e6-8eb4-36349071dc06'
    const includeBudget=true
    const [includeContract, setIncludeContract] = useState(false)
    const [selectAnswer, setSelectAnswer] = useState([false, false])
    console.log(disciplineSetId)
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
                <Pressable style={styles.btn_block} onPress={() => navigation.navigate('change-subject')}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Специальности</Text>
            </View>
            <View style={styles.main}>
                <Text style={styles.que}>
                    Как бы ты хотел поступать в университет?
                </Text>
                <Pressable
                    style={{...styles.el, backgroundColor: selectAnswer[0]? '#E6DDF299' : '#fff'}}
                    onPress={()=>{
                        setIncludeContract(false)
                        setSelectAnswer([true, false])
                    }}
                >
                    <Text style={styles.elText}>Только на бюджетную основу</Text>
                </Pressable>
                <Pressable
                    style={{...styles.el, backgroundColor: selectAnswer[1]? '#E6DDF299' : '#fff'}}
                    onPress={()=>{
                        setIncludeContract(true)
                        setSelectAnswer([false, true])
                    }}
                >
                    <Text style={styles.elText}>На бюджетную или коммерческую основу</Text>
                </Pressable>
                <Pressable style={styles.btnNext} onPress={()=>navigation.navigate('change-score', {disciplineSetId: disciplineSetId, includeBudget: includeBudget, includeContract: includeContract})}>
                    <Text style={styles.elNextText}>Далее</Text>
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
    el:{
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 5,
    },
    elText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    btnNext: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 30,
        textAlign: 'center',
        backgroundColor: '#5F3C8F',
        borderRadius: 85,
        marginTop: 20

    },
    elNextText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
    },
})