import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Button } from 'react-native';
import { deleteAccessToken, logoutApi } from '../services/authentication';
//import Toast from 'react-native-simple-toast';
import Toast from 'react-native-toast-message';

const HomeScreen = ({ navigation }) => {
    const onLogoutPressed = async () => {
        try {
            //Xoá token
            const result = await deleteAccessToken()
            console.log("-----", result)
            if (result) {
                Alert.alert("đã đăng xuất")
                navigation.replace("LoginScreen")

            } else {
                alert("error")
            }
        } catch (err) {
            const { data } = err.response
            alert(data.message)
        }
    }

    const showToast = () => {
        Toast.show({
            type: "success",
            text1: 'Đéo cho đăng xuất',
            text2: 'Nạp vào donate cho tao thì đăng xuất',
            position: 'top',
            autoHide: true,
        })
    }
    return (
        <View style={styles.container}>
            <Image style={styles.mainImage} source={require('../assets/img/chat.png')} />
            <Text style={styles.mainText}>HOME</Text>
            <TouchableOpacity onPress={showToast}>
                <Text> Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 25
    },
    mainImage: {
        bottom: 20,
        width: 200,
        height: 200,
        marginBottom: 15
    },
    mainText: {
        fontSize: 22,
        fontWeight: "900",
        marginVertical: 20,
        color: "#5f1ad0"
    },
    subText: {
        fontSize: 15,
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "#746bf9",
        padding: 15,
        borderRadius: 5,
        margin: 10
    },
    loginLabel: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700"
    }
})
export default HomeScreen;