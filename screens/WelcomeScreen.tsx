import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import  { useState } from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.mainImage} source={ require('../assets/img/chat.png') } />
    
      <TouchableOpacity onPress={() => {
        navigation.navigate("LoginScreen")
      }} style={styles.button}>
      <View>
        <Text style={styles.loginLabel}>ĐĂNG NHẬP</Text>
      </View>
      </TouchableOpacity>
    
      <TouchableOpacity onPress={() => {
        navigation.navigate("RegisterScreen")
      }} style={styles.button}>
        <Text style={styles.loginLabel}>ĐĂNG KÝ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#fff",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 25
    },
    mainImage: {
      bottom:20,
      width:200,
      height:200,
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
export default WelcomeScreen;