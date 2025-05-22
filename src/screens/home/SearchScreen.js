import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import colors from "../../util/colors";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import api from "../../util/api";

const suggestionsData = [
  "Toyota Camry",
  "Honda Civic",
  "Ford Mustang",
  "Người dùng A",
  "Người dùng B",
  "Mazda CX-5",
  "Tesla Model 3",
  "Bán tải Ford Ranger",
];

const recentSearch = ["Khúc Triển", "Lambogini", "Toyota"];

const SearchScreen = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchValue.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await api.get(`/vehicles/search?name=${searchValue}`);
        setSuggestions(res.data.results);
      } catch (err) {
        console.log("Lỗi gợi ý: ", err);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300); // debounce 300ms
    return () => clearTimeout(timeout);
  }, [searchValue]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{ flex: 1, paddingTop: 30, backgroundColor: colors.whiteColor }}
      >
        {/* <HeaderNavigation></HeaderNavigation>
         */}
        <View
          style={{
            //   paddingBottom: 12,
            borderBottomColor: "#e9e9e9",
            paddingBottom: 14,
            borderBottomWidth: 0.5,
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: 15,
            gap: 12,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              // flex: 0.1,
              padding: 8,
              borderRadius: 10,
              backgroundColor: "white",
              shadowColor: "#999", // Màu bóng
              shadowOffset: { width: 1, height: 1 }, // Độ lệch bóng (X, Y)
              shadowOpacity: 0.5, // Độ mờ
              shadowRadius: 2, // Bán kính mờ
              elevation: 2, // Bóng trên Android
            }}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="left" size={24} color="black" />
            {/* <AntDesign name="left" size={24} color="black" /> */}
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              backgroundColor: "#e7e7e7",
              height: 40,
              borderRadius: 8,
              padding: 6,
            }}
          >
            <TextInput
              ref={inputRef}
              value={searchValue}
              onChangeText={setSearchValue}
              autoFocus={true}
              returnKeyType="search"
              // keyboardType="decimal-pad"
              placeholder="Tìm kiếm phương tiện..."
              // onSubmitEditing={()=>
              onSubmitEditing={() => {
                if (searchValue.trim() !== "") {
                  // Alert.alert("Search");
                  navigation.navigate("SearchResultScreen", {
                    searchValue: searchValue,
                  });
                  // setSearchValue(searchValue);
                }
              }}
              style={{
                paddingVertical: 6,
                fontSize: 14,
                paddingHorizontal: 8,
                paddingRight: 40,
                lineHeight: 18,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (searchValue.trim() !== "")
                  navigation.navigate("SearchResultScreen", {
                    searchValue: searchValue,
                  });
              }}
              style={styles.inputIconRight}
            >
              <AntDesign
                name="swapright"
                size={20}
                color="grey"
                // style={styles.inputIconRight}
              />
            </TouchableOpacity>
          </View>
        </View>
        {!searchValue ? (
          <View style={{ marginHorizontal: 15, marginTop: 20 }}>
            {recentSearch && (
              <FlatList
                data={recentSearch}
                keyExtractor={(item) => item}
                ListHeaderComponent={
                  <Text
                    style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}
                  >
                    Gần đây
                  </Text>
                }
                keyboardDismissMode="on-drag" //  Ẩn bàn phím khi cuộn
                keyboardShouldPersistTaps="handled" //  Giữ sự kiện touch trên FlatList
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSearchValue(item);
                      navigation.navigate("SearchResultScreen", {
                        searchValue: item,
                      });
                    }}
                    style={{
                      flexDirection: "row",
                      gap: 12,
                      paddingVertical: 16,
                      borderBottomColor: "#e7e7e7",
                      borderBottomWidth: 1,
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome6 name="clock-four" size={23} color="grey" />
                    {/* <Feather name="search" size={23} color="grey" /> */}
                    <Text
                      style={{ fontSize: 14, color: "grey", fontWeight: 500 }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        ) : (
          <View style={{ marginHorizontal: 15, marginTop: 20 }}>
            {suggestions && (
              <FlatList
                keyboardDismissMode="on-drag" //  Ẩn bàn phím khi cuộn
                keyboardShouldPersistTaps="handled" //  Giữ sự kiện touch trên FlatList
                data={suggestions}
                keyExtractor={(item, index) => `${item} + ${index.toString()}`}
                ListHeaderComponent={
                  <Text
                    style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}
                  >
                    Gợi ý
                  </Text>
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSearchValue(item);
                      navigation.navigate("SearchResultScreen", {
                        searchValue: item?.name,
                      });
                    }}
                    style={{
                      flexDirection: "row",
                      gap: 12,
                      paddingVertical: 16,
                      borderBottomColor: "#e7e7e7",
                      borderBottomWidth: 1,
                      alignItems: "center",
                    }}
                  >
                    <Feather name="search" size={23} color="grey" />
                    <Text
                      style={{ fontSize: 14, color: "grey", fontWeight: 500 }}
                    >
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  inputIconRight: {
    // padding: 25,
    height: 40,
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
});

export default SearchScreen;
