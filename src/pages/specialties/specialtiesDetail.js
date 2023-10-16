import {useFonts} from "expo-font";
import React, {useCallback, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useFetching} from "../../hooks/useFetching";
import SpecialtiesService from "../../API/SpecialtiesService";
import {useEffect} from "react";
import {Loader} from "../../components/loader/loader";
import {useDispatch, useSelector} from "react-redux";
import {specialtyReducer} from "../../store/specialityReducer";

export const SpecialtiesDetail = ({navigation, route}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
        'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf')//font-weight 600
    })
    const [flagFav, setFlagFav] = useState(false)

    //---------------------------
    const dispatch = useDispatch()
    const favorite_spec = useSelector(state => state.specialtyReducer.specialties)
    const proverka = ()=>{
        favorite_spec.map((el, ind)=>{
            if (el.id===specId){
                setFlagFav(true)
            }
        })
    }
    //-----------------------
    const specId = route.params.specId;
    const [data, setData] = useState([])
    const disciplineSetId = route.params.disciplineSetId
    const includeBudget = route.params.includeBudget
    const includeContract = route.params.includeContract
    const scoreFilter = route.params.scoreFilter
    const regionId = route.params.regionId ?  route.params.regionId : undefined
    const [fetch, isLoading, error] = useFetching(async () => {
        const response = await SpecialtiesService.getById({specId: specId})
        await setData(response)

    })
    useEffect(() => {
        fetch()
    }, [])
    useEffect(()=>{
        proverka()
    }, [])
    const pressSpecFav = () => {
        if (flagFav){
            dispatch({type: 'remove_fav_spec', payload: {id: specId, title: data.speciality.title}})
            setFlagFav(false)
        } else {
            dispatch({type: 'add_fav_spec', payload: {id: specId, title: data.speciality.title}})
            setFlagFav(true)
        }
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
                <Pressable style={styles.btn_block} onPress={() =>{
                    if(regionId)
                    navigation.navigate('specialties', {
                    disciplineSetId: disciplineSetId,
                    includeBudget: includeBudget,
                    includeContract: includeContract,
                    scoreFilter: scoreFilter,
                    regionId: regionId
                })
                    else navigation.navigate('favorite')
                }
                }>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Специальности</Text>
            </View>

            {
                isLoading ? <Loader/>
                    :
                    <View style={styles.page}>
                        <Text style={styles.block}>
                            {data.university.title}
                        </Text>
                        <View style={styles.block_title}>
                            <Text style={styles.text_title}>
                                {data.speciality.title}
                            </Text>
                            <Pressable onPress={pressSpecFav}>
                                {
                                    flagFav? <Image source={require('../../image/icons/in-fav-list.png')} style={styles.fav_btn}/>
                                        : <Image source={require('../../image/icons/not-in-fav-list.png')} style={styles.fav_btn}/>
                                }
                            </Pressable>
                        </View>
                        <Text style={styles.block}>Количество бюджетных
                            мест: <Text
                                style={styles.txtNumber}>{data.budgetPlaces ? data.budgetPlaces : "Неизвестно"}</Text></Text>
                        <Text style={styles.block}>Проходной балл на бюджетную
                            основу: <Text
                                style={styles.txtNumber}>{data.budgetPassingScore ? data.budgetPassingScore : "Неизвестно"}</Text></Text>
                        <Text style={styles.block}>Количество мест по
                            договору: <Text
                                style={styles.txtNumber}>{data.contractPlaces ? data.contractPlaces : "Неизвестно"}</Text></Text>
                        <Text style={styles.block}>Проходной балл на
                            договор: <Text
                                style={styles.txtNumber}>{data.contractPassingScore ? data.contractPassingScore : "Неизвестно"}</Text></Text>
                        <Text style={styles.block}>Цена договора (очно,
                            руб): <Text
                                style={styles.txtNumber}>{data.intramuralPrice ? data.intramuralPrice : "Неизвестно"}</Text></Text>
                        <Text style={styles.block}>Цена договора (заочно,
                            руб): <Text
                                style={styles.txtNumber}>{data.absentiaPrice ? data.absentiaPrice : "Неизвестно"}</Text></Text>
                        <Text style={styles.block}>Цена договора (очно-заочно,
                            руб): <Text
                                style={styles.txtNumber}>{data.partTimePrice ? data.partTimePrice : "Неизвестно"}</Text></Text>
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
        fontWeight: 600,
    },
//
    page: {
        paddingHorizontal: 30,
        gap: 5,
        paddingBottom: 20
    },
    block: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 4,
        elevation: 1,
        fontFamily: 'Montserrat-Medium',
        fontSize: 14
    },
    block_title: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 4,
        elevation: 1,
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center'
    },
    fav_btn:{
        width: 20,
        height: 20
    },
    text_title: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        // width: '60%'

    },
    txtNumber: {
        color: '#341460',
        fontFamily: 'Montserrat-Bold'
    },
    btnUniver: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#5F3C8F',
        fontFamily: 'Montserrat-SemiBold',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14
    },

})