import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import ProductDetailScreen from "../../screens/ProductDetailScreen";
import AcommodationMap from "../../screens/AcommodationMap";
import NewFeedScreen from "../../screens/NewFeedScreen";
import PostDetailScreen from "../../screens/PostDetail";
import Notification from "../../screens/Notification";
import colors from "../../util/colors";
import { MainTabs } from "../Navigation";

const Stack = createStackNavigator();
const NewFeedStack = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="home"
        component={NewFeedScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: true, 
          title: "Thông báo", 
          headerBackTitleVisible: false, 
          headerBackTitle: "", 
          headerTintColor: colors.mainColor, 
          headerStyle: {
            backgroundColor: "#fff", 
          },
          headerTitleStyle: {
            fontWeight: "bold", 
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default NewFeedStack;
