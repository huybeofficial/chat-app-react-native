import { StyleSheet, Text, View, TextInput, SafeAreaView, Dimensions, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const windownWidth = Dimensions.get('window').width
const windownHeight = Dimensions.get('window').height

const ChatScreen = () => {
    const [search, setSearch] = useState("")


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }} >Cuộc trò chuyện</Text>
                <Entypo style={{ position: "absolute", right: 20 }} name="new-message" size={25} color="black" />
            </View>
            <View style={styles.body}>
                <TextInput
                    value={search}
                    placeholder="Tìm kiếm"
                    style={styles.searchInput}
                    onChangeText={() => {
                        setSearch(search);
                    }}
                />
            </View>
            <StatusBar style="dark" />
        </SafeAreaView>

    )
}

export default ChatScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        marginTop: windownWidth * 0.1,
        width: "100%",
        height: "5%",
    },
    body: {
        width: "100%",
        height: "95%",
        borderColor: "green",
        borderWidth: 1,
        flex: 1,
        alignItems: "center"
    },
    searchInput: {
        width: "90%",
        borderColor: "red",
        borderWidth: 1,
        padding: 5,
    },
})