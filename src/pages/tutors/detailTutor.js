import {useFonts} from "expo-font";
import React, {useCallback, useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useFetching} from "../../hooks/useFetching";
import TutorsService from "../../API/TutorsService";
import {Loader} from "../../components/loader/loader";

export const DetailTutor = ({navigation, route}) =>{
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })
    const town_id = route.params.townId
    const time = route.params.time
    const disciplineId = route.params.disciplineId
    const districtId = route.params.districtId
    const tutorId = route.params.tutorId
    const [data, setData] = useState({})
    const [fetch, isLoading, error] = useFetching(async ()=>{
        const response = await TutorsService.getById({tutor_id: tutorId})
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
                <Pressable style={styles.btn_block} onPress={() => {
                    if(time==='offline'){
                        navigation.navigate('offlineTutors', {time: time, disciplineId: disciplineId, townId: town_id, districtId: districtId})
                    } else{
                        navigation.navigate('onlineTutors', {time: time, disciplineId: disciplineId})
                    }
                }}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Подготовка к экзаменам</Text>
            </View>
            {
                isLoading? <Loader/>
                    :
                    <View style={styles.main}>
                        <Text style={styles.title_tutor}>{data.forename} {data.surname}</Text>
                        <Text style={styles.description_tutor}>{data.description}</Text>
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
    main: {
        paddingHorizontal: 30,
},
    title_tutor: {
        paddingHorizontal:  30,
        paddingVertical: 15,
        backgroundColor: '#fff',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        marginBottom: 5,
        borderRadius: 10,

    },
    description_tutor: {
        paddingHorizontal:  30,
        paddingVertical: 15,
        backgroundColor: '#fff',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        marginBottom: 30,
        borderRadius: 10,
    }
//
})