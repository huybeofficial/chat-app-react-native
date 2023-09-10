import { useEffect, useState } from "react"
import { SafeAreaView , View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView } from "react-native"
import axios from "axios"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { registerApi } from '../services/authentication'
import { Formik } from 'formik';
import * as Yup from 'yup';



const RegisterScreen = ({ navigation }) => { 

    const validation = Yup.object().shape({
        username: Yup.string().min(5, 'Tên người dùng phải chứa ít nhất 5 ký tự').required('Vui lòng nhập tên người dùng'),
        email: Yup.string().email('Địa chỉ email không hợp lệ').required('Vui lòng nhập địa chỉ email'),
        password: Yup.string().min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
        confirmedPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp').required('Vui lòng nhập lại mật khẩu'),
    })
    
    // const [ username, setUsername ] = useState<string>("")
    // const [ email, setEmail] = useState<string>("")
    // const [ password, setPassword ] = useState<string>("")
    // const [ confirmedPassword, setConfirmedPassword ] = useState<string>("")
    
    // const [usernameError, setUsernameError] = useState(true)
    // const [emailError, setEmailError] = useState(true)
    // const [passwordError, setPasswordError] = useState(true)
    
    // const verify = (username) => {
    //     const usernameFormat = /^[a-zA-Z\-]+$/
    //     if(usernameFormat.test(username)){
    //         return true
    //     }
    //     if (!username){
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
    //                 username, 
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
                <Text style={styles.mainText} >ĐĂNG KÝ</Text>
                <Text style={styles.descriptText} >
                    Tạo tài khoản để trò chuyện với bạn bè của bạn
                </Text>
                
                <Formik 
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmedPassword: '',
                }}
                validationSchema={validation}
                onSubmit={ async (values) => {
                    try {
                        const response = await registerApi({
                            username: values.username,
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
                        <TextInput
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        placeholder="Tên người dùng"
                        style={styles.input}
                        />
                        {touched.username && errors.username && (
                        <Text style={styles.error}>{errors.username}</Text>
                        )}

                        <TextInput
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        placeholder="Địa chỉ email"
                        style={styles.input}
                        />
                        {touched.email && errors.email && (
                        <Text style={styles.error}>{errors.email}</Text>
                        )}

                        <TextInput
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        placeholder="Nhập mật khẩu"
                        style={styles.input}
                        secureTextEntry
                        />
                        {touched.password && errors.password && (
                        <Text style={styles.error}>{errors.password}</Text>
                        )}

                        <TextInput
                        value={values.confirmedPassword}
                        onChangeText={handleChange('confirmedPassword')}
                        onBlur={handleBlur('confirmedPassword')}
                        placeholder="Nhập lại mật khẩu"
                        style={styles.input}
                        secureTextEntry
                        />
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
                        <View style={styles.another}>
                            <Text style={styles.another}> Đã có tài khoản?</Text>
                            <TouchableOpacity onPress={ () => {
                                navigation.navigate("LoginScreen")
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
        alignItems: "flex-end",
        width: "100%"
    },
    input: {
        borderWidth: 0.7,
        borderColor: "#999999",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        marginTop: 20,
        backgroundColor:"#f3f4fb"
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
    },
    error: {
    color:"red",
    alignItems: "flex-start"
    },
})
export default RegisterScreen