import React, { Fragment } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import colors from "../../util/colors";
import { Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";

const menu = [
  {
    icon: <AntDesign name="user" size={22} color="black" />,
    title: "Tài khoản của tôi",
  },
  {
    icon: <AntDesign name="hearto" size={22} color="black" />,
    title: "Xe yêu thích",
  },
  {
    icon: <FontAwesome6 name="address-book" size={20} color="black" />,
    title: "Địa chỉ của tôi",
    onPress: (navigation) => navigation.navigate("AddressScreen"),
  },
  {
    icon: <Feather name="lock" size={22} color="black" />,
    title: "Đổi mật khẩu",
  },
];
const ProfileHome = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      {/* <View
        style={{
          height: 180,
          backgroundColor: colors.lightMainColor,
          borderBottomRightRadius: 36,
          borderBottomLeftRadius: 36,
          position: "relative",
          // justifyContent: "center",
          alignItems: "center",
        }}
      > */}

      {/* </View> */}
      <View style={{ marginTop: 80, marginHorizontal: 24 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <View
            style={{
              shadowColor: "black",
              shadowOffset: { width: 1, height: 1 },
              shadowRadius: 5,
              shadowOpacity: 0.2,
              backgroundColor: "white",
              borderRadius: 999,
            }}
          >
            <Image
              source={require("../../../assets/defaultAvatar.jpg")}
              style={{
                width: 65,
                height: 65,
                borderRadius: 999,
              }}
            ></Image>
          </View>
          <View>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Quicksand_700Bold",
                marginBottom: 4,
                color: colors.textColor,
              }}
            >
              Khúc Xuân Triển
            </Text>
            <Text
              style={{
                color: colors.mainColor,
              }}
            >
              khuctrien@gmail.com
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginTop: 40,
            borderRadius: 10,
            paddingVertical: 6,
            paddingHorizontal: 16,
          }}
        >
          {menu.map((item, index) => (
            <Fragment key={index}>
              <Pressable
                onPress={() => {
                  if (item.onPress) item.onPress(navigation);
                }}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // backgroundColor: "yellow",
                  paddingVertical: 16,
                  // borderBottomColor: "#e7e7e7",
                  // borderBottomWidth: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    // backgroundColor: "violet",
                  }}
                >
                  <View style={{ width: 30 }}>{item.icon}</View>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: "BeVietnamPro_500Medium",
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
                <AntDesign name="right" size={17} color="grey" />
              </Pressable>
              {index < menu.length - 1 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#e9e9e9",
                    marginLeft: 35,
                  }}
                ></View>
              )}
            </Fragment>
          ))}
        </View>
        <Pressable
          onPress={() => navigation.replace("Auth")}
          style={{
            marginTop: 20,
            marginHorizontal: "auto",
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Feather name="log-out" size={21} color="red" />
          <Text
            style={{
              fontFamily: "BeVietnamPro_400Regular",
              fontSize: 17,
              color: "red",
            }}
          >
            Đăng xuất
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProfileHome;
