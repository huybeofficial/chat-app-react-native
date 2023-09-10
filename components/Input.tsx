import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLOR from '../src/conts/colors'


const Input = ({label, iconName, error, password, onFocus=() => {}, ...props}) => {
    
    return (
        <View style = {styles.input}>
            <Text style = {styles.label}>
            {label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create ({
    input : {
        marginBottom: 20
    },
    label: {
        marginVertical: 5,
        fontSize:14,
        color: COLOR.gray
    }
})

export default Input