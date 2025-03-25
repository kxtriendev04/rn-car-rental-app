import React from "react";
import { View, Text, Button } from "react-native";

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Đây là trang Đăng ký</Text>
      <Button
        title="Đã có tài khoản? Đăng nhập"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default RegisterScreen;
