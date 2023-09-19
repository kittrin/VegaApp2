import {useFonts} from "expo-font";
import {useCallback, useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {Image, Linking, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useFetching} from "../../hooks/useFetching";
import OnlineSchoolService from "../../API/OnlineSchoolService";
import {Loader} from "../../components/loader/loader";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import React from "react";

export const OnlineSchool_detail = ({route, navigation}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
        'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf')//font-weight 700
    })
    const school_id = route.params.schoolId
    const [dataSchool, setDataSchool] = useState()
    const [fetch, isLoading, error] = useFetching(async ()=>{
        const response = await OnlineSchoolService.getById({schoolId: school_id})
        await setDataSchool(response)
    })
    const OpenURLButton = ({url, children, styles}) => {
        const handlePress = useCallback(async () => {
            const supported = await Linking.canOpenURL(url);
            await Linking.openURL(url);
        }, [url]);

        return <Text onPress={handlePress} style={styles}>{children}</Text>;
    };
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    useEffect(()=>{
        fetch()
    }, [])

    return(
        <ScrollView
            onLayout={onLayoutRootView}
            style={styles.content}
        >
            <TopMenu navigation={navigation}/>
            <View style={styles.title_main}>
                <Pressable style={styles.btn_block} onPress={() => navigation.navigate('list-online-school')}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Подготовка к экзаменам</Text>
            </View>

            {
                isLoading? <Loader/>
                    :
                    <View style={styles.main}>
                        <Text style={styles.titleSchool}>{dataSchool.title}</Text>
                        <Text style={styles.descriptionSchool}>
                            {dataSchool.description}
                        </Text>
                        <OpenURLButton url={dataSchool.schoolUrl} children='Перейти на сайт' styles={styles.btnUrl}/>
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
    main: {
      paddingHorizontal: 30,
        paddingBottom: 30
    },
    titleSchool: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        color: '#341460',
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 4,
        elevation: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    descriptionSchool: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 4,
        elevation: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 5,
    },
    btnUrl: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        width: '100%',
        borderRadius: 85,
        backgroundColor: '#5F3C8F',
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center'
    }
})