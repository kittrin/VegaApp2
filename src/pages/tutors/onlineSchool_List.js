import {useFonts} from "expo-font";
import {useCallback, useEffect} from "react";
import * as SplashScreen from "expo-splash-screen";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {useState} from "react";
import {useFetching} from "../../hooks/useFetching";
import OnlineSchoolService from "../../API/OnlineSchoolService";
import {Loader} from "../../components/loader/loader";
import {Pagination} from "../../components/pagination/pagination";

export const OnlineSchool_List = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [listSchool, setListSchool] = useState([])
    const [fetch, isLoading, error] = useFetching(async () => {
        const response = await OnlineSchoolService.getAll({page: page})
        await setListSchool(response.content)
        await setTotalPage(response.totalPages)
    })
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    useEffect(()=>{
        fetch()
    }, [page])
    return (
        <ScrollView
            onLayout={onLayoutRootView}
            style={styles.content}
        >
            <TopMenu navigation={navigation}/>
            <View style={styles.title_main}>
                <Pressable style={styles.btn_block} onPress={() => navigation.navigate('que-tutor-1')}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Подготовка к экзаменам</Text>
            </View>
            {
                isLoading ? <Loader/>
                    :
                    listSchool.length === 0 ? <Text style={styles.elEmptyText}>Пока тут пусто :(</Text>
                        :
                        <View style={styles.list}>
                            {
                                listSchool.map((el)=>
                                    <Pressable
                                        style={({pressed}) => [
                                            {
                                                backgroundColor: pressed ? '#E7DBF9' : 'white',
                                                ...styles.schoolEl
                                            },
                                        ]}
                                        onPress={()=>{navigation.navigate('detail-online-school', {schoolId: el.id})}}
                                    >
                                        <Text style={styles.schoolElText}>{el.title}</Text>
                                    </Pressable>
                                )
                            }
                            {totalPage>1? <Pagination totalPages={totalPage} changePage={setPage} selectPage={page}/>
                            : <View></View>}
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
        paddingHorizontal: 30,
    },
    schoolEl: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 4,
        elevation: 1,
        // backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 5
    },
    schoolElText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    }
})