import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "../../util/colors";
import Fontisto from "@expo/vector-icons/Fontisto";

const SearchInput = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{ marginBottom: 8, fontWeight: 500, color: colors.textGray }}
          >
            Current location
          </Text>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <Ionicons
              name="location-outline"
              size={20}
              color={colors.mainColor}
            />
            <Text style={{ fontWeight: 600, fontSize: 16 }}>
              Cầu Giấy, Hà Nội
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 8,
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: "white",
            shadowColor: "#999", // Màu bóng
            shadowOffset: { width: 1, height: 1 }, // Độ lệch bóng (X, Y)
            shadowOpacity: 0.5, // Độ mờ
            shadowRadius: 2, // Bán kính mờ
            elevation: 2, // Bóng trên Android
          }}
        >
          <Fontisto
            styles={styles.notifiContainer}
            name="bell"
            size={24}
            color="black"
          />
        </View>
      </View>
      <View style={{ marginTop: 0 }}>
        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: 600, fontSize: 18 }}>
            Rent a Car anytime
          </Text>
          <TouchableOpacity
            style={{
              paddingHorizontal: 12,
              paddingVertical: 10,
              backgroundColor: colors.mainColor,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontWeight: 500, color: colors.whiteColor }}>
              Host & Earn
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm điểm đến, nhà hàng..."
          ></TextInput>

          <AntDesign
            name="search1"
            style={styles.inputIconLeft}
            size={18}
            color="grey"
          />
          <Ionicons
            style={styles.inputIconRight}
            name="filter"
            size={18}
            color="grey"
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 60,
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 12,
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    backgroundColor: colors.greyBackground,
    marginBottom: 16,
  },
  input: {
    fontSize: 20,
    height: "90%",
    fontSize: 12,
    paddingLeft: 35,
    textAlignVertical: "center",
  },
  inputIconLeft: {
    position: "absolute",
    left: 10,
    transform: [{ translateY: 16 }],
  },
  inputIconRight: {
    position: "absolute",
    right: 10,
    transform: [{ translateY: 16 }],
  },
  notifiContainer: {
    flex: 2,
    // padding: 30,
    width: 20,
    height: 20,
    marginRight: 3,
  },
});

export default SearchInput;
