import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import ProductDetailScreen from "../../screens/ProductDetailScreen";
import AcommodationMap from "../../screens/AcommodationMap";
import ProductCheckoutScreen from "../../screens/ProductCheckoutScreen";
import TripDateTimePicker from "../../screens/TripDateTimePickerScreen";
import SearchResultScreen from "../../screens/home/SearchResultScreen";
import SearchScreen from "../../screens/home/SearchScreen";
import ReviewScreen from "../../screens/product/ReviewScreen";
import { TransitionPresets } from "@react-navigation/bottom-tabs";

const fadeAnimation = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
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
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false, cardStyleInterpolator: fadeAnimation }}
      />
      <Stack.Screen
        name="SearchResultScreen"
        component={SearchResultScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromBottomIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
