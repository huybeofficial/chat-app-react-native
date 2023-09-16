import React, {useEffect,useState } from "react"
import {Image, SafeAreaView , View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView } from "react-native"
import axios from "axios"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addTokenToAxios, getAccessToken, loginApi, setAccessToken } from '../services/authentication'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useForm } from 'react-hook-form';
import { validateEmail } from "../utils/validate"



const LoginScreen = ({ navigation }) => {
    const [ username, setUsername ] = useState<string>("")
    const [ email, setEmail ] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")
   
    const checkAuthenticated = async() => {
        //Check đăng nhập
        try {
           const accessToken = await getAccessToken()
           if(accessToken) {
               addTokenToAxios(accessToken)
               navigation.navigate("HomeScreen")
           }
       } catch(error) {
           console.log(error)
       }
   }

   useEffect(() => {
       checkAuthenticated()
   }, [])


   const login = async () => {
       if(!validateEmail(email)) {
           alert("Email không hợp lệ!")
       }
       try {
           const loginResponse = await loginApi({
               email,
               password
           })
           const {data} = loginResponse
           // alert("Đăng nhập thành công!")
           //Lưu token lại
           const result = await setAccessToken(data?.tokens?.access?.token)
           if(result) {
               alert("Đăng nhập thành công!")
               const accessToken = await getAccessToken()
               console.log(accessToken)
           }else {
               alert("Lỗi khi đăng nhập: Không thể lưu accesstoken")
           }
       } catch(err :any) {
           const {data} = err.response
           alert(data.message)
       }
   }

    // const onLogInPressed = async () => {
    //     // try {
    //     //     const respone = await loginApi({ username, password })
    //     //     console.log(respone.data)    
    //     // } catch(error : any) {
    //     //     if(error.response.data) {
    //     //         alert(`${error.response.data.code} : ${error.response.data.message}`)
    //     //     }
    //     // }
        
        
    //     loginApi({
    //         username, password
    //     }).then(response => {
    //         const {data} = response
    //         navigation.navigate("HomePageScreen")
    //     }).catch(error => {
    //         const responseData = error.response.data
    //         alert(responseData.message)
    //     }) 
    // }

    const validation = Yup.object().shape({
      //  username: Yup.string().min(5, 'Tên người dùng phải chứa ít nhất 5 ký tự').required('Vui lòng nhập tên người dùng'),
        email: Yup.string().email('Địa chỉ email không hợp lệ').required('Vui lòng nhập địa chỉ email'),
        password: Yup.string().min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
                
    })

    return (
        <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
        style={{backgroundColor: "#fff"}}>
            <View style={styles.container}>
                <Image style={styles.mainImage} source={ require('../assets/img/chat.png') } />
                
                <View style={styles.textHeader}>
                    <Text style={styles.mainText}>Chào mừng trở lại,</Text>
                    <Text style= {styles.descriptText} > Đăng nhập để tiếp tục </Text>
                </View>
                <Formik 
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={validation}
                onSubmit={ async (values) => {
                    try {
                        const response = await loginApi({
                            email: values.email,
                            password: values.password,
                        })
                        navigation.navigate("HomePageScreen")
                    }catch (error: any) {
                        const responseData = error.response.data
                        alert(responseData.message)
                    }
                }}
                >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

                    
                    <View style={styles.content}>
                            <View style={styles.inputContainer} >
                                <Ionicons name="mail-outline" size={20} color="#64b5f6" style={styles.inputIcon} />
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
                                <Ionicons name="lock-closed" size={20} color="#64b5f6" style={styles.inputIcon} />
                                <TextInput value={values.password} onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                placeholder="Nhập mật khẩu"
                                style={styles.input}
                                />
                            </View>
                                    {touched.password && errors.password && (
                                    <Text style={styles.error}>{errors.password}</Text>
                                    )}

                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.logInLabel}>ĐĂNG NHẬP</Text>
                            </TouchableOpacity >
                        </View>

                        {/* <View style={{marginVertical:15, flexDirection:"row", justifyContent: "center",alignItems:"center"}}>
                            <View style={styles.line}></View>
                            <Text style={{marginHorizontal: 5, fontWeight:"bold"}}>KHÁC</Text>
                            <View style={styles.line}></View>
                        </View> */}
                        <View style={styles.another}>
                        <Text style={styles.another}> Bạn chưa có tài khoản?</Text>
                        <TouchableOpacity onPress={ () => {
                            navigation.replace("RegisterScreen")
                        }}>
                            <Text style={styles.signUpLabel} >Đăng ký ngay</Text>
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
        marginTop: 15,
        flexDirection:"row"
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        width: "100%",
        marginVertical: 5,
        paddingLeft: 30,
       flexDirection: "column"
    },
    inputIcon:{
        marginTop: 10,
        position: "absolute"
    },
    buttons: {
        
        backgroundColor: "#2196f3",
        marginTop: 30,
        padding: 12,
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
        marginTop: 10,
        flexDirection: "row",
        fontSize: 17
    },
    signUpLabel: {
        margin: 10,
        color: "red",
        fontSize: 17,
        fontWeight:"bold"
    },
    error: {
        color: "red",
        
    }

})
export default LoginScreen