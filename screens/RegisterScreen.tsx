import React, { useState } from "react"
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, Platform } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { registerApi } from '../services/authentication'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Formik } from "formik";
import * as Yup from "yup";


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
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            style={{ backgroundColor: "#fff" }}>
            <Formik initialValues={{ email: "", username: "", password: "", confirmPassword: "" }}
                validationSchema={validation}
                onSubmit={(values, { resetForm }) => {
                    // todo
                    onSignUpPressed(values.email, values.password, values.username)
                    resetForm()
                }}>
                {formikProps => (

                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Image style={styles.mainImage} source={require('../assets/img/chat.png')} />
                            <Text style={styles.mainText}>Xin chào,</Text>
                            <Text style={styles.descriptText} > Đăng ký để tiếp tục </Text>
                        </View>


                        <View style={styles.content}>

                            <View style={styles.inputContainer} >
                                <Ionicons name="person-outline" size={20} color="#6ce31e" style={styles.inputIcon} />
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
                            {formikProps.touched.password && formikProps.errors.password ? (
                                <Text style={styles.error}>{formikProps.errors.password}</Text>
                            ) : null}


                            <View style={styles.inputContainer} >
                                <Ionicons name="lock-closed" size={20} color="#6ce31e" style={styles.inputIcon} />
                                <TextInput
                                    // value={password}
                                    placeholder="Nhập lại mật khẩu"
                                    style={styles.input}
                                    secureTextEntry={visible}
                                    onChangeText={formikProps.handleChange("confirmPassword")}
                                    onBlur={formikProps.handleBlur("confirmPassword")}
                                    value={formikProps.values.confirmPassword}
                                />
                                <TouchableOpacity onPress={() => {
                                    setVisible1(!visible1)
                                    setShowConfirmPassword(!showConfirmPassword)
                                }}>
                                    <Ionicons name={showConfirmPassword === false ? "eye-off-outline" : "eye-outline"} size={25} color="#000" style={{ position: "absolute", right: 5, paddingTop: 5 }} />
                                </TouchableOpacity>
                            </View>
                            {formikProps.touched.confirmPassword && formikProps.errors.confirmPassword ? (
                                <Text style={styles.error}>{formikProps.errors.confirmPassword}</Text>
                            ) : null}

                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <View style={styles.buttons}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={formikProps.handleSubmit}
                                >
                                    <Text style={styles.signUpLabel}>ĐĂNG KÝ</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.another}>
                                <Text style={styles.another}> Đã có tài khoản?</Text>
                                <TouchableOpacity onPress={() => {
                                    navigation.replace("LoginScreen")
                                }}>
                                    <Text style={styles.logInLabel} >Đăng nhập</Text>
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
        marginTop: 10,
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
        borderRadius: 50
    },
    button: {
        width: "100%",
        alignItems: "center",
    },
    another: {
        marginTop: 10,
        flexDirection: "row",
        fontSize: 17
    },
    signUpLabel: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16
    },
    logInLabel: {
        margin: 10,
        color: "red",
        fontSize: 17,
        fontWeight: "bold"
    },
    error: {
        color: "red",
        marginBottom: 10
    }

})
export default RegisterScreen