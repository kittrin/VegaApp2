import {useFetching} from "../../hooks/useFetching";
import UniversitiesService from "../../API/UniversityService";
import {useEffect} from "react";
import {useState} from "react";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useFonts} from "expo-font";
import {useCallback} from "react";
import * as SplashScreen from "expo-splash-screen";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import React from "react";
import {Pagination} from "../../components/pagination/pagination";
import {Loader} from "../../components/loader/loader";

export const ListHighSpecialities = ({route, navigation}) =>{
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular':require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium':require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold':require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })

    const university_id = route.params.university_id
    const town_id = route.params.townId
    const [listSpecialties, setListSpecialities] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(0)
    const [fetchSpecialties, isLoading, errorMessage] = useFetching(async () => {
        const response = await UniversitiesService.getHighSpecialties({universityId: university_id, page: page, size: 20})
        await setListSpecialities(response.content)
        await setTotalPage(response.totalPages)
    })
    useEffect(() => {
        fetchSpecialties()
    }, [page])
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    return(
        <ScrollView  onLayout={onLayoutRootView} style={styles.content}>
            <TopMenu navigation={navigation}/>
            <View style={styles.title_main}>
                <Pressable style={styles.btn_block}  onPress={()=>navigation.navigate('detail-university', {university_id: university_id, townId: town_id})}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Университеты</Text>
            </View>
            {
                isLoading? <Loader/>
                    :
                    <View style={styles.listSpecialties}>
                        {
                            listSpecialties.map(el=>
                                <Pressable
                                    style={({pressed}) => [
                                    {
                                        backgroundColor: pressed ? '#E7DBF9' : 'white',
                                        ...styles.elUni
                                    },
                                ]}
                                    onPress={()=>navigation.navigate('detail-high-specialty', {university_id: el.id, townId: town_id, spec_id: el.id})}
                                >
                                    <Text>{el.speciality.title}</Text>
                                </Pressable>
                            )
                        }
                        {
                            totalPage>1?
                                <Pagination selectPage={page} changePage={setPage} totalPages={totalPage}/>
                            :
                                <View></View>
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
    //navigate
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

    //page
    listSpecialties: {
        alignItems: 'center',
        paddingHorizontal: 30
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
        marginBottom: 5,
        width: '100%'
    },
})