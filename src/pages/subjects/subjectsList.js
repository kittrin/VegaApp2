import {useFonts} from "expo-font";
import React, {useCallback, useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {useFetching} from "../../hooks/useFetching";
import SubjectsService from "../../API/SubjectsService";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {FlatList, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Loader} from "../../components/loader/loader";

export const SubjectsList = ({navigation}) =>{
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
        'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf')//font-weight 600
    })
    const [listSubjects, setListSubjects] = useState([])

    const [fetchDiscipline, isLoading, error] = useFetching(async () => {
        const response = await SubjectsService.getAll('HIGH');
        setListSubjects(response)
    })
    useEffect(() => {
        fetchDiscipline()
    }, [])
    const Item = ({item}) => (
        <Pressable style={styles.subject_item} onPress={() =>navigation.navigate('subjects-detail', {subjectId: item.id})}>
            <Text>{item.title}</Text>
        </Pressable>
    )
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    return(
        <View style={styles.main_page} onLayout={onLayoutRootView}>
            <TopMenu navigation={navigation}/>
            <View style={styles.title_main}>
                <Pressable style={styles.btn_block} onPress={() => navigation.navigate('main')}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Предметы</Text>
            </View>
            {isLoading ? <Loader/> :
                <FlatList
                    data={listSubjects}
                    renderItem={({item}) => <Item item={item}/>}
                    keyExtractor={(item) => item.id}/>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    main_page: {
        // marginTop: 20,
        backgroundColor: '#F9F9F9'
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
    //subject item
    subject_item: {
        paddingHorizontal: 20,
        marginLeft: 30,
        marginRight: 30,
        paddingVertical: 15,
        marginBottom: 5,
        backgroundColor: '#FFFFFF',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,
        elevation: 4,
        borderRadius: 10
    },

    //detail item
    detail_title: {
        marginHorizontal: 30,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 18,
        color: '#341460',
        marginBottom: 5,
        backgroundColor: '#FFFFFF',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,
        elevation: 4,
        borderRadius: 10
    },
    detail_description: {
        marginHorizontal: 30,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,
        elevation: 4,
        fontSize: 14,
        color: '#000000',
        fontWeight: 500,
        marginBottom: 5,
        borderRadius: 10
    },
    detail_btn: {
        backgroundColor: '#5F3C8F',
        borderRadius: 85,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,
        elevation: 4,
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 600,
        textAlign: 'center',
        marginHorizontal: 30,
        paddingVertical: 12,
        marginBottom: 5
    }
})