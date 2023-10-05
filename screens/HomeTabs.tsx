import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import ChatScreen from './ChatScreen';
import FriendScreen from './FriendScreen';
import SettingScreen from './SettingScreen';
import Ionicons from '@expo/vector-icons/Ionicons'


const Tab = createBottomTabNavigator();
const HomeTabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 70,
                }
            }}>
                {

                }
                <Tab.Screen name={"Chat"} component={ChatScreen}
                    options={{
                        tabBarIcon: ({ focused }: { focused: boolean }) => {
                            return (
                                <View style={{ borderTopColor: focused ? "orange" : "white", borderTopWidth: 2, paddingVertical: 12, alignItems: "center" }} >
                                    <Ionicons
                                        style={styles.tabIcon} name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} color={focused ? "orange" : "gray"} size={25} />
                                    <Text style={{ textAlign: "center", fontSize: 12, color: focused ? "orange" : "gray" }}>Đoạn chat</Text>
                                </View>
                            )
                        }
                    }}></Tab.Screen>
                <Tab.Screen name={"Friend"} component={FriendScreen}
                    options={{
                        tabBarIcon: ({ focused }: { focused: boolean }) => {
                            return (
                                <View style={{ borderTopColor: focused ? "orange" : "white", borderTopWidth: 2, paddingVertical: 12, alignItems: "center" }}>
                                    <Ionicons
                                        style={styles.tabIcon} name={focused ? "md-people" : "md-people-outline"} color={focused ? "orange" : "gray"} size={25} />
                                    <Text style={{ textAlign: "center", fontSize: 12, color: focused ? "orange" : "gray" }}>Bạn bè</Text>
                                </View>
                            )
                        }
                    }}></Tab.Screen>
                <Tab.Screen name={"Setting"} component={SettingScreen}
                    options={{
                        tabBarIcon: ({ focused }: { focused: boolean }) => {
                            return (
                                <View style={{ borderTopColor: focused ? "orange" : "white", borderTopWidth: 2, paddingVertical: 12, alignItems: "center" }}>
                                    <Ionicons
                                        style={styles.tabIcon} name={focused ? "md-settings" : "md-settings-outline"} color={focused ? "orange" : "gray"} size={25} />
                                    <Text style={{ textAlign: "center", fontSize: 12, color: focused ? "orange" : "gray" }}>Cài đặt</Text>
                                </View>
                            )
                        }
                    }}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default HomeTabs

const styles = StyleSheet.create({
    content: {

    },
    tabIcon: {

    },
})