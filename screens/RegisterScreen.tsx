import React, { useState } from "react"
import {Image, SafeAreaView , View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView } from "react-native"
import axios from "axios"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { registerApi } from '../services/authentication'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Ionicons from '@expo/vector-icons/Ionicons'




const RegisterScreen = ({ navigation }) => { 

    const validation = Yup.object().shape({
        name: Yup.string().required('Vui lòng nhập tên của bạn'),
        email: Yup.string().email('Địa chỉ email không hợp lệ').required('Vui lòng nhập địa chỉ email'),
        password: Yup.string().min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
        confirmedPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp').required('Vui lòng nhập lại mật khẩu'),
    })
    
    // const [ name, setname ] = useState<string>("")
    // const [ email, setEmail] = useState<string>("")
    // const [ password, setPassword ] = useState<string>("")
    // const [ confirmedPassword, setConfirmedPassword ] = useState<string>("")
    
    // const [nameError, setnameError] = useState(true)
    // const [emailError, setEmailError] = useState(true)
    // const [passwordError, setPasswordError] = useState(true)
    
    // const verify = (name) => {
    //     const nameFormat = /^[a-zA-Z\-]+$/
    //     if(nameFormat.test(name)){
    //         return true
    //     }
    //     if (!name){
    //         return false
    //     }
    // }

    // const verifyEmail =(email) => {
    //     const mailFormat =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //     if(mailFormat.test(email)){
    //         return true
    //     }
    //     return false
    // }

    // const onSignUpPressed  = async() => {
        
        
    //     if(password !== confirmedPassword && confirmedPassword) {
    //         alert("Mật khẩu không khớp!")
    //         return
    //     }
        
    //     try {
    //         const response = await registerApi({
    //                 name, 
    //                 email, 
    //                 password  
    //             })
    //             navigation.navigate("LoginScreen")
    //         } catch(error) {
    //                 const responseData = error.response.data
    //                 alert(responseData.message)
    //             }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')} 
            style={{backgroundColor: "#fff"}}>
            <View style = {styles.container}>
                <Image style={styles.mainImage} source={ require('../assets/icon/chat.png') } />
                <View style={styles.textHeader}>
                    <Text style={styles.mainText} >Chào mừng trở lại,</Text>
                    <Text style={styles.descriptText} > Đăng ký để tiếp tục </Text>
                </View>
                
                <Formik 
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    confirmedPassword: '',
                }}
                validationSchema={validation}
                onSubmit={ async (values) => {
                    try {
                        const response = await registerApi({
                            name: values.name,
                            password: values.password,
                            email: values.email
                        })
                        navigation.navigate("LoginScreen")
                    }catch (error) {
                        const responseData = error.response.data
                        alert(responseData.message)
                    }
                }}
                >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.content}>
                            <View style={styles.inputContainer} >
                                <Ionicons name="person-outline" size={20} color="gray" style={styles.inputIcon} />
                                <TextInput
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                placeholder="Tên"
                                style={styles.input}
                                />
                            </View>
                                {touched.name && errors.name && (
                                <Text style={styles.error}>{errors.name}</Text>
                                )}

                            <View style={styles.inputContainer} >
                                <Ionicons name="mail-outline" size={20} color="gray" style={styles.inputIcon} />
                                <TextInput value={values.email} onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                placeholder="Nhập địa chỉ Email"
                                style={styles.input}
                                />
                            </View>
                                {touched.email && errors.email && (
                                <Text style={styles.error}>{errors.email}</Text>
                                )}
                        

                            <View style={styles.inputContainer} >
                                <Ionicons name="lock-closed" size={20} color="gray" style={styles.inputIcon} />
                                <TextInput value={values.password} onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                placeholder="Nhập mật khẩu"
                                style={styles.input}
                                />
                            </View>
                                    {touched.password && errors.password && (
                                    <Text style={styles.error}>{errors.password}</Text>
                                    )}
                            <View style={styles.inputContainer} >
                                <Ionicons name="lock-closed" size={20} color="gray" style={styles.inputIcon} />
                                <TextInput
                                value={values.confirmedPassword}
                                onChangeText={handleChange('confirmedPassword')}
                                onBlur={handleBlur('confirmedPassword')}
                                placeholder="Nhập lại mật khẩu"
                                style={styles.input}
                                secureTextEntry
                                />
                            </View>
                                {touched.confirmedPassword && errors.confirmedPassword && (
                                <Text style={styles.error}>{errors.confirmedPassword}</Text>
                                )}
                        <View style={styles.buttons}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={handleSubmit}
                            >
                            <Text style={styles.signUpLabel}>ĐĂNG KÝ</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{marginVertical:15, flexDirection:"row", justifyContent: "center",alignItems:"center"}}>
                            <View style={styles.line}></View>
                            <Text style={{marginHorizontal: 5, fontWeight:"bold"}}>KHÁC</Text>
                            <View style={styles.line}></View>
                        </View> */}
                        <View style={styles.another}>
                            <Text style={styles.another}> Đã có tài khoản?</Text>
                            <TouchableOpacity onPress={ () => {
                                navigation.replace("LoginScreen")
                            }}>
                                <Text style={styles.loginLabel} >Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                </Formik>
            </View>
        </KeyboardAwareScrollView>
    )
}



const styles = StyleSheet.create({
    mainImage: {
        width:70,
        height:70,
    },
    container: {
        flex: 1,
        margin:5,
        backgroundColor: "#fff",
        alignItems: "flex-start",
        padding: 20
    },
    textHeader:{
        marginVertical:40
    },
    mainText: {
        fontSize: 25,
        fontWeight: "bold"
    },
    descriptText: {
       // textAlign: "center",
        fontSize: 15,
        color: "#94979c",
        fontWeight:"bold"
    },
    content: {
       alignItems: "flex-end",
        width: "100%",
    },
    inputContainer:{
        marginTop: 10,
        flexDirection:"row"
    },
    input: {
        // borderWidth: 0.7,
        borderBottomWidth: 0.7,
        borderBottomColor: "gray",
        width: "100%",
        marginVertical: 15,
        paddingLeft: 30,
       flexDirection: "column"
    },
    inputIcon:{
        marginTop:18,
        position: "absolute"
    },
    buttons: {
        
        backgroundColor: "#2196f3",
        marginTop: 20,
        padding: 12,
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
    line:{
        height:1,
        width:30,
        backgroundColor : "#adb1b8"
    },
    another:{
        marginTop: 5,
        flexDirection: "row",
        fontSize: 17
    },
    loginLabel: {
        margin: 5,
        color: "red",
        fontSize: 17,
        fontWeight:"bold"
    },
    error: {
        color: "red",
        
    }

})
export default RegisterScreen