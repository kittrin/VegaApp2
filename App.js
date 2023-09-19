import React from "react";
import { StyleSheet} from 'react-native';
import {MainPage} from "./src/pages/main";
import {List_objects} from "./src/pages/subjects/subjects.js";
import {List_cities_of_universities} from "./src/pages/university/list_cities_of_universities";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Detail_university} from "./src/pages/university/detail_university";
import {List_universities} from "./src/pages/university/list_universities";
import {Provider} from "react-redux";
import {store} from "./src/store";
import {Auth} from "./src/pages/profile/Auth";
import {ListHighSpecialities} from "./src/pages/university/listHighSpecialities";
import {DetailHighSpecialties} from "./src/pages/university/detailHighSpecialties";
import {QueTutor} from "./src/pages/tutors/queTutor";
import {QueTutor2} from "./src/pages/tutors/queTutor2";
import {OnlineSchool_List} from "./src/pages/tutors/onlineSchool_List";
import {OnlineSchool_detail} from "./src/pages/tutors/onlineSchool_detail";
import {ListSubjectTutor} from "./src/pages/tutors/listSubjectTutor";
import {CityTutors} from "./src/pages/tutors/cityTutors";
import {FaqList} from "./src/pages/FAQ/faq-list";
import {FaqDetail} from "./src/pages/FAQ/faq-detail";
import {SpecialtiesList} from "./src/pages/specialties/specialtiesList";
import {SpecialtiesDetail} from "./src/pages/specialties/specialtiesDetail";
import {DistrictCity} from "./src/pages/tutors/districtCity";
import {OfflineTutors} from "./src/pages/tutors/offlineTutors";
import {OnlineTutors} from "./src/pages/tutors/onlineTutors";
import {DetailTutor} from "./src/pages/tutors/detailTutor";

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerShown: false
                    }}
                >
                    <Stack.Screen name='main' component={MainPage}/>
                    <Stack.Screen name='subjects' component={List_objects}/>
                    <Stack.Screen name='cities-with-universities' component={List_cities_of_universities}/>
                    <Stack.Screen name='list_universities' component={List_universities}/>
                    <Stack.Screen name='detail-university' component={Detail_university}/>
                    <Stack.Screen name='list-high-specialties-by-university' component={ListHighSpecialities}/>
                    <Stack.Screen name='detail-high-specialty' component={DetailHighSpecialties}/>
                    <Stack.Screen name='que-tutor-1' component={QueTutor}/>
                    <Stack.Screen name='que-tutor-2' component={QueTutor2}/>
                    <Stack.Screen name='list-online-school' component={OnlineSchool_List}/>
                    <Stack.Screen name='detail-online-school' component={OnlineSchool_detail}/>
                    <Stack.Screen name='tutor/subjects' component={ListSubjectTutor}/>
                    <Stack.Screen name='tutor/city' component={CityTutors}/>
                    <Stack.Screen name='faq' component={FaqList}/>
                    <Stack.Screen name='faq/detail' component={FaqDetail}/>
                    <Stack.Screen name='specialties' component={SpecialtiesList}/>
                    <Stack.Screen name='specialties/detail' component={SpecialtiesDetail}/>
                    <Stack.Screen name='tutor/city/district' component={DistrictCity}/>
                    <Stack.Screen name='onlineTutors'  component={OnlineTutors}/>
                    <Stack.Screen name='offlineTutors' component={OfflineTutors}/>
                    <Stack.Screen name='detail-tutor' component={DetailTutor}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: 20,
    }
});
