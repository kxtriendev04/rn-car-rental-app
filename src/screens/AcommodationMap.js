import { useRoute, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

const AcommodationMap = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { latitude, longitude, name = "Destination" } = route.params; // Nhận tên địa điểm

  const location = {
    latitude,
    longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} initialRegion={location}>
        {/* Hiển thị marker với tên địa điểm */}
        <Marker
          coordinate={location}
          title={name}
          description="Vị trí được đánh dấu"
        />
      </MapView>

      {/* Nút thoát */}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          paddingHorizontal: 20,
          paddingVertical: 4,
          backgroundColor: "#111",
          borderRadius: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "white" }}>Thoát bản đồ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AcommodationMap;
