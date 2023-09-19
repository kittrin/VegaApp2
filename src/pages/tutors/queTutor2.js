import {useState} from "react";
import {useFonts} from "expo-font";
import {useCallback} from "react";
import * as SplashScreen from "expo-splash-screen";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import React from "react";

export const QueTutor2 = ({navigation}) => {
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
    return(
        <ScrollView
            onLayout={onLayoutRootView}
            style={styles.content}
        >
            <TopMenu navigation={navigation}/>
            <View style={styles.title_main}>
                <Pressable style={styles.btn_block} onPress={() => navigation.navigate('que-tutor-1')}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Подготовка к экзаменам</Text>
            </View>
            <View style={styles.main}>
                <Text style={styles.question}>
                    Как бы ты хотел встречаться со своим преподавателем?
                </Text>
                <Pressable
                    style={({pressed}) => [
                        {
                            backgroundColor: pressed ? '#E7DBF9' : 'white',
                            ...styles.answer
                        },
                    ]}
                    onPress={()=>navigation.navigate('tutor/subjects', {time: 'offline'})}
                >
                    <Text style={styles.answerText}>Очно</Text>
                </Pressable>
                <Pressable
                    style={({pressed}) => [
                        {
                            backgroundColor: pressed ? '#E7DBF9' : 'white',
                            ...styles.answer
                        },
                    ]} onPress={()=>navigation.navigate('tutor/subjects', {time: 'online'})}>
                    <Text style={styles.answerText}>Онлайн</Text>
                </Pressable>
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
        fontWeight: 600
    },
    //
    main: {
        paddingHorizontal: 30
    },
    question: {
        width: '100%',
        backgroundColor: '#5F3C8F',
        color: '#FFF',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 5
    },
    questionText: {
        color: '#FFF',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    answer: {
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
    answerText: {
        color: '#000',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    }
})