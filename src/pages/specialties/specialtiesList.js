import {useFonts} from "expo-font";
import {useCallback, useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {useFetching} from "../../hooks/useFetching";
import SpecialtiesService from "../../API/SpecialtiesService";
import {Loader} from "../../components/loader/loader";
import {Pagination} from "../../components/pagination/pagination";
import CalcSpecialtiesService from "../../API/CalcSpecialtiesService";
import {useDispatch, useSelector} from "react-redux";

export const SpecialtiesList = ({navigation, route}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })
    const [list, setList] = useState([])
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0)
    const disciplineSetId = route.params.disciplineSetId
    const includeBudget = route.params.includeBudget
    const includeContract = route.params.includeContract
    const scoreFilter = route.params.scoreFilter
    const regionId = route.params.regionId
    // console.log('disciplineSetId: ', disciplineSetId, '\n',
    //     'includeBudget', includeBudget, '\n',
    //     'includeContract', includeContract, '\n',
    //     'scoreFilter', scoreFilter, '\n',
    //     'regionId', regionId, '\n',
    // )
    console.log(list)

    const [fetch, isLoading, error] = useFetching(async () => {
        const response = await CalcSpecialtiesService.getSpecialties({
            disciplineSetId: disciplineSetId,
            scoreFilter: scoreFilter,
            page: page,
            includeBudget: includeBudget,
            includeContract: includeContract,
            regionFilter: regionId
        })
        await setList(response.content)
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
                <Pressable style={styles.btn_block} onPress={() => navigation.navigate('region-list', {
                    disciplineSetId: disciplineSetId,
                    includeBudget: includeBudget,
                    includeContract: includeContract,
                    scoreFilter: scoreFilter
                })}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Специальности</Text>
            </View>
            {
                isLoading ? <Loader/>
                    :
                    <View style={styles.list}>
                        {
                            list.map((el) =>
                                <Pressable
                                    style={({pressed}) => [
                                        {
                                            backgroundColor: pressed ? '#E7DBF9' : 'white',
                                            ...styles.el
                                        },
                                    ]}
                                    key={el.id}
                                    onPress={() => navigation.navigate('specialties/detail', {specId: el.id})}
                                >
                                    <Text style={styles.elText}>{el.speciality.title} ({el.university.title})</Text>
                                </Pressable>
                            )
                        }
                        {totalPage > 0 ? <Pagination selectPage={page} changePage={setPage} totalPages={totalPage}/>
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
//
    list: {
        paddingHorizontal: 30,
    },
    el: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 4,
        elevation: 1,
        // backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 5
    },
    elText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#000'

    }
})