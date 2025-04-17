import React from "react";
import HomeScreen from "../screens/HomeScreen";
import Wishlist from "../screens/host/Wishlist";
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
import { TimeProvider } from "../context/TimeContext";
import ProfileStack from "./stack/ProfileStack";
import { LocationProvider } from "../context/LocationContext";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import ForgotScreen from "../screens/auth/ForgotScreen";
import { shouldHideTabBar } from "../util/bottomTabHandle";
import HostHomeScreen from "../screens/host/HostHomeScreen";

// 📌 Stack Navigator cho phần đăng nhập / đăng ký
const AuthStack = createStackNavigator();
function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="Welcome">
      <AuthStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
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
      <AuthStack.Screen
        name="Forgot"
        component={ForgotScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}

// 📌 Bottom Tab Navigator cho Home & Profile
const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      activeColor="#fff"
      screenOptions={{
        tabBarActiveTintColor: colors.mainColor, // Màu chữ khi tab được chọn
        tabBarInactiveTintColor: "gray", // Màu chữ khi tab không được chọn
      }}
      shifting="false"
    >
      <Tab.Screen
        name="HomeStack"
        options={({ route }) => ({
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={26} color={color} />
          ),
          headerShown: false,
          tabBarStyle: shouldHideTabBar(route)
            ? { display: "none" }
            : undefined,
        })}
        component={HomeStack}
      />
      <Tab.Screen
        name="Tin tức"
        options={({ route }) => ({
          tabBarLabel: "Tin tức",
          tabBarIcon: ({ color }) => (
            <Ionicons name="newspaper-outline" size={26} color={color} />
          ),
          headerShown: false,
          tabBarStyle: shouldHideTabBar(route)
            ? { display: "none" }
            : undefined,
        })}
        component={NewFeedStack}
      />
      <Tab.Screen
        name="Explore"
        options={({ route }) => ({
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => (
            <AntDesign name="playcircleo" size={24} color={color} />
          ),
        })}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Add"
        options={({ route }) => ({
          tabBarLabel: "Xe đã đặt",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="car-rear" size={22} color={color} />
          ),
        })}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Đã lưu"
        options={({ route }) => ({
          tabBarLabel: "Đã lưu",
          tabBarIcon: ({ color }) => (
            <AntDesign name="save" size={26} color={color} />
          ),
        })}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Chat"
        options={({ route }) => ({
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <Fontisto name="hipchat" size={24} color={color} />
          ),
          headerShown: false,
          tabBarStyle: shouldHideTabBar(route)
            ? { display: "none" }
            : undefined,
        })}
        component={ChatStack}
      />
      <Tab.Screen
        name="ProfileStack"
        options={({ route }) => ({
          tabBarLabel: "Tài khoản",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
          headerShown: false,
          tabBarStyle: shouldHideTabBar(route)
            ? { display: "none" }
            : undefined,
        })}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}

// 📌 Root Stack Navigator để quản lý Auth & MainTabs
const RootStack = createStackNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <TimeProvider>
        <LocationProvider>
          <RootStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="MainTabs"
          >
            <RootStack.Screen name="Auth" component={AuthNavigator} />
            <RootStack.Screen name="MainTabs" component={MainTabs} />
            <RootStack.Screen name="HostTabs" component={HostTabs} />
          </RootStack.Navigator>
        </LocationProvider>
      </TimeProvider>
    </NavigationContainer>
  );
}

const HostTab = createBottomTabNavigator();
function HostTabs() {
  return (
    <HostTab.Navigator
      initialRouteName="HostHomeScreen"
      screenOptions={{
        tabBarActiveTintColor: colors.mainColor,
        tabBarInactiveTintColor: "gray",
      }}
    >
      <HostTab.Screen
        name="HostHomeScreen"
        component={HostHomeScreen}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <Ionicons name="car-sport-outline" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <HostTab.Screen
        name="Xe yêu thích"
        component={Wishlist}
        options={{
          tabBarLabel: "Xe đã thích",
          tabBarIcon: ({ color }) => (
            <AntDesign name="hearto" size={24} color={color} />
          ),
        }}
      />
    </HostTab.Navigator>
  );
}