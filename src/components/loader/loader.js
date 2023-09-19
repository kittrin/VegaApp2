import {ActivityIndicator, StyleSheet, View} from "react-native";

export const Loader = ()=>{
    return(
        <View style={styles.content}>
            <ActivityIndicator size='large' color='#5F3C8F'/>
        </View>
    )
}
const styles = StyleSheet.create({
    content: {
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        paddingTop: '40%',
        width: '100%',
        height: '100%'
    },
});
