import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../util/colors";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native-gesture-handler";

const SearchInput = ({}) => {
  const navigation = useNavigation();

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
            // style={styles.notifiContainer}
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
        <Pressable
          style={[styles.inputContainer]}
          onPress={() => navigation.navigate("SearchScreen")}
        >
          <View
            // value={searchValue}
            // onChangeText={setSearchValue}
            // onFocus={() => setIsFocused(true)}
            // onBlur={() => setIsFocused(false)}
            style={styles.input}
            // placeholder="Tìm kiếm điểm đến, nhà hàng..."
          >
            <Text style={{ color: colors.textGray, fontSize: 15 }}>
              Tìm kiếm phương tiện, người dùng..
            </Text>
          </View>

          <AntDesign
            name="search1"
            style={styles.inputIconLeft}
            size={18}
            color="grey"
          />
          {/* <Ionicons
            style={styles.inputIconRight}
            name="filter"
            size={18}
            color="grey"
          /> */}
          {/* <TouchableOpacity
            onPress={() => {
              if (searchValue.trim() !== "")
                navigation.navigate("SearchScreen");
            }}
            style={styles.inputIconRight}
          >
            <AntDesign
              name="swapright"
              size={20}
              color="grey"
              // style={styles.inputIconRight}
            />
          </TouchableOpacity> */}
        </Pressable>
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
  inputFocused: {
    zIndex: 9,
  },
  input: {
    justifyContent: "center",
    // alignItems: "center",
    // fontSize: 40,
    height: "90%",
    fontSize: 15,
    paddingLeft: 35,
    // backgroundColor: "red",
    textAlignVertical: "center",
  },
  inputIconLeft: {
    position: "absolute",
    left: 10,
    transform: [{ translateY: 16 }],
  },
  inputIconRight: {
    // padding: 25,
    height: "100%",
    justifyContent: "center",
    // paddingLeft: 8,
    alignItems: "center",
    width: 50,
    // backgroundColor: colors.greyBackground,
    // backgroundColor: "red",
    // borderRadius: 100,
    position: "absolute",
    // right: 10,
    right: 0,
    // transform: [{ translateY: 12 }],
    top: 0,
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
