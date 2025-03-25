import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import ProductDetailScreen from "../../screens/ProductDetailScreen";
import AcommodationMap from "../../screens/AcommodationMap";
import NewFeedScreen from "../../screens/NewFeedScreen";

const Stack = createStackNavigator();
const NewFeedStack = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={NewFeedScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      {/* <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AcommodationMap"
        component={AcommodationMap}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default NewFeedStack;
