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
import { ScrollView } from "react-native-gesture-handler";

const OrderDetail = (data) => {
    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <Text>Chi tiết đơn hàng: {data.id || "Không có ID"}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

export default OrderDetail;