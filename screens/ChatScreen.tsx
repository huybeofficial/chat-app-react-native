import { Image, StyleSheet, Text, View, TextInput, SafeAreaView, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { getAllConversationApi } from '../services/ChatService'
import { getUserDataApi } from '../services/UserService'

const windownWidth = Dimensions.get('window').width
const windownHeight = Dimensions.get('window').height

const ChatScreen = ({ navigation, route }: any) => {
    const { userData } = route.params

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [conversation, setConversation] = useState([]);
    const [textSearch, setTextSearch] = useState<string>("");
    const [dataSearch, setDataSearch] = useState([]);
  
    // const getUserData = async () => {
    //     const res = await getUserDataApi();
    //     setUserData(res.data?.user)
    // }
    const getConversation = async () => {
        setIsLoading(true);
        try {
            const listData = await getAllConversationApi();
            const { data } = listData;
            console.log(data)
            setConversation(data);
        } catch (error) {
            alert(error);
        }
        setIsLoading(false);
    };

    const renderConversationItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.getConversation} onPress={() => {
                navigation.navigate('MessageScreen', {
                    conversationId: item._id
                });
            }}>
                <Text style={{ fontSize: 15 }}>{item.members[1].username}</Text>
                <Text style={{ fontSize: 13, color: "gray" }}>{item?.textMessage}</Text>
            </TouchableOpacity>
        );
    }

    const handleSearch = (searchText: string) => {
        const filteredConversation = conversation.filter((item) =>
            item?.username.toLowerCase().includes(searchText.toLowerCase())
        );
        setDataSearch(filteredConversation);
    };

    useEffect(() => {
        getConversation();
    }, []);

    useEffect(() => {
        handleSearch(textSearch);
    }, [textSearch]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }} >Đoạn chat</Text>
                    <Entypo style={{ position: "absolute", right: 20 }} onPress={() => {
                        navigation.navigate("NewMessageScreen");
                    }}
                        name="new-message" size={25} color="#428DFE" />
                </View>
                <TextInput
                    value={textSearch}
                    placeholder="Tìm kiếm"
                    style={styles.searchInput}
                    onChangeText={(value) => {
                        setTextSearch(value);
                    }}
                />
            </View>
            <View style={styles.body}>
                <FlatList
                    onRefresh={getConversation}
                    refreshing={isLoading}
                    data={textSearch ? dataSearch : conversation}
                    renderItem={(item) => renderConversationItem(item)}
                />
            </View>
            <StatusBar style="dark" />
        </SafeAreaView>
    );
}

export default ChatScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginBottom: windownHeight * 0.3
    },
    heading: {
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: windownHeight * 0.2,
    },
    header: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: windownHeight * 0.09
    },
    searchInput: {
        width: "95%",
        backgroundColor: "#d3d3d3",
        borderRadius: 5,
        padding: 5,
        marginVertical: 10
    },
    body: {
        width: "100%",
        marginHorizontal: 5
    },
    getConversation: {
        borderBottomColor: "gray",
        borderBottomWidth: 0.8,
        paddingVertical: 5
    },
})