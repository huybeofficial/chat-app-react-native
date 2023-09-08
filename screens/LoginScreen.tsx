import react, { useState } from "react"
import {Image, SafeAreaView , View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView } from "react-native"
import axios from "axios"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { loginApi } from '../services/authentication'

import { useForm } from 'react-hook-form';

const LoginScreen = ({ navigation }) => { 
    const [ username, setUsername ] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")
   

    const onLogInPressed = async () => {
        // try {
        //     const respone = await loginApi({ username, password })
        //     console.log(respone.data)    
        // } catch(error : any) {
        //     if(error.response.data) {
        //         alert(`${error.response.data.code} : ${error.response.data.message}`)
        //     }
        // }
        
        loginApi({
            username, password
        }).then(response => {
            const {data} = response
            navigation.navigate("HomePage")
        }).catch(error => {
            const responseData = error.response.data
            alert(responseData.message)
        }) 
    }
    return (
        <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
        style={{backgroundColor: "#fff"}}>
            <View style={styles.container}>
                <Image style={styles.mainImage} source={ require('../assets/icon/key-login.png') } />

                <Text style={styles.mainText}>ĐĂNG NHẬP</Text>
                <View style={styles.content}>
                
                    <TextInput value={username} onChangeText={(value: any) => {
                        setUsername(value)
                    }} placeholder="Tên người dùng" style={styles.input} />

                    <TextInput value={password} onChangeText={(value: any) => {
                        setPassword(value)
                    }} placeholder="Nhập mật khẩu" style={styles.input} secureTextEntry />
                    
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={onLogInPressed}>
                        <Text style={styles.logInLabel}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity >
                </View>
                <View style={styles.another}>
                <Text style={styles.another}> Chưa có tài khoản?</Text>
                <TouchableOpacity onPress={ () => {
                    navigation.navigate("RegisterScreen")
                }}>
                    <Text style={styles.signUpLabel} >Đăng ký ngay</Text>
                </TouchableOpacity>
            </View>
            </View>
            </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    mainImage: {
        width:150,
        height:150,
      },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 20
    },
    mainText: {
        marginVertical: 15,
        fontSize: 35,
        fontWeight: "900"
    },
    descriptText: {
        textAlign: "center",
        fontSize: 20,
        paddingVertical: 15
    },
    content: {
        alignItems: "center",
        width: "100%"
    },
    input: {
        borderWidth: 0.7,
        borderColor: "#999999",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        margin: 10
    },
    label: {
        marginVertical: 10
    },
    buttons: {
        backgroundColor: "#746bf9",
        marginVertical: 20,
        padding: 15,
        width:"100%",
        borderRadius: 5
    },
    button: {
        width: "100%",
        alignItems: "center",
        borderRadius: 5,
    },
    logInLabel: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16
    },
    another:{
        flexDirection: "row",
        fontSize: 17
    },
    signUpLabel: {
        color: "#746bf9",
        marginLeft: 5,
        fontSize: 17,
        fontWeight:"700"
    },

})
export default LoginScreen