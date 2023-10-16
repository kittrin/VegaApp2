import {useFonts} from "expo-font";
import React, {useCallback} from "react";
import * as SplashScreen from "expo-splash-screen";
import {Image, Linking, Pressable, StyleSheet, Text, View} from "react-native";
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {useState} from "react";
import {useFetching} from "../../hooks/useFetching";
import SubjectsService from "../../API/SubjectsService";
import {useEffect} from "react";
import {Loader} from "../../components/loader/loader";
import {useDispatch, useSelector} from "react-redux";

export const SubjectDetail = ({navigation, route}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
        'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf')//font-weight 600
    })
    const [item, setItem] = useState()
    const [flagFav, setFlagFav] = useState(false)

    const subject_id = route.params.subjectId
    const in_fav = route.params.inFav ? route.params.inFav : false
    const [fetchDiscipline, isLoading, error] = useFetching(async () => {
        const response = await SubjectsService.getById({id: subject_id});
        setItem(response)
    })
    const dispatch = useDispatch()
    const favorite_subjects = useSelector(state => state.subjectReducer.subjects)

    const proverka = () => {
        favorite_subjects.map((el, ind) => {
            if (el.id === subject_id) {
                setFlagFav(true)
            }
        })
    }
    useEffect(() => {
        fetchDiscipline()
    }, [])
    useEffect(() => {
        proverka()
    }, [])
    const pressSubjectFav = () => {
        if (flagFav) {
            dispatch({type: 'remove_fav_subject', payload: {id: subject_id, title: item.title}})
            setFlagFav(false)
        } else {
            dispatch({type: 'add_fav_subject', payload: {id: subject_id, title: item.title}})
            setFlagFav(true)
        }
    }
    const OpenURLButton = ({url, children}) => {
        const handlePress = useCallback(async () => {
            const supported = await Linking.canOpenURL(url);
            await Linking.openURL(url);
        }, [url]);

        return <Text onPress={handlePress} style={styles.detail_btn}>{children}</Text>;
    };

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    return (
        <View style={styles.main_page} onLayout={onLayoutRootView}>
            <TopMenu navigation={navigation}/>
            <View style={styles.title_main}>
                <Pressable style={styles.btn_block} onPress={() => {
                    if (in_fav) navigation.navigate('favorite')
                    else
                        navigation.navigate('subjects-list')
                }}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Предметы</Text>
            </View>
            {
                isLoading ? <Loader/>
                    :
                    <View>
                        <View style={styles.block_title}>
                            <Text style={styles.text_title}>
                                {item.title}
                            </Text>
                            <Pressable onPress={pressSubjectFav}>
                                {
                                    flagFav ? <Image source={require('../../image/icons/in-fav-list.png')}
                                                     style={styles.fav_btn}/>
                                        : <Image source={require('../../image/icons/not-in-fav-list.png')}
                                                 style={styles.fav_btn}/>
                                }
                            </Pressable>
                        </View>
                        <Text style={styles.detail_description}>{item.description}</Text>
                        {item.fipiLink ? <OpenURLButton url={item.fipiLink}>Сайт ФИПИ</OpenURLButton>
                            : <View></View>
                        }
                        {
                            item.sdamGiaLink ? <OpenURLButton url={item.sdamGiaLink}>Сайт Решу ЕГЭ</OpenURLButton>
                                : <View></View>
                        }
                    </View>
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
    },
    block_title: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 4,
        elevation: 1,
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 5
    },
    fav_btn: {
        width: 20,
        height: 20
    },
    text_title: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        // width: '60%'

    },
})