import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import ProductDetailScreen from "../../screens/ProductDetailScreen";
import AcommodationMap from "../../screens/AcommodationMap";
import ProductCheckoutScreen from "../../screens/ProductCheckoutScreen";
import TripDateTimePicker from "../../screens/TripDateTimePickerScreen";
import ChatHome from "../../screens/chat/ChatHome";
import ChatScreen from "../../screens/chat/ChatScreen";

const Stack = createStackNavigator();
const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="chatlist">
      <Stack.Screen
        name="chatlist"
        component={ChatHome}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="chatscreen"
        component={ChatScreen}
        options={{ headerShown: false, headerTitle: "" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ChatStack;
