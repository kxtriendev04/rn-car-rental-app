import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../util/colors";
import { AntDesign } from "@expo/vector-icons";

const AccomodationRated = ({ rated = 1, ratedNumber = 1, navigation }) => {
  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 18,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 600 }}>
          Xếp hạng & Đánh giá
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ReviewScreen")}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.mainColor,
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Xem tất cả
          </Text>
          <AntDesign name="right" size={17} color={colors.mainColor} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text
          style={{
            padding: 10,
            fontSize: 18,
            fontWeight: 600,
            borderRadius: 15,
            backgroundColor: colors.mainColor,
            color: "white",
          }}
        >
          {rated}
        </Text>
        <View>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 4,
              color: colors.mainColor,
              fontWeight: 600,
            }}
          >
            Tuyệt vời
          </Text>
          <Text>({ratedNumber} đánh giá)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AccomodationRated;
