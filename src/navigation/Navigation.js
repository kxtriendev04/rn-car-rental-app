import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  FontAwesome6,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import HomeStack from "./stack/HomeStack";
import colors from "../util/colors";
import NewFeedStack from "./stack/NewFeedStack";
import ChatStack from "./stack/ChatStack";

// 📌 Stack Navigator cho phần đăng nhập / đăng ký
const AuthStack = createStackNavigator();
function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}

// 📌 Bottom Tab Navigator cho Home & Profile
const Tab = createBottomTabNavigator();
function MainTabs() {
  // return (
  //   <Tab.Navigator>
  //     <Tab.Screen name="Home" component={HomeScreen} />
  //     <Tab.Screen name="Profile" component={ProfileScreen} />
  //   </Tab.Navigator>
  // );
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      activeColor="#fff"
      screenOptions={{
        tabBarActiveTintColor: colors.mainColor, // Màu chữ khi tab được chọn
        tabBarInactiveTintColor: "gray", // Màu chữ khi tab không được chọn
        tabBarStyle: {},
      }}
      shifting="false"
    >
      <Tab.Screen
        name="HomeStack"
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={26} color={color} />
          ),
          headerShown: false,
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name="Tin tức"
        options={{
          tabBarLabel: "Tin tức",
          tabBarIcon: ({ color }) => (
            <Ionicons name="newspaper-outline" size={26} color={color} />
          ),
          headerShown: false,
        }}
        component={NewFeedStack}
      />
      <Tab.Screen
        name="Explore"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => (
            <AntDesign name="playcircleo" size={24} color={color} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Add"
        options={{
          tabBarLabel: "Xe đã đặt",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="car-rear" size={22} color={color} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Đã lưu"
        options={{
          tabBarLabel: "Đã lưu",
          tabBarIcon: ({ color }) => (
            <AntDesign name="save" size={26} color={color} />
          ),
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Chat"
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <Fontisto name="hipchat" size={24} color={color} />
          ),
          headerShown: false,
        }}
        component={ChatStack}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Tài khoản",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

// 📌 Root Stack Navigator để quản lý Auth & MainTabs
const RootStack = createStackNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="MainTabs" component={MainTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
