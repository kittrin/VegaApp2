import {Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useFetching} from "../../hooks/useFetching";
import TownService from "../../API/TownService";
import React, {useCallback, useEffect, useState} from "react";
import UniversitiesService from "../../API/UniversityService";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {Loader} from "../../components/loader/loader";
import * as SplashScreen from "expo-splash-screen";
import {useFonts} from "expo-font";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "../../components/pagination/pagination";

export const List_universities = ({route, navigation}) =>{
    const dispatch = useDispatch()
    const cash = useSelector(state=>state.cash)
    const addCash = ()=>{
        dispatch({type: "ADD_CASH", payload: 5})
    }
    const town_id = route.params.townId
    //State
    const [listUniversities, setListUniversities] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(0)

    //Fonts
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

    //Fetch
    const [fetchUniversities, isLoading, errorMessage] = useFetching(async () => {
        const response = await UniversitiesService.getByTown(town_id, 'HIGH', page, 20)
        await setListUniversities([...listUniversities, ...response.content])
        await setTotalPage(response.totalPages)
    })
    useEffect(() => {
        fetchUniversities()
    }, [page])

    //Scroll

    return(
        <ScrollView  style={styles.content}
                     onLayout={onLayoutRootView}
        >
            <TopMenu navigation={navigation}/>
            <View style={styles.title_main}>
                <Pressable style={styles.btn_block} onPress={() => navigation.navigate('cities-with-universities')}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Университеты</Text>
            </View>
            {
                isLoading? <Loader/>
                    :
                    <View style={{paddingHorizontal: 30, }}>
                        {
                            listUniversities.length===0? <Text style={styles.elEmptyText}>Пока тут пусто :(</Text>
                                :
                                <View>
                                    {listUniversities.map((el) =>
                                    <Pressable
                                        key={el.id}
                                        style={({pressed}) => [
                                            {
                                                backgroundColor: pressed ? '#E7DBF9' : 'white',
                                                ...styles.elUni
                                            },
                                        ]}
                                        onPress={()=>navigation.navigate('detail-university', {university_id: el.id, townId: town_id})}
                                    >
                                        <Text style={styles.elUniText}>{el.title}</Text>
                                    </Pressable>
                                )}
                                    {
                                        totalPage>1? <Pagination totalPages={totalPage} changePage={setPage} selectPage={page}/>
                                            : <View></View>
                                    }
                                </View>
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
    elUni: {
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
    elUniText: {
        fontSize: 14,
        fontWeight: 500,
        fontFamily: 'Montserrat-Medium',
    },
    elEmptyText: {
        marginTop: 20,
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        color: '#341460',
        textAlign: 'center'
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
