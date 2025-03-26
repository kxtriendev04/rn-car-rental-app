import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../util/colors";

const AcommodationDesc = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
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
      <View>
        <Text
          style={{ fontSize: 14, lineHeight: 20 }}
          numberOfLines={expanded ? undefined : 3}
        >
          {description}
        </Text>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={{ color: colors.mainColor, fontSize: 14, marginTop: 5 }}>
            {expanded ? "Thu gọn" : "Xem thêm..."}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AcommodationDesc;
