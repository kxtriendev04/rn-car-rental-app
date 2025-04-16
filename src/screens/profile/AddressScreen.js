import React, { useEffect, useLayoutEffect, useState } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNavigation from "../../component/HeaderNavigation";
import colors from "../../util/colors";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { Pressable } from "react-native";

const AddressScreen = ({ navigation, route }) => {
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    setAddresses([
      {
        name: "Nhà riêng",
        province: "TP. Hà Nội",
        district: "Quận Cầu Giấy",
        ward: "Phường Dịch Vọng",
        road: "Đường Xuân Thủy",
        latitude: 21.0466,
        longitude: 105.7841,
      },
      {
        name: "Nhà riêng",
        province: "Hà Nội",
        district: "Quân Cầu Giấy",
        ward: "Cổ Nhuế 2",
        road: "Trần Cung",
      },
      {
        name: "Nhà riêng",
        province: "Hà Nội",
        district: "Quân Cầu Giấy",
        ward: "Cổ Nhuế 2",
        road: "Trần Cung",
      },
    ]);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderNavigation title="Địa chỉ của tôi" navigation={navigation} />

      <View
        style={{
          flex: 1,
          backgroundColor: colors.greyBackground,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: 500,
            paddingVertical: 10,
            paddingLeft: 15,
          }}
        >
          Địa chỉ
        </Text>
        <View style={{ flex: 1, paddingBottom: 16 }}>
          {addresses.length > 0 ? (
            <FlatList
              data={addresses}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("AddressAddition", {
                      currentLocation: item,
                    })
                  }
                  style={{
                    flexDirection: "row",
                    gap: 12,
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    backgroundColor: "white",
                    borderBottomWidth: 1,
                    borderBottomColor: "#e7e7e7",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <Feather name="home" size={24} color="black" />
                    <View style={{ gap: 4 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 8,
                          alignItems: "center",
                          marginBottom: 4,
                        }}
                      >
                        <Text style={{ fontSize: 15, fontWeight: 600 }}>
                          {item?.name}
                        </Text>
                        <Text
                          style={{
                            borderRadius: 12,
                            fontSize: 10,
                            fontWeight: 500,
                            backgroundColor: colors.lightMainColor,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                          }}
                        >
                          Mặc định
                        </Text>
                      </View>
                      <Text
                        style={
                          {
                            // paddingRight: 100,
                          }
                        }
                      >
                        {item?.province}, {item?.district}
                      </Text>
                      <Text>
                        {item?.ward}, {item?.road}
                      </Text>
                    </View>
                  </View>
                  <Entypo name="chevron-small-right" size={24} color="black" />
                </Pressable>
              )}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  paddingHorizontal: 80,
                  textAlign: "center",
                  lineHeight: 22,
                }}
              >
                Bạn chưa có địa chỉ, hãy thêm địa chỉ mới
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.mainColor,

            alignItems: "center",
            padding: 16,
            marginHorizontal: 15,
            borderRadius: 12,
            marginBottom: 18,
          }}
          onPress={() => navigation.navigate("AddressAddition")}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Thêm địa chỉ mới</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddressScreen;
