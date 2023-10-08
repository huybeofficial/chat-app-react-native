import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TabBar,
  TabBarItem,
  TouchableOpacity,
} from "react-native";
import { useAsyncStorage } from "@react-native-community/async-storage";

const App = () => {
  const [settings, setSettings] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const loadSettings = async () => {
    const settingsData = await useAsyncStorage.getItem("settings");
    if (settingsData) {
      setSettings(JSON.parse(settingsData));
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  const renderTab = (index, title) => {
    return (
      <TabBarItem
        key={index}
        icon={require("./assets/icons/settings.svg")}
        title={title}
        selected={selectedTab === index}
        onPress={() => handleTabChange(index)}
      />
    );
  };

  const renderContent = () => {
    const tab = settings[selectedTab];
    return (
      <ScrollView>
        {tab.settings.map((setting, index) => (
          <Setting
            key={index}
            title={setting.title}
            description={setting.description}
            type={setting.type}
            value={setting.value}
            onChange={(value) => {
              setSettings(
                settings.map((s, i) => {
                  if (s.title === setting.title) {
                    s.value = value;
                  }
                  return s;
                })
              );
            }}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabBar
        style={styles.tabBar}
        indicatorStyle={styles.tabBarIndicator}
        onTabPress={handleTabChange}
      >
        {settings.map((tab, index) => renderTab(index, tab.title))}
      </TabBar>
      <View style={styles.content}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#fff",
  },
  tabBarIndicator: {
    backgroundColor: "#000",
  },
  content: {
    padding: 20,
  },
});

export default App;
