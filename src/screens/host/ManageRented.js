import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Text } from "react-native";
import colors from "../../util/colors";
import {
    AntDesign,
    EvilIcons,
    Foundation,
    Ionicons,
    MaterialIcons,
  } from "@expo/vector-icons";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";

const Seperate = () => {
  return (
    <View
      style={{
        width: 1, // Độ dày của viền
        height: 12, // Làm ngắn viền lại
        backgroundColor: "grey", // Màu viền
        marginBottom: 8,
      }}
    ></View>
  );
};

const ManageRented = () => {
    const tabs = ["Chờ duyệt", "Đã duyệt", "Từ chối", "Hoàn thành"];
    const [selectedTab, setSelectedTab] = useState("Chờ xét duyệt");

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 30, backgroundColor: colors.whiteColor }}>
            <View
              style={{
                paddingTop: 16,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* TabItem */}
              {tabs.map((tab, index) => (
                <React.Fragment key={tab}>
                  <TouchableOpacity
                    onPress={() => setSelectedTab(tab)}
                    style={{
                      flex: 1,
                      paddingBottom: 8,

                      borderBottomWidth: 2, // Độ dày viền dưới
                      borderBottomColor:
                        selectedTab == tab ? colors.mainColor : "transparent", // Màu viền dưới
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        paddingVertical: 4,
                        color: selectedTab == tab ? colors.mainColor : "",
                      }}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                  <Seperate />
                  {/* {index < tabs.length - 1 && <Seperate />} */}
                </React.Fragment>
              ))}
            </View>
            <Text>Hello</Text>
        </SafeAreaView>
    );
};

export default ManageRented;