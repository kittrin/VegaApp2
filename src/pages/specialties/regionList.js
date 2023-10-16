import {useFonts} from "expo-font";
import React, {useCallback, useEffect} from "react";
import * as SplashScreen from "expo-splash-screen";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import {useFetching} from "../../hooks/useFetching";
import RegionService from "../../API/RegionService";
import {Loader} from "../../components/loader/loader";
import {Pagination} from "../../components/pagination/pagination";

export const RegionList = ({navigation, route}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })
    const disciplineSetId = route.params.disciplineSetId
    const includeBudget = route.params.includeBudget
    const includeContract = route.params.includeContract
    const scoreFilter = route.params.scoreFilter
    const [regionId, setRegionId] = useState(undefined)
    const [listRegion, setListRegion] = useState([])
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [fetch, isLoading, error] = useFetching(async () => {
        const response = await RegionService.getAll({page: page})
        await setListRegion(response.content)
        await setTotalPage(response.totalPages)
    })
    useEffect(() => {
        fetch()
    }, [page])
    const [selectRegion, setSelectRegion] = useState(new Array(listRegion.length))
    const changeRegion = ({ind, elId}) => {
        let copySelect = []
        setSelectRegion(new Array(listRegion.length))
        copySelect[ind] = true
        setSelectRegion(copySelect)
        setRegionId(elId)
    }

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
                           onPress={() => navigation.navigate('change-score', {
                               disciplineSetId: disciplineSetId,
                               includeBudget: includeBudget,
                               includeContract: includeContract
                           })}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Специальности</Text>
            </View>
            <View style={styles.main}>
                <Text style={styles.que}>
                    Выберите регион:
                </Text>
                {
                    isLoading ? <Loader/>
                        :
                        listRegion.map((el, ind) =>
                            <Pressable
                                key={el.id}
                                style={{...styles.el, backgroundColor: selectRegion[ind] ? '#E6DDF299' : '#fff'}}
                                onPress={() => changeRegion({ind: ind, elId: el.id})}
                            >
                                <Text style={styles.elText}>{el.title}</Text>
                            </Pressable>
                        )
                }
                {
                    totalPage > 1 ? <Pagination totalPages={totalPage} changePage={setPage} selectPage={page}/>
                        : <View></View>
                }
                <Pressable style={styles.btnNext} onPress={() => navigation.navigate('specialties', {
                    disciplineSetId: disciplineSetId,
                    includeBudget: includeBudget,
                    includeContract: includeContract,
                    scoreFilter: scoreFilter,
                    regionId: regionId
                })}>
                    <Text style={styles.elNextText}>Отправить</Text>
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
    //
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
    el: {
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