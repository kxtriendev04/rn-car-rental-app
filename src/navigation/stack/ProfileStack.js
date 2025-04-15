import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileHome from "../../screens/profile/ProfileHome";
import AddressScreen from "../../screens/profile/AddressScreen";

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
        name="profileAddress"
        component={AddressScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileStack;
