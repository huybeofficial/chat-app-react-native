import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { getUserInfo } from '../services/authentication'


const UserProfileScreen = () => {


  return (
    <View style={styles.container}>

      <View style={styles.userInfo}>
        <Image style={styles.userImage} source={require('../assets/img/profile.png')} />
        <View style={styles.infor} >
          <Text style={styles.username}>userData.userName</Text>
          <Text style={styles.email}>userData.email</Text>
        </View>

      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem1}>
          <FontAwesome name="user" size={28} color="black" />
          <Text style={styles.menuItemText}> Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="md-settings" size={28} color="black" />
          <Text style={styles.menuItemText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="md-sunny" size={28} color="black" />
          <Text style={styles.menuItemText}>Appearance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications" size={28} color="black" />
          <Text style={styles.menuItemText}>Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="question-circle" size={28} color="black" />
          <Text style={styles.menuItemText}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
        <FontAwesome name="sign-out" size={28} color="black" />
                  <Text style={styles.menuItemText}>Log out</Text>
        </TouchableOpacity>

        {/* Thêm các mục quản lý khác ở đây */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#007AFF', // Màu nền header
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Màu chữ
  },


  userInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 20,
    backgroundColor: "black"
  },
  infor: {
    paddingTop: 14,
    paddingVertical: 9
  },
  userImage: {
    alignContent: 'flex-start',
    width: 70,
    height: 70,
    marginHorizontal: 20,
    marginVertical: 10
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "white"
  },
  email: {
    fontSize: 18,
    color: 'gray',
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: 0,
    borderBottomColor: 'lightgray',
    flexDirection: "row"
  },
  menuItem1: {
    paddingVertical: 16,
    borderBottomWidth: 0,
    borderBottomColor: 'lightgray',
    flexDirection: "row",
    padding:5
  },
  menuItemText: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
});

export default UserProfileScreen;
