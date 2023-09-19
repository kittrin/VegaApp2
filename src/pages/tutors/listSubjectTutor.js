import {useFonts} from "expo-font";
import {useCallback, useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import React from "react";
import {useFetching} from "../../hooks/useFetching";
import SubjectsService from "../../API/SubjectsService";
import {Loader} from "../../components/loader/loader";

export const ListSubjectTutor = ({route, navigation}) =>{
    const time = route.params.time;
    const [listSubjects, setListSubjects] = useState([])

    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })
    const [fetchDiscipline, isLoading, error] = useFetching(async () => {
        const response = await SubjectsService.getAll('HIGH');
        setListSubjects(response)
    })
    useEffect(()=>{
        fetchDiscipline()
    }, [])
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    return(
        <ScrollView
            onLayout={onLayoutRootView}
            style={styles.content}
        >
            <TopMenu navigation={navigation}/>
            <View style={styles.title_main}>
                <Pressable style={styles.btn_block} onPress={() => navigation.navigate('que-tutor-2')}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Подготовка к экзаменам</Text>
            </View>
            {
                isLoading? <Loader/>
                    :
                    <View style={styles.main}>
                        {listSubjects.map((el)=>
                            <Pressable
                                style={({pressed}) => [
                                    {
                                        backgroundColor: pressed ? '#E7DBF9' : 'white',
                                        ...styles.subject
                                    },
                                ]}
                                onPress={()=>{
                                    if (time==='online'){
                                        navigation.navigate('onlineTutors',  {time: time, discipline_id: el.id})
                                    } else {
                                        navigation.navigate('tutor/city', {time: time, discipline_id: el.id})
                                    }
                                }}
                                key={el.id}
                            >
                                <Text style={styles.subjectText}>{el.title}</Text>
                            </Pressable>
                            )}
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
        paddingHorizontal: 30
    },
    subject: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 4,
        elevation: 1,
        // backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 5,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    subjectText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    }
})