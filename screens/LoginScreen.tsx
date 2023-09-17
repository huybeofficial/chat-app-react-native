import React, { useState } from "react"
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from '@expo/vector-icons/Ionicons'
import { addTokenToAxios, getAccessToken, loginApi, setAccessToken } from "../services/authentication"
import { validateEmail } from "../utils/validate";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)

    const handleBlurEmail = () => {
        if (!email) {
            setEmailError("Vui lòng nhập địa chỉ email.")
        } else if (!validateEmail(email)) {
            setEmailError("Địa chỉ email không hợp lệ.")
        } else {
            setEmailError("");
        }
    };

    const handleBlurPassword = () => {
        if (!password) {
            setPasswordError("Vui lòng nhập mật khẩu.")
        } else {
            setPasswordError("");
        }
    };

    const onLoginPressed = async () => {
        if (validateEmail(email) && password) {
            try {
                const loginResponse = await loginApi({
                    email,
                    password
                })
                const { data } = loginResponse
                // alert("Đăng nhập thành công!")
                //Lưu token lại
                const result = await setAccessToken(data?.tokens?.access?.token)
                if (result) {
                    alert("Đăng nhập thành công!")
                    const accessToken = await getAccessToken()
                    console.log(accessToken)
                } else {
                    alert("Lỗi khi đăng nhập: Không thể lưu accesstoken")
                }
            } catch (err) {
                const { data } = err.response
                alert(data.message)
            }
        } else {
            alert("Vui lòng nhập đầy đủ thông tin!")
        }
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            style={{ backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.mainImage} source={require('../assets/img/chat.png')} />
                    <Text style={styles.mainText}>Xin chào,</Text>
                    <Text style={styles.descriptText} > Đăng nhập để tiếp tục </Text>
                </View>

                <View style={styles.content}>

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
                </View>
                <View style={{ alignItems: "flex-end" }}>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={onLoginPressed}>
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