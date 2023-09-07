import react, { useState } from "react"
import { SafeAreaView , View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView } from "react-native"
import axios from "axios"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { registerApi } from '../services/authentication'
import { useForm } from 'react-hook-form';

const RegisterScreen = ({ navigation }) => { 
    
    const {register, handleSubmit} = useForm()
    const [ username, setUsername ] = useState<string>("")
    const [ email, setEmail] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")
    const [ rePassword, setRePassword ] = useState<string>("")
    
     
    const onSignUpPressed  = async() => {
        
        if (!password || !rePassword){
            alert("Mật khẩu không được để trống!")
        }
        if(password !== rePassword && rePassword) {
            alert("Mật khẩu không khớp!")
            return
        }
        
        // try {
            //     const {data} = await registerApi({
                //         username, 
                //         email, 
                //         password  
                //     })
                //     navigation.navigate("LoginScreen")
                // } catch(error) {
                    //     const message = error.response.data
                    //     alert(message)
                    // }
        registerApi({
            username, email, password
        }).then(response => {
            const {data} = response
            navigation.navigate("LoginScreen")
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
       {/*  <KeyboardAvoidingView>
        <ScrollView> */}
        <View style={styles.container}>

            <Text style={styles.mainText} >ĐĂNG KÝ</Text>
            <Text style={styles.descriptText} >
                Tạo tài khoản để trò chuyện với bạn bè của bạn
            </Text>

            <View style={styles.content}>
            <TextInput value={username} onChangeText={(value) => {
                    setUsername(value)
                }} placeholder="Tên người dùng" style={styles.input} />

                <TextInput value={email} onChangeText={(value) => {
                    setEmail(value)
                }} placeholder="Địa chỉ email" style={styles.input}
                keyboardType="email-address" />

                <TextInput value={password} onChangeText={(value) => {
                    setPassword(value)
                }} placeholder="Nhập mật khẩu" style={styles.input} secureTextEntry />

                <TextInput value={rePassword} onChangeText={(value) => {
                    setRePassword(value)
                }} placeholder="Nhập lại mật khẩu" style={styles.input} secureTextEntry />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={onSignUpPressed }>
                    <Text style={styles.signUpLabel}>ĐĂNG KÝ</Text>
                </TouchableOpacity >
            </View>
            <View style={styles.another}>
                <Text style={styles.another}> Đã có tài khoản?</Text>
                <TouchableOpacity onPress={ () => {
                    navigation.navigate("LoginScreen")
                }}>
                    <Text style={styles.loginLabel} >Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
        {/* </ScrollView>
        </KeyboardAvoidingView> */}
         </KeyboardAwareScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 20
    },
    mainText: {
        marginTop: 20,
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
    signUpLabel: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16
    },
    another:{
        flexDirection: "row",
        fontSize: 17
    },
    loginLabel: {
        color: "#746bf9",
        marginLeft: 5,
        fontSize: 17,
        fontWeight:"700"
    }
})
export default RegisterScreen