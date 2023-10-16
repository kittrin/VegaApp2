import {useFonts} from "expo-font";
import React, {useCallback, useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useFetching} from "../../hooks/useFetching";
import SubjectsService from "../../API/SubjectsService";
import {Loader} from "../../components/loader/loader";
import CalcSpecialtiesService from "../../API/CalcSpecialtiesService";

export const ChangeSubject = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })
    const [listSub, setListSub] = useState([])
    const [selectListSub, setSelectListSub] = useState([])
    const [disciplineSet, setDisciplineSet] = useState([])
    const [errorText, setErrorText] = useState()
    const [fetch, isLoading, error] = useFetching(async () => {
        const response = await SubjectsService.getAll()
        await setListSub(response)
    })
    const [fetchDiscipline, isLoadingDisc, errorDisc] = useFetching(async () => {
        const response = await CalcSpecialtiesService.getDisciplineSet({arrDiscipline: selectListSub})
        setDisciplineSet(response)
    })
    const [listSelect, setListSelect] = useState(new Array(listSub.length))
    useEffect(() => {
        fetch()
    }, [])
    const selectSubject = (subjectId, ind) => {
        setErrorText(' ')
        if (listSelect[ind]) {
            const filterSelect = selectListSub.filter((item) => item !== subjectId)
            const copySelect = listSelect
            copySelect[ind] = false
            setListSelect(copySelect)
            setSelectListSub(filterSelect)
        } else {
            setSelectListSub([...selectListSub, subjectId])
            const copySelect = listSelect
            copySelect[ind] = true
            setListSelect(copySelect)
        }
    }
    const PressNext = ()=>{
        if (disciplineSet.length === 0) {
            setErrorText('С таким набором специальности не найдены. Выберите другой набор')
        } else {
            setErrorText(' ')
            navigation.navigate('change-budget', {disciplineSetId: disciplineSet[0].id})
        }
    }
    useEffect(()=>
        PressNext()
    , [isLoadingDisc])
    console.log('isLoadingDisc', isLoadingDisc)
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
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Специальности</Text>
            </View>
            {
                isLoading ? <Loader/>
                    :
                    <View style={styles.mainList}>
                        <Text style={styles.question}>
                            Выбери дисциплины, которые ты будешь сдавать во время ЕГЭ!
                        </Text>
                        <Text style={styles.errorText}>
                            {errorText}
                        </Text>
                        {
                            listSub.map((el, ind) =>
                                <Pressable style={{
                                    ...styles.elSubj,
                                    backgroundColor: listSelect[ind] ? '#E6DDF299' : '#FFFFFF'
                                }} onPress={() => selectSubject(el.id, ind)}
                                           key={el.id}>
                                    <Text style={styles.elSubjText}>{el.title}</Text>
                                </Pressable>
                            )
                        }
                        <Pressable style={styles.btnNext} onPress={async () => {
                            await fetchDiscipline()
                            PressNext()
                        }}>
                            <Text style={styles.elNextText}>Далее</Text>
                        </Pressable>
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
    mainList: {
        paddingHorizontal: 30
    },
    question: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 5,
        backgroundColor: '#5F3C8F',
        borderRadius: 10,
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#fff'
    },
    elSubj: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 5,
        borderRadius: 10,
    },
    elSubjText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    btnNext: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 30,
        textAlign: 'center',
        backgroundColor: '#5F3C8F',
        borderRadius: 85
    },
    elNextText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',

    },
    errorText: {
        color: '#ff0000'
    }
})
//