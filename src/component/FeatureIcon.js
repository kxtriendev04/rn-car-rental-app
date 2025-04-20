import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

// Gộp các thư viện icon vào một map
const IconMap = {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
  AntDesign,
  Feather,
  Entypo,
  MaterialIcons,
};

const FeatureIcon = ({ library, name, size = 24, color = "black" }) => {
  const IconComponent = IconMap[library];

  if (!IconComponent) {
    return <MaterialIcons name="error-outline" size={24} color="red" />;
  }

  return (
    <View style={styles.container}>
      <IconComponent name={name} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // margin: 10,
  },
});

export default FeatureIcon;
