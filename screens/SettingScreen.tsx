import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { deleteAccessToken, removeTokenFromAxios } from '../services/authentication'

const SettingScreen = ({ navigation }) => {

    const logout = async () => {
        try {
            const accessToken = await deleteAccessToken()
            if (accessToken) {
                removeTokenFromAxios()
                navigation.navigate("LoginScreen")
                console.log(accessToken)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text>SettingScreen</Text>
            <Text></Text>

            <TouchableOpacity onPress={logout}>
                <Text>Log out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})