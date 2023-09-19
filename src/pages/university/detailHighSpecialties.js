import {useFonts} from "expo-font";
import {useCallback, useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {useFetching} from "../../hooks/useFetching";
import UniversitiesService from "../../API/UniversityService";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {Loader} from "../../components/loader/loader";

export const DetailHighSpecialties = ({route, navigation}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf')//font-weight 600
    })
    const university_id = route.params.university_id
    const town_id = route.params.townId
    const speciality_id = route.params.spec_id
    const [dataSpec, setDataSpec] = useState()
    const [fetch, isLoading, error] = useFetching(async () => {
        const response = await UniversitiesService.getHighSpecialtiesById({specialtiesId: speciality_id})
        await setDataSpec(response)
    })

    useEffect(() => {
        fetch()
    }, [])
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <ScrollView onLayout={onLayoutRootView} style={styles.content}>
            <TopMenu navigation={navigation}/>
            <View style={styles.title_main}>
                <Pressable style={styles.btn_block}
                           onPress={() => navigation.navigate('list-high-specialties-by-university', {
                               university_id: university_id,
                               townId: town_id
                           })}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Университеты</Text>
            </View>
            {
                isLoading ? <Loader/>
                    :
                    <View style={styles.page}>
                        <Text style={styles.block}>
                            {dataSpec.university.title}
                        </Text>
                        <Text style={styles.block}>
                            {dataSpec.speciality.title}
                        </Text>
                        <Text style={styles.block}>Количество бюджетных
                            мест: <Text style={styles.txtNumber}>{dataSpec.budgetPlaces ? dataSpec.budgetPlaces : "Неизвестно"}</Text></Text>
                        <Text style={styles.block}>Проходной балл на бюджетную
                            основу: <Text style={styles.txtNumber}>{dataSpec.budgetPassingScore ? dataSpec.budgetPassingScore : "Неизвестно"}</Text></Text>
                        <Text style={styles.block}>Количество мест по
                            договору: <Text style={styles.txtNumber}>{dataSpec.contractPlaces ? dataSpec.contractPlaces : "Неизвестно"}</Text></Text>
                        <Text style={styles.block}>Проходной балл на
                            договор: <Text style={styles.txtNumber}>{dataSpec.contractPassingScore ? dataSpec.contractPassingScore : "Неизвестно"}</Text></Text>
                        <Text style={styles.block}>Цена договора (очно,
                            руб): <Text style={styles.txtNumber}>{dataSpec.intramuralPrice ? dataSpec.intramuralPrice : "Неизвестно"}</Text></Text>
                        <Text style={styles.block}>Цена договора (заочно,
                            руб): <Text style={styles.txtNumber}>{dataSpec.absentiaPrice ? dataSpec.absentiaPrice : "Неизвестно"}</Text></Text>
                        <Text style={styles.block}>Цена договора (очно-заочно,
                            руб): <Text style={styles.txtNumber}>{dataSpec.partTimePrice ? dataSpec.partTimePrice : "Неизвестно"}</Text></Text>
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
    txtNumber: {
        color: '#341460',
        fontFamily: 'Montserrat-Bold'
    }
})