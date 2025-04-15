import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const HeaderNavigation = ({
  navigation,
  title = "",
  leftIcon = <AntDesign name="left" size={24} color="black" />,
  rightIcon,
  headerStyle = {},
  leftOnPress = () => navigation.goBack(),
  rightOnPress = () => {},
}) => {
  return (
    <View style={[styles.header, headerStyle]}>
      <TouchableOpacity
        style={styles.headerButtonContainer}
        onPress={leftOnPress}
      >
        {leftIcon}
        {/* <AntDesign name="left" size={24} color="black" /> */}
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      {rightIcon ? (
        <TouchableOpacity
          style={styles.headerButtonContainer}
          onPress={rightOnPress}
        >
          {/* <Feather name="save" size={24} color="black" /> */}
          {rightIcon}
        </TouchableOpacity>
      ) : (
        <View style={{ padding: 8 }}></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 500,
  },
  headerButtonContainer: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#999", // Màu bóng
    shadowOffset: { width: 1, height: 1 }, // Độ lệch bóng (X, Y)
    shadowOpacity: 0.5, // Độ mờ
    shadowRadius: 2, // Bán kính mờ
    elevation: 2, // Bóng trên Android
  },
});

export default HeaderNavigation;
