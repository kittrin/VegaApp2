import {Image, Linking, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useFetching} from "../../hooks/useFetching";
import UniversitiesService from "../../API/UniversityService";
import {useCallback, useEffect, useState} from "react";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {Loader} from "../../components/loader/loader";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";

export const Detail_university = ({route, navigation}) => {

    const university_id = route.params.university_id
    const town_id = route.params.townId
    const [dataUniversity, setDataUniversity] = useState([])
    const [fetchUniversity, isLoading, errorMessage] = useFetching(async () => {
        const response = await UniversitiesService.getById(university_id)
        await setDataUniversity(response)
    })
    useEffect(() => {
        fetchUniversity()
    }, [])

    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
    })
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    const OpenURLButton = ({url, children, styles}) => {
        const handlePress = useCallback(async () => {
            const supported = await Linking.canOpenURL(url);
            await Linking.openURL(url);
        }, [url]);

        return <Text onPress={handlePress} style={styles}>{children}</Text>;
    };
    return (
        <ScrollView style={styles.content} onLayout={onLayoutRootView}>
            <TopMenu navigation={navigation}/>
            <View style={styles.title_main}>
                <Pressable style={styles.btn_block}
                           onPress={() => navigation.navigate('list_universities', {town_id: town_id})}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Университеты</Text>
            </View>
            {
                isLoading ? <Loader/>
                    :
                    <View style={styles.pageUniversity}>
                        <View style={styles.titleUniversity}>
                            <Text
                                style={styles.textTitleUniversity}>{dataUniversity.title} ({dataUniversity.shortTitle})</Text>
                        </View>
                        <View style={styles.descriptionBlock}>
                            {dataUniversity.description ?
                                <Text>
                                    {dataUniversity.description}
                                </Text>
                                : <View></View>
                            }
                            {dataUniversity.address ?
                                <View>
                                    <Text>Адрес: </Text>
                                    <Text>{dataUniversity.address}</Text>
                                </View>
                                : <View></View>}
                        </View>
                        {
                            dataUniversity.site ?
                                <OpenURLButton url={dataUniversity.site} children={"Перейти на сайт"}
                                               styles={styles.siteUniversity}/>
                                : <View></View>
                        }
                        {
                            dataUniversity.studentsTelegramChatUrl ?
                                <OpenURLButton url={dataUniversity.studentsTelegramChatUrl}
                                               children={"Чат со студентами"} styles={styles.chatWithStudent}/>
                                : <View></View>
                        }
                        <Text
                            onPress={() => navigation.navigate('list-high-specialties-by-university', {
                            university_id: university_id,
                            town_id: town_id
                        })}
                        style={styles.specialtiesButton}>Посмотреть специальности</Text>
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
    pageUniversity: {
        paddingHorizontal: 30,
    },
    titleUniversity: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 5,
    },
    textTitleUniversity: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14
    },
    descriptionBlock: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 5,
    },
    textDescription: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14
    },
    siteUniversity: {
        paddingVertical: 12,
        width: '100%',
        backgroundColor: '#977EB8',
        alignItems: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        borderRadius: 85,
        marginBottom: 5
    },
    chatWithStudent: {
        paddingVertical: 12,
        width: '100%',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        color: '#5F3C8F',
        textAlign: 'center',
        borderRadius: 85,
        marginBottom: 5,
        borderColor: '#5F3C8F',
        borderWidth: 1
    },
    specialtiesButton: {
        paddingVertical: 12,
        width: '100%',
        backgroundColor: '#5F3C8F',
        alignItems: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center',
        borderRadius: 85,
        marginBottom: 5,
        borderColor: '#5F3C8F',
        borderWidth: 1
    }
});
