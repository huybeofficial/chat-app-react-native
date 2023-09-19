import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react'

import { addTokenToAxios, getAccessToken, } from "../services/authentication"

const StartScreen = ({ navigation }) => {


    const checkAuthenticated = async () => {
        //Check đăng nhập
        try {
            const accessToken = await getAccessToken()
            if (accessToken) {
                addTokenToAxios(accessToken)
                navigation.navigate("HomeScreen")
                console.log(accessToken)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (!checkAuthenticated()) {
                navigation.replace("LoginScreen")
            }
        }, 2000)

    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.mainContent} >
                <Image style={styles.mainImage} source={require('../assets//img/chat.png')} />
                {<ActivityIndicator size={"large"} color={'#50b30e'} />}
                <Text style={styles.mainText}>CHAT APP</Text>
            </View>
        </View>
    );

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 25
    },
    mainContent: {
        alignItems: "center"
    },
    mainImage: {
        width: 150,
        height: 150
    },
    mainText: {
        fontSize: 22,
        fontWeight: "900",
        marginVertical: 20,
        color: "#6ce31e"
    },
})
export default StartScreen
