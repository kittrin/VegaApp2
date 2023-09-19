import {useFonts} from "expo-font";
import {useCallback, useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {useFetching} from "../../hooks/useFetching";
import TutorsService from "../../API/TutorsService";
import {Loader} from "../../components/loader/loader";
import {Pagination} from "../../components/pagination/pagination";

export const OfflineTutors = ({navigation, route}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })
    const town_id = route.params.townId
    const time = route.params.time
    const disciplineId = route.params.disciplineId
    const districtId = route.params.districtId
    const [page, setPage] = useState(0)
    const [listTutors, setListTutors] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [fetch, isLoading, error] = useFetching(async () => {
        const response = await TutorsService.getOfflineAll({
            disctrictId: districtId,
            disciplineId: disciplineId,
            page: page
        })
        await setListTutors(response.content)
        await setTotalPage(response.totalPages)
    })
    useEffect(() => {
        fetch()
    }, [page])
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
                <Pressable style={styles.btn_block} onPress={() => navigation.navigate('tutor/city/district', {
                    time: time,
                    disciplineId: disciplineId,
                    townId: town_id
                })}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Подготовка к экзаменам</Text>
            </View>
            {isLoading ?
                <Loader/>
                : <View style={{paddingHorizontal: 30, alignItems: 'center'}}>
                    {listTutors.length > 0 ?
                        listTutors.map((el) =>
                            <Pressable
                                key={el.id}
                                style={({pressed}) => [
                                    {
                                        backgroundColor: pressed ? '#E7DBF9' : 'white',
                                        ...styles.elCity
                                    },
                                ]}
                                onPress={() => navigation.navigate('detail-tutor', {
                                    time: time,
                                    disciplineId: disciplineId,
                                    townId: town_id,
                                    districtId: districtId,
                                    tutorId: el.id
                                })}
                            >
                                <Text style={styles.elCityText}>{el.surname} {el.forename}</Text>
                            </Pressable>
                        )
                        : <Text>Пока тут пусто</Text>
                    }
                    {
                        totalPage > 1 ? <Pagination totalPages={totalPage} changePage={setPage} selectPage={page}/>
                            : <View></View>
                    }
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
    elCity: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 4,
        elevation: 1,
        // backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 5,
        width: '100%'
    },
    elCityText: {
        fontSize: 14,
        fontWeight: 500,
        fontFamily: 'Montserrat-Medium'
    },
//
})