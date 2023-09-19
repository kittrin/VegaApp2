import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Loader} from "../../components/loader/loader";
import {useFetching} from "../../hooks/useFetching";
import TownService from "../../API/TownService";
import * as SplashScreen from "expo-splash-screen";
import {useFonts} from "expo-font";
import {Dimensions} from 'react-native';
import {Pagination} from "../../components/pagination/pagination";

export const List_cities_of_universities = ({navigation}) => {
    const [listCity, setListCity] = useState([])
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    const [fetchCity, isLoadingCity, errorCity] = useFetching(async () => {
        const response = await TownService.getAll('', page, 20)
        await setListCity(response.content)
        await setTotalPage(response.totalPages)
    })
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        fetchCity()
    }, [page])

    const heightScreen = Dimensions.get('screen').height

    return (
        <ScrollView
            onLayout={onLayoutRootView}
            style={styles.content}
        >

            <TopMenu navigation={navigation}/>
            <View style={styles.title_main}>
                <Pressable style={styles.btn_block} onPress={() => navigation.navigate('main')}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Университеты</Text>
            </View>
            {isLoadingCity ?
                <Loader/>
                : <View style={{paddingHorizontal: 30, alignItems: 'center'}}>
                    {listCity.map((el) =>
                        <Pressable
                            key={el.id}
                            style={({pressed}) => [
                                {
                                    backgroundColor: pressed ? '#E7DBF9' : 'white',
                                    ...styles.elCity
                                },
                            ]}
                            onPress={()=>navigation.navigate('list_universities', {townId: el.id})}
                        >
                            <Text style={styles.elCityText}>{el.title}</Text>
                        </Pressable>
                    )}
                    {
                        totalPage>1? <Pagination totalPages={totalPage} changePage={setPage} selectPage={page}/>
                            :<View></View>
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
});
