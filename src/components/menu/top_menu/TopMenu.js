import React, {useState} from "react";
import {Modal, View, StyleSheet, Text, Pressable, Switch, Image} from "react-native";
import {useFonts} from 'expo-font';

export const TopMenu = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'CenturyGothic': require('../../../../assets/fonts/CenturyGothic.ttf'),
        'CenturyGothic-Bold': require('../../../../assets/fonts/CenturyGothic-Bold.ttf')
    })
    const [openMenu, setOpenMenu] = useState(false)
    return (
        <View style={styles.block_menu}>
            <Modal
                animationType='fade'
                visible={openMenu}
                transparent={true}
                onRequestClose={() => setOpenMenu(!openMenu)}
            >
                <View style={styles.top_menu}>
                    <Pressable style={styles.firstLi} onPress={() => setOpenMenu(!openMenu)}>
                        <Text style={styles.firstLi.li}
                              onPress={() => {
                                  navigation.navigate('main')
                                  setOpenMenu(false)
                              }}>Главная</Text>
                        <Image source={require('../../../image/icons/cross.png')}
                               style={{width: 18, height: 18}}
                        />
                    </Pressable>
                    <Text style={styles.li} onPress={() => {
                        navigation.navigate('subjects')
                        setOpenMenu(false)
                    }}>Предметы</Text>
                    <Text style={styles.li}
                          onPress={() => navigation.navigate('specialties')}>Специальности</Text>
                    <Text style={styles.li}
                          onPress={() => navigation.navigate('que-tutor-1')}>Подготовка к экзаменам</Text>
                    <Text style={styles.li}
                          onPress={() => {
                              navigation.navigate('cities-with-universities')
                          }}
                    >Университеты</Text>
                    {/*<Text style={styles.li}>Тесты</Text>*/}
                    {/*<Text style={styles.li}>О нас</Text>*/}
                    {/*<Text style={styles.li} onPress={()=>navigation.navigate('auth')}>*/}
                    {/*    Авторизация*/}
                    {/*</Text>*/}
                    <Text style={styles.li} onPress={() => navigation.navigate('faq')}>
                        FAQ
                    </Text>
                </View>
            </Modal>
            <View style={styles.blockBtn}>
                <Pressable
                    onPress={() => setOpenMenu(!openMenu)}
                    style={styles.btnOpenMenu}
                >
                    <Image source={require('../../../image/icons/menu_top_button.png')}/>
                </Pressable>
                <Pressable style={styles.btnOpenMenu}>
                    <Image source={require('../../../image/icons/menu_fav_button.png')}/>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    block_menu: {
        marginTop: 20,
        backgroundColor: '#F9F9F9'
    },
    openMenuBlock: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: -1,
        backgroundColor: '#F9F9F9'
    },

    top_menu: {
        paddingTop: 45,
        paddingHorizontal: 50,
        paddingBottom: 67,
        backgroundColor: '#341460',
        borderBottomRightRadius: 300
    },
    firstLi: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        alignItems: 'center',
        marginBottom: 25,
        li: {
            fontSize: 18,
            color: '#FFFBFB',
            fontFamily: 'CenturyGothic-Bold'

        }
    },
    li: {
        fontSize: 18,
        color: '#FFFBFB',
        marginBottom: 25,
        fontFamily: 'CenturyGothic-Bold'
    },
    blockBtn: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginBottom: 15
    },
    btnOpenMenu: {
        width: 50,
        height: 50,
        paddingVertical: 14,
        paddingHorizontal: 14,
        backgroundColor: '#ffffff',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 10,
        elevation: 5,
        marginLeft: 30,
        marginTop: 15,
        borderRadius: 15
    }

})