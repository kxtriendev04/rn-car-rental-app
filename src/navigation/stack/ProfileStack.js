import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileHome from "../../screens/profile/ProfileHome";
import AddressScreen from "../../screens/profile/AddressScreen";
import AddressAddition from "../../screens/profile/AddressAddition";
import LocationPicker from "../../screens/profile/LocationPicker";
import Wishlist from "../../screens/host/Wishlist";
import EditProfileScreen from "../../screens/profile/EditProfileScreen";

const Stack = createStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="profileHome">
      <Stack.Screen
        name="profileHome"
        component={ProfileHome}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AddressAddition"
        component={AddressAddition}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="LocationPicker"
        component={LocationPicker}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileStack;
