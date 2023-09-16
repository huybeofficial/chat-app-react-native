import React, { useState } from "react"
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from '@expo/vector-icons/Ionicons'
import { addTokenToAxios, getAccessToken, loginApi, setAccessToken } from "../services/authentication"

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    const validateEmail = (email) => {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (mailFormat.test(email)) {
            return true
        }
        return false
    }

    const onLoginPressed = async () => {
        if (!validateEmail(email)) {
            alert("Email không hợp lệ!")
        }
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
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            style={{ backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <Image style={styles.mainImage} source={require('../assets/img/chat.png')} />

                <View style={styles.textHeader}>
                    <Text style={styles.mainText}>Xin chào,</Text>
                    <Text style={styles.descriptText} > Đăng nhập để tiếp tục </Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.inputContainer} >
                        <Ionicons name="mail-outline" size={20} color="#6ce31e" style={styles.inputIcon} />
                        <TextInput value={email} onChangeText={(value) => {
                            setEmail(value)
                        }}
                            placeholder="Nhập địa chỉ Email"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputContainer} >
                        <Ionicons name="lock-closed-outline" size={20} color="#6ce31e" style={styles.inputIcon} />
                        <TextInput value={password} onChangeText={(value) => {
                            setPassword(value)
                        }}
                            secureTextEntry
                            placeholder="Nhập mật khẩu"
                            style={styles.input}
                        />
                    </View>
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
    textHeader: {
        marginVertical: 40
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
        alignItems: "center",
        width: "100%",
    },
    inputContainer: {
        marginTop: 15,
        flexDirection: "row"
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
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