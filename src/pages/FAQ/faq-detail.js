import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {useCallback} from "react";
import * as SplashScreen from "expo-splash-screen";
import {useFonts} from "expo-font";
import {useFetching} from "../../hooks/useFetching";
import FaqService from "../../API/FaqService";
import {useEffect} from "react";
import {Loader} from "../../components/loader/loader";
import {Pagination} from "../../components/pagination/pagination";

export const FaqDetail = ({navigation, route})=>{
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })
    const faqId = route.params.faqId;
    const [data, setData] = useState()
    const [fetch, isLoading, error] = useFetching(async () => {
        const response = await FaqService.getById({questionId: faqId})
        await setData(response)
    })
    useEffect(()=>{
        fetch()
    }, [])
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
                <Pressable style={styles.btn_block} onPress={() => navigation.navigate('faq')}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>FAQ</Text>
            </View>
            {
                isLoading ? <Loader/>
                    :
                        <View style={styles.list}>
                            <Text style={styles.titleEl}>{data.quest}</Text>
                            <Text style={styles.descriptionEl}>{data.answer}</Text>
                        </View>
            }
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
//
    list: {
        paddingHorizontal: 30
    },
    titleEl: {
        borderRadius: 10,
        backgroundColor: '#E6DDF299',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 4,
        elevation: 1,
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#000',
        marginBottom: 5,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    descriptionEl: {
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 4,
        elevation: 1,
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#000',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 30
    }
})