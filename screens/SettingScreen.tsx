import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SettingScreen = () => {
    return (
        <View style={styles.container}>
            <Text>SettingScreen</Text>
            <Text></Text>
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