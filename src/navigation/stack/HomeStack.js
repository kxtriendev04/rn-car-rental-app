import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import ProductDetailScreen from "../../screens/ProductDetailScreen";
import AcommodationMap from "../../screens/AcommodationMap";
import ProductCheckoutScreen from "../../screens/ProductCheckoutScreen";
import TripDateTimePicker from "../../screens/TripDateTimePickerScreen";

const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductCheckout"
        component={ProductCheckoutScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AcommodationMap"
        component={AcommodationMap}
        options={{ headerShown: false }}
      />
      {/* TripDateTimePicker */}
      <Stack.Screen
        name="TripDateTimePicker"
        component={TripDateTimePicker}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
