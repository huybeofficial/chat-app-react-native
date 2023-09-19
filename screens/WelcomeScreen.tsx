import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ToastProvider, useToast } from 'react-native-toast-message';

const AppWithToast = () => {
  const { show } = useToast();

  const showToast = () => {
    show({
      type: 'success',
      position: 'bottom',
      text1: 'Hello',
      text2: 'This is a toast message',
      visibilityTime: 2000, // 2 seconds
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={showToast}>
        <Text>Show Toast</Text>
      </TouchableOpacity>
    </View>
  );
};



export default AppWithToast;
