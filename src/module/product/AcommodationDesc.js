import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AcommodationDesc = ({ description }) => {
  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 18,
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
        Giới thiệu về xe
      </Text>
      <Text style={{ fontSize: 14, lineHeight: 20 }}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AcommodationDesc;
