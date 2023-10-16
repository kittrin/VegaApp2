import {useFonts} from "expo-font";
import React, {useCallback} from "react";
import * as SplashScreen from "expo-splash-screen";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {TopMenu} from "../components/menu/top_menu/TopMenu";
import {useDispatch, useSelector} from "react-redux";
import {subjectReducer} from "../store/subjectReducer";

export const Favorite_list = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
        'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf')//font-weight 600
    })
    const dispatch = useDispatch()
    const favorite_spec = useSelector(state => state.specialtyReducer.specialties)
    const favorite_subject = useSelector(state => state.subjectReducer.subjects)
    const favorite_tutor = useSelector(state => state.tutorReducer.tutors)

    const remove_spec = (el)=>{
        dispatch({type: 'remove_fav_spec', payload: {id: el.id, title: el.title}})
    }
    const remove_fav_subject = (el)=>{
        dispatch({type: 'remove_fav_subject', payload: {id: el.id, title: el.title}})
    }
    const remove_fav_tutor = (el)=>{
        dispatch({type: 'remove_fav_tutor', payload: {id: el.id, title: el.title}})
    }
    console.log(favorite_subject)
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
                <Pressable style={styles.btn_block} onPress={() => navigation.navigate('main')}>
                    <Image source={require('../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Избранное</Text>
            </View>
            <View style={styles.main}>
                <Text style={styles.title_section}>Специальности</Text>
                {
                    favorite_spec.map(el =>
                        <Pressable style={styles.block} onPress={()=>navigation.navigate('specialties/detail', {specId: el.id})}>
                            <Text style={styles.block_text}>{el.title}</Text>
                            <Pressable onPress={()=>remove_spec(el)}>
                                <Image source={require('../image/icons/in-fav-list.png')} style={styles.fav_btn}/>
                            </Pressable>
                        </Pressable>
                    )
                }
                <Text style={styles.title_section}>Предметы</Text>
                {
                    favorite_subject.map(el =>
                        <Pressable style={styles.block} onPress={()=>navigation.navigate('subjects-detail', {subjectId: el.id, inFav: true})}>
                            <Text style={styles.block_text}>{el.title}</Text>
                            <Pressable onPress={()=>remove_fav_subject(el)}>
                                <Image source={require('../image/icons/in-fav-list.png')} style={styles.fav_btn}/>
                            </Pressable>
                        </Pressable>
                    )
                }
                <Text style={styles.title_section}>Репетиторы</Text>
                {
                    favorite_tutor.map(el =>
                        <Pressable style={styles.block} onPress={()=>navigation.navigate('detail-tutor', {tutorId: el.id})}>
                            <Text style={styles.block_text}>{el.title}</Text>
                            <Pressable  onPress={()=>remove_fav_tutor(el)}>
                                <Image source={require('../image/icons/in-fav-list.png')} style={styles.fav_btn}/>
                            </Pressable>
                        </Pressable>
                    )
                }
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
        fontWeight: 600,
    },
//
    main: {
        paddingHorizontal: 30
    },
    title_section: {
        fontFamily: 'Montserrat-Bold',
        color: '#341460',
        fontSize: 16,
        marginBottom: 10,
        marginTop: 15,
        fontWeight: 600
    },
    block: {
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        marginBottom: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 10,
        elevation: 1,
        borderRadius: 10
    },
    block_text: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14
    },
    fav_btn:{
        width: 20,
        height: 20
    }
})