import React from "react";
import { View, Text, Button } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Đây là trang Đăng nhập</Text>
      <Button
        title="Đăng nhập"
        onPress={() => navigation.replace("MainTabs")}
      />
      <Button
        title="Chưa có tài khoản? Đăng ký"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default LoginScreen;
