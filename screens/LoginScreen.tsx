import React, { useState } from "react"
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from '@expo/vector-icons/Ionicons'
import { loginApi, setAccessToken } from "../services/authentication"
import { Formik } from "formik";
import * as Yup from "yup";

const LoginScreen = ({ navigation }) => {

    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)

    const validation = Yup.object().shape({
        email: Yup.string().email("Địa chỉ email không hợp lệ.").required("Vui lòng nhập địa chỉ email."),
        password: Yup.string().required("Vui lòng nhập mật khẩu."),
    });


    const onLoginPressed = async (email, password) => {
        try {
            const loginResponse = await loginApi({
                "email": email,
                "password": password
            })
            const { data } = loginResponse
            console.log("------", data)
            //Lưu token lại
            const result = await setAccessToken(data?.token)
            console.log("-----", result)
            if (result) {

                navigation.replace("HomeScreen")

            } else {
                alert("Thông tin không đúng!")
            }
        } catch (err) {
            const { data } = err.response
            alert(data.message)
        }
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            style={{ backgroundColor: "#fff" }}>
            <Formik initialValues={{ email: "", password: "" }}
                validationSchema={validation}
                onSubmit={(values, { resetForm }) => {
                    // todo
                    onLoginPressed(values.email, values.password)

                    resetForm()
                }}>
                {formikProps => (

                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Image style={styles.mainImage} source={require('../assets/img/chat.png')} />
                            <Text style={styles.mainText}>Xin chào,</Text>
                            <Text style={styles.descriptText} > Đăng nhập để tiếp tục </Text>
                        </View>

                        <View style={styles.content}>

                            <View style={styles.inputContainer} >
                                <Ionicons name="mail-outline" size={20} color="#6ce31e" style={styles.inputIcon} />
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
                            {/* {emailError ? <Text style={styles.error}>{emailError}</Text> : null} */}

                            <View style={styles.inputContainer} >
                                <Ionicons name="lock-closed" size={20} color="#6ce31e" style={styles.inputIcon} />
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
                                    <Ionicons name={showPassword === false ? "eye-off-outline" : "eye-outline"} size={25} color="#000" style={{ position: "absolute", right: 5, paddingTop: 5 }} />
                                </TouchableOpacity>
                            </View>
                            {/* {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null} */}
                            {formikProps.touched.password && formikProps.errors.password ? (
                                <Text style={styles.error}>{formikProps.errors.password}</Text>
                            ) : null}
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <View style={styles.buttons}>
                                <TouchableOpacity style={styles.button} onPress={formikProps.handleSubmit}>
                                    <Text style={styles.logInLabel}>ĐĂNG NHẬP</Text>
                                </TouchableOpacity >
                            </View>

                            <View style={styles.another}>
                                <Text style={styles.another}> Bạn chưa có tài khoản?</Text>
                                <TouchableOpacity onPress={() => {
                                    navigation.replace("RegisterScreen")
                                }}>
                                    <Text style={styles.signUpLabel} >Đăng ký ngay</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </Formik>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    mainImage: {
        width: 100,
        height: 100,
    },
    container: {
        flex: 1,
        margin: 5,
        backgroundColor: "#fff",
        padding: 20
    },
    header: {
        marginBottom: 30
    },
    mainText: {
        fontSize: 35,
        fontWeight: "bold"
    },
    descriptText: {
        // textAlign: "center",
        fontSize: 20,
        color: "#94979c",
        fontWeight: "bold"
    },
    content: {
        marginVertical: 10,
        alignItems: "flex-end",
        width: "100%",
    },
    inputContainer: {
        marginTop: 15,
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
    buttons: {

        backgroundColor: "#50b30e",
        marginTop: 30,
        padding: 12,
        width: "100%",
        borderRadius: 5
    },
    button: {
        width: "100%",
        alignItems: "center",
        borderRadius: 5,
    },
    another: {
        marginTop: 10,
        flexDirection: "row",
        fontSize: 17
    },
    logInLabel: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16
    },
    signUpLabel: {
        margin: 10,
        color: "red",
        fontSize: 17,
        fontWeight: "bold"
    },
    error: {
        color: "red",

    }

})
export default LoginScreen