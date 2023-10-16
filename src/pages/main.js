import React, {useCallback, useState} from "react";
import {Text, View, StyleSheet, Image, Pressable, ScrollView, Switch} from "react-native";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import {TopMenu} from "../components/menu/top_menu/TopMenu";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

let arrDisplay = ['flex', 'none']
export const MainPage = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular':require('../../assets/fonts/Montserrat-Regular.ttf'), //font-weight 400
        'Montserrat-Medium':require('../../assets/fonts/Montserrat-Medium.ttf'), //font-weight 500
        'Montserrat-SemiBold':require('../../assets/fonts/Montserrat-SemiBold.ttf'), //font-weight 600
    })

    const insets = useSafeAreaInsets();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [openSub, setOpenSub] = useState(false)
    const clickDescription = ()=>{
        setOpenSub(!openSub)
        arrDisplay.reverse()
    }
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView onLayout={onLayoutRootView} style={styles.main_block}>
            <TopMenu navigation={navigation}/>
            <Text style={styles.title_page}>Главная</Text>
            <View style={styles.card}>
                <Image source={require('../image/for_pages/main_page/upload.png')} style={{marginBottom: 10, zIndex: 5, width: '100%'}}/>
                <View>
                    <View style={{...styles.description_block.title, display: arrDisplay[0]}}>
                        <Text style={styles.description_block.text_title}>У нас обновление!</Text>
                        <Text style={styles.description_block.text_title}>22.01.2023</Text>
                    </View>
                    <Text style={{...styles.description_block.text_description, display: arrDisplay[0]}}>Теперь есть бот для поступающих в СПО</Text>
                    <Pressable
                    onPress={clickDescription}
                    ><Text style={{...styles.description_block.btn, display: arrDisplay[0]}}>Подробнее</Text></Pressable>
                    <View style={{display: arrDisplay[1]}}>
                        <Text style={styles.description_block.text_description}>
                            Расширяемся для вас, и теперь у нас есть бот для поступающих в СРЕДНИЕ СПЕЦИАЛЬНЫЕ УЧЕБНЫЕ
                            ЗАВЕДЕНИЯ!{'\n'}
                            Что же вы найдете в боте?{'\n'}
                            - Удобный интерфейс{'\n'}
                            - Все колледжи и техникумы КРАЯ{'\n'}
                            - Репетиторы{'\n'}
                            - Ответы на часто задаваемые вопросы{'\n'}
                            - Наставничество{'\n'}
                            - Избранное{'\n'}
                            - Информация о предметах{'\n'}
                            Иначе говоря, ВСЁ, что необходимо знать, чтобы поступить, куда хочешь!{'\n'}
                        </Text>
                        <Pressable onPress={clickDescription}>
                            <Text  style={styles.description_block.btn}>Свернуть</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create(
    {
        main_block: {
            backgroundColor: '#F9F9F9',
            minHeight: '100%'
        },
        title_page: {
            fontSize: 16,
            color: '#341460',
            marginBottom: 10,
            textAlign: 'right',
            marginRight: 30,
            fontFamily: 'Montserrat-SemiBold'
        },
        card: {
            marginLeft: 27,
            marginRight: 27,
            marginBottom: 10,
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: '#FFFFFF',
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 10,
            elevation: 5,
            borderRadius: 10
        },
        description_block: {
            title: {
                flexDirection: 'row',
                justifyContent: 'space-between',
            },
            text_title: {
                fontSize: 14,
                color: '#341460',
                fontWeight: 500,
                marginBottom: 5,
                fontFamily: 'Montserrat-Medium'
            },
            text_description: {
                fontSize: 12,
                color: '#A0A3BD',
                marginBottom: 5,
                fontFamily: 'Montserrat-Regular'
            },
            btn: {
                textDecorationLine: 'underline',
                fontSize: 12,
                color: '#8E73B2',
                fontFamily: 'Montserrat-Regular'
            }
        }
    }
)