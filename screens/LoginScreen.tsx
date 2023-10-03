import React, { useState, useEffect } from "react"
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, ImageBackground, } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from '@expo/vector-icons/Ionicons'
import { addTokenToAxios, getAccessToken, loginApi, setAccessToken } from "../services/authentication"
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { LinearGradient } from 'expo-linear-gradient';
import Background from "../component/Background";
import { showToast } from "../component/showToast";

const LoginScreen = ({ navigation }) => {

    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)

    const validation = Yup.object().shape({
        email: Yup.string().email("Địa chỉ email không hợp lệ.").required("Vui lòng nhập địa chỉ email."),
        password: Yup.string().required("Vui lòng nhập mật khẩu."),
    });

    const checkAuthenticated = async () => {
        //Check đăng nhập
        try {
            const accessToken = await getAccessToken()
            if (accessToken) {
                addTokenToAxios(accessToken)
                navigation.navigate("HomeScreen")
                console.log(accessToken)
            }
        } catch (error) {
            console.log(error)
        }
    }

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

                navigation.replace("HomeTabs")

            } else {
                showToast("error", "Thông tin không đúng!")
            }
        } catch (err) {
            const { data } = err.response
            alert(data.message)
        }
    }

    useEffect(() => {
        // checkAuthenticated()
    }, [])

    // return (
    return (
        <Background>

            <Formik initialValues={{ email: "", password: "" }}
                validationSchema={validation}
                onSubmit={(values, { resetForm }) => {
                    // todo
                    onLoginPressed(values.email, values.password)

                    resetForm()
                }}>
                {formikProps => (
                    <View>
                        <View style={styles.header}>
                            <Text numberOfLines={1} style={styles.mainText}>Đăng nhập</Text>

                        </View>
                        <View style={styles.inputContainer}>
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
                        </View>

                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={formikProps.handleSubmit}>
                                <LinearGradient
                                    colors={['#60711F', '#FA9015']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.button}
                                >
                                    <Text style={styles.logInLabel}>ĐĂNG NHẬP</Text>
                                </LinearGradient>
                            </TouchableOpacity >


                            <View style={styles.another}>
                                <Text style={{ fontSize: 17 }} > Bạn chưa có tài khoản?</Text>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("RegisterScreen")
                                }}>
                                    <Text style={styles.signUpLabel} >Đăng ký</Text>
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
    logInLabel: {
        color: "#fff",
        fontWeight: "700",
        textAlign: "center",
        fontSize: 18
    },
    signUpLabel: {
        margin: 10,
        color: "#428DFE",
        fontSize: 17,
        fontWeight: "bold"
    },
    error: {
        color: "red",

    }

})
export default LoginScreen