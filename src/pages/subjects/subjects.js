import React, {useCallback, useEffect, useState} from "react";
import {FlatList, Image, Text, View, StyleSheet, Pressable, Linking} from "react-native"
import {TopMenu} from "../../components/menu/top_menu/TopMenu";
import {useFetching} from "../../hooks/useFetching";
import SubjectsService from "../../API/SubjectsService";
import {Loader} from "../../components/loader/loader";

export const List_objects = ({navigation}) => {
    const [openSubject, setOpenSubject] = useState('main')
    const [openDetail, setOpenDetail] = useState(false)
    const [listSubjects, setListSubjects] = useState([])
    const [fetchDiscipline, isLoading, error] = useFetching(async () => {
        const response = await SubjectsService.getAll('HIGH');
        setListSubjects(response)
    })

    useEffect(() => {
        fetchDiscipline()
    }, [])
    const Item = ({item}) => (
        <Pressable style={styles.subject_item} onPress={() => changeSubject('detail', item)}>
            <Text>{item.title}</Text>
        </Pressable>
    )
    const OpenURLButton = ({url, children}) => {
        const handlePress = useCallback(async () => {
            const supported = await Linking.canOpenURL(url);
            await Linking.openURL(url);
        }, [url]);

        return <Text onPress={handlePress} style={styles.detail_btn}>{children}</Text>;
    };
    const DetailItem = ({item}) => (
        <View style={styles.main_page}>
            <TopMenu navigation={navigation}/>
            <View style={styles.title_main}>
                <Pressable style={styles.btn_block} onPress={() => changeSubject('main')}>
                    <Image source={require('../../image/icons/arrow_left.png')} style={styles.img_btn}/>
                    <Text style={styles.text_btn}>Назад</Text>
                </Pressable>
                <Text style={styles.title_text}>Предметы</Text>
            </View>
            <Text style={styles.detail_title}>{item.title}</Text>
            <Text style={styles.detail_description}>{item.description}</Text>
            {item.fipiLink? <OpenURLButton url={item.fipiLink}>Сайт ФИПИ</OpenURLButton>
                : <View></View>
            }
            {
                item.sdamGiaLink? <OpenURLButton url={item.sdamGiaLink}>Сайт Решу ЕГЭ</OpenURLButton>
                    : <View></View>
            }
        </View>
    )
    const changeSubject = (subject, item = 0) => {
        setOpenSubject(subject)
        setOpenDetail(item)
    }
    const page =
        {

            main:
                <View style={styles.main_page}>
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
                </View>,
            detail: <DetailItem item={openDetail}/>
        }

    return (
        page[openSubject]
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