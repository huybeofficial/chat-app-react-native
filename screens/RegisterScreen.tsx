import React, { useState } from "react"
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, Platform } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { registerApi } from '../services/authentication'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import Background from "../component/Background";
import { LinearGradient } from "expo-linear-gradient"
import BackButton from "../component/BackButton";
import { getStatusBarHeight } from 'react-native-status-bar-height'


const RegisterScreen = ({ navigation }) => {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [visible, setVisible] = useState(true)
    const [visible1, setVisible1] = useState(true)

    const validation = Yup.object().shape({
        username: Yup.string().required("Nhập cái tên vào."),
        email: Yup.string().email("Địa chỉ email không hợp lệ.").required("Vui lòng nhập địa chỉ email."),
        password: Yup.string().required("Vui lòng nhập mật khẩu."),
        confirmPassword: Yup.string().required("Vui lòng nhập lại mật khẩu.")
    });

    const onSignUpPressed = async (username, email, password) => {

        try {
            const signupResponse = await registerApi({
                "username": username,
                "email": email,
                "password": password
            })
            const { data } = signupResponse
            console.log(data)
            alert("Đăng ký thành công!")
            setTimeout(() => {
                navigation.replace("LoginScreen")
            }, 2000)
        } catch (err) {
            const { data } = err.response
            alert(data.message)
        }
    }
    return (
        <Background>
            <TouchableOpacity onPress={() => {
                navigation.goBack()
            }} style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../assets/img/arrow_back.png')}
                />
            </TouchableOpacity>
            <Formik initialValues={{ email: "", username: "", password: "", confirmPassword: "" }}
                validationSchema={validation}
                onSubmit={(values, { resetForm }) => {
                    // todo
                    onSignUpPressed(values.email, values.password, values.username)
                    resetForm()
                }}>
                {formikProps => (

                    <View>
                        <View style={styles.header}>
                            <Text numberOfLines={1} style={styles.mainText}>Đăng ký</Text>
                        </View>
                        <View style={styles.inputContainer}>

                            <View style={styles.inputItem} >
                                <Ionicons name="person-outline" size={20} color="#448976" style={styles.inputIcon} />
                                <TextInput
                                    value={formikProps.values.username}
                                    placeholder="Nhập tên"
                                    style={styles.input}
                                    onChangeText={formikProps.handleChange("username")}
                                    onBlur={formikProps.handleBlur("username")}
                                />
                            </View>
                            {formikProps.touched.username && formikProps.errors.username ? (
                                <Text style={styles.error}>{formikProps.errors.username}</Text>
                            ) : null}

                            <View style={styles.inputItem} >
                                <Ionicons name="mail-outline" size={20} color="#448976" style={styles.inputIcon} />
                                <TextInput
                                    // value={email}
                                    keyboardType="email-address"
                                    placeholder="Nhập địa chỉ Email"
                                    style={styles.input}
                                    onChangeText={formikProps.handleChange("email")}
                                    onBlur={formikProps.handleBlur("email")}
                                    value={formikProps.values.email}
                                />
                            </View>
                            {formikProps.touched.email && formikProps.errors.email ? (
                                <Text style={styles.error}>{formikProps.errors.email}</Text>
                            ) : null}
                            <View style={styles.inputItem} >
                                <Ionicons name="lock-closed" size={20} color="#448976" style={styles.inputIcon} />
                                <TextInput
                                    // value={password}
                                    placeholder="Nhập mật khẩu"
                                    style={styles.input}
                                    secureTextEntry={visible}
                                    onChangeText={formikProps.handleChange("password")}
                                    onBlur={formikProps.handleBlur("password")}
                                    value={formikProps.values.password}
                                />
                                <TouchableOpacity onPress={() => {
                                    setVisible(!visible)
                                    setShowPassword(!showPassword)
                                }}>
                                    <Ionicons name={showPassword === false ? "eye-off-outline" : "eye-outline"} size={25} color="#000" style={{ position: "absolute", right: 5, paddingTop: 5, color: "#448976" }} />
                                </TouchableOpacity>
                            </View>
                            {formikProps.touched.password && formikProps.errors.password ? (
                                <Text style={styles.error}>{formikProps.errors.password}</Text>
                            ) : null}


                            <View style={styles.inputItem} >
                                <Ionicons name="lock-closed" size={20} color="#448976" style={styles.inputIcon} />
                                <TextInput
                                    // value={password}
                                    placeholder="Nhập lại mật khẩu"
                                    style={styles.input}
                                    secureTextEntry={visible1}
                                    onChangeText={formikProps.handleChange("confirmPassword")}
                                    onBlur={formikProps.handleBlur("confirmPassword")}
                                    value={formikProps.values.confirmPassword}
                                />
                                <TouchableOpacity onPress={() => {
                                    setVisible1(!visible1)
                                    setShowConfirmPassword(!showConfirmPassword)
                                }}>
                                    <Ionicons name={showConfirmPassword === false ? "eye-off-outline" : "eye-outline"} size={25} color="#000" style={{ position: "absolute", right: 5, paddingTop: 5, color: "#62825f" }} />
                                </TouchableOpacity>
                            </View>
                            {formikProps.touched.confirmPassword && formikProps.errors.confirmPassword ? (
                                <Text style={styles.error}>{formikProps.errors.confirmPassword}</Text>
                            ) : null}

                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={formikProps.handleSubmit}>
                                <LinearGradient
                                    colors={['#60711F', '#FA9015']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.button}
                                >
                                    <Text style={styles.signUpLabel}>ĐĂNG KÝ</Text>
                                </LinearGradient>
                            </TouchableOpacity >
                            <View style={styles.another}>
                                <Text style={{ fontSize: 17 }}> Đã có tài khoản?</Text>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("LoginScreen")
                                }}>
                                    <Text style={styles.loginLabel} >Đăng nhập</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </Formik>
            <Toast />
        </Background>
    )
}



const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: 4,
    },
    image: {
        width: 24,
        height: 24,
    },
    header: {
        fontSize: 21,
        marginTop: 150,
        fontWeight: 'bold',
        paddingVertical: 12,
        alignItems: "center"
    },
    mainText: {
        fontSize: 35,
        fontWeight: "bold",
    },
    descriptText: {
        // textAlign: "center",
        fontSize: 20,
        color: "#94979c",
        fontWeight: "bold"
    },
    inputContainer: {
        margin: 20
    },
    inputItem: {
        marginTop: 20,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    },
    input: {
        width: "100%",
        marginVertical: 5,
        paddingLeft: 30,
        flexDirection: "column"
    },
    inputIcon: {
        marginTop: 10,
        position: "absolute"
    },
    button: {
        marginTop: 20,
        backgroundColor: "",
        width: 250,
        borderRadius: 50,
        padding: 10
    },
    another: {
        marginTop: 10,
        flexDirection: "row",
        fontSize: 17,
        alignItems: "center",
        alignSelf: "flex-end"
    },
    signUpLabel: {
        color: "#fff",
        fontWeight: "700",
        textAlign: "center",
        fontSize: 18
    },
    loginLabel: {
        margin: 10,
        color: "#428DFE",
        fontSize: 17,
        fontWeight: "bold"
    },
    error: {
        color: "red",

    }

})
export default RegisterScreen