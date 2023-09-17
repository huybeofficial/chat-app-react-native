import React, { useState } from "react"
import { Image, SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView } from "react-native"
import axios from "axios"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { registerApi } from '../services/authentication'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Ionicons from '@expo/vector-icons/Ionicons'
import { validateEmail } from "../utils/validate";



const RegisterScreen = ({ navigation }) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmedPasswordError, setConfirmedPasswordError] = useState("");


    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [visible, setVisible] = useState(true)
    const [visible1, setVisible1] = useState(true)

    const handleBlurUsername = () => {
        if (!username) {
            setUsernameError("Vui lòng nhập tên người dùng.");
        } else {
            setUsernameError("");
        }
    };

    const handleBlurEmail = () => {
        if (!email) {
            setEmailError("Vui lòng nhập địa chỉ email.");
        } else if (!validateEmail(email)) {
            setEmailError("Địa chỉ email không hợp lệ.");
        } else {
            setEmailError("");
        }
    };

    const handleBlurPassword = () => {
        if (!password) {
            setPasswordError("Vui lòng nhập mật khẩu.");
        } else {
            setPasswordError("");
        }
    };

    const handleBlurConfirmedPassword = () => {
        if (!confirmedPassword) {
            setConfirmedPasswordError("Vui lòng xác nhận mật khẩu.");
        } else if (password !== confirmedPassword) {
            setConfirmedPasswordError("Mật khẩu xác nhận không khớp.");
        } else {
            setConfirmedPasswordError("");
        }
    };
    const onSignUpPressed = async () => {
        if (username && validateEmail(email) && password && password === confirmedPassword) {
            try {
                const signupResponse = await registerApi({
                    username,
                    email,
                    password
                })
                const { data } = signupResponse
                alert("Đăng ký thành công!")
                setTimeout(() => {
                    navigation.replace("LoginScreen")
                }, 3000)
            } catch (err) {
                const { data } = err.response
                alert("Email đã tồn tại!")
            }
        } else {
            alert("Vui lòng nhập đầy đủ thông tin!")
        }
    };
    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            style={{ backgroundColor: "#fff" }}>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.mainImage} source={require('../assets/img/chat.png')} />
                    <Text style={styles.mainText}>Xin chào,</Text>
                    <Text style={styles.descriptText} > Đăng ký để tiếp tục </Text>
                </View>


                <View style={styles.content}>
                    <View style={styles.inputContainer} >
                        <Ionicons name="person-outline" size={20} color="#6ce31e" style={styles.inputIcon} />
                        <TextInput value={username}
                            placeholder="Nhập tên"
                            style={styles.input}
                            onChangeText={(value) => {
                                setUsername(value)
                            }}
                            onBlur={handleBlurUsername}
                        />
                    </View>
                    {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}

                    <View style={styles.inputContainer} >
                        <Ionicons name="mail-outline" size={20} color="#6ce31e" style={styles.inputIcon} />
                        <TextInput value={email}
                            keyboardType="email-address"
                            placeholder="Nhập địa chỉ Email"
                            style={styles.input}
                            onChangeText={(value) => {
                                setEmail(value)
                            }}
                            onBlur={handleBlurEmail}
                        />
                    </View>
                    {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

                    <View style={styles.inputContainer} >
                        <Ionicons name="lock-closed" size={20} color="#6ce31e" style={styles.inputIcon} />
                        <TextInput value={password}
                            placeholder="Nhập mật khẩu"
                            style={styles.input}
                            secureTextEntry={visible}
                            onChangeText={(value) => {
                                setPassword(value)
                            }}
                            onBlur={handleBlurPassword}
                        />
                        <TouchableOpacity onPress={() => {
                            setVisible(!visible)
                            setShowPassword(!showPassword)
                        }}>
                            <Ionicons name={showPassword === false ? "eye-off-outline" : "eye-outline"} size={25} color="#000" style={{ position: "absolute", right: 5, paddingTop: 5 }} />
                        </TouchableOpacity>
                    </View>
                    {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}


                    <View style={styles.inputContainer} >
                        <Ionicons name="lock-closed" size={20} color="#6ce31e" style={styles.inputIcon} />
                        <TextInput
                            value={confirmedPassword}
                            placeholder="Nhập lại mật khẩu"
                            style={styles.input}
                            secureTextEntry={visible1}
                            onChangeText={(value) => {
                                setConfirmedPassword(value)
                            }}
                            onBlur={handleBlurConfirmedPassword}
                        />
                        <TouchableOpacity onPress={() => {
                            setVisible1(!visible1)
                            setShowConfirmPassword(!showConfirmPassword)
                        }}>
                            <Ionicons name={showConfirmPassword === false ? "eye-off-outline" : "eye-outline"} size={25} color="#000" style={{ position: "absolute", right: 5, paddingTop: 5 }} />
                        </TouchableOpacity>
                    </View>
                    {confirmedPasswordError ? <Text style={styles.error}>{confirmedPasswordError}</Text> : null}

                </View>
                <View style={{ alignItems: "flex-end" }}>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onSignUpPressed}
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