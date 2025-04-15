import React from "react";
import { View, Text, Button } from "react-native";

const ProfileHome = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Trang cá nhân</Text>
      <Button title="Đăng xuất" onPress={() => navigation.replace("Auth")} />
      <Text>Địa chỉ của tôi</Text>
      <Button
        title="Địa chỉ"
        onPress={() => navigation.navigate("AddressScreen")}
      />
    </View>
  );
};

export default ProfileHome;
