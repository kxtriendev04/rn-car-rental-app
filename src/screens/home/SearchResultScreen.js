import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import HeaderNavigation from "../../component/HeaderNavigation";
import {
  AntDesign,
  EvilIcons,
  Foundation,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import colors from "../../util/colors";
import SearchVehicalCard from "../../component/SearchVehicalCard";
import api from "../../util/api";

const tabs = ["Liên quan", "Mới nhất", "Giá"];
const SearchResultScreen = ({ route, navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Liên quan");
  const [searchResult, setSearchResult] = useState([]);
  const searchValue = route?.params?.searchValue || "";

  const fetchingData = async () => {
    try {
      const res = await api.get(`/vehicles/search?name=${searchValue}`);
      setSearchResult(res.data.results);
    } catch (err) {
      console.log("Lỗi gợi ý: ", err);
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);
  // Sorting functions
  const sortByNewest = () => {
    const sorted = [...searchResult].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setSearchResult(sorted);
  };

  const sortByPrice = () => {
    const sorted = [...searchResult].sort((a, b) => a.price - b.price);
    setSearchResult(sorted);
  };

  // Handle tab selection
  useEffect(() => {
    if (selectedTab === "Mới nhất") {
      sortByNewest();
    } else if (selectedTab === "Giá") {
      sortByPrice();
    }
  }, [selectedTab]);
  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: 30, backgroundColor: colors.whiteColor }}
    >
      {/* <HeaderNavigation></HeaderNavigation>
       */}
      <View
        style={{
          paddingBottom: 12,
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
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            flex: 1,
            backgroundColor: "#e7e7e7",
            height: 48,
            borderRadius: 8,
            padding: 6,
          }}
        >
          <View style={{ paddingRight: 25 }}>
            <Text
              numberOfLines={1}
              style={{ fontSize: 15, fontWeight: 500, textAlign: "center" }}
            >
              {searchValue}
              {/* Value */}
            </Text>
            <Text
              numberOfLines={1}
              style={{ color: "#666", textAlign: "center" }}
            >
              Quận Cầu Giấy, Thành phố Hà Nội
            </Text>
          </View>
          <AntDesign
            name="search1"
            style={{ position: "absolute", top: 14, right: 10 }}
            size={22}
            color="black"
          />
        </Pressable>
      </View>
      {/* DanhSach */}
      <FlatList
        data={searchResult}
        ListHeaderComponent={
          <View>
            <View
              style={{ height: 10, backgroundColor: colors.greyBackground }}
            ></View>
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

              {/* Icon Filter */}
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="filter" size={18} color="grey" />
              </View>
            </View>

            {/* <View
              style={{ height: 10, backgroundColor: colors.greyBackground }}
            ></View> */}
          </View>
        }
        showsHorizontalScrollIndicator={false}
        // pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SearchVehicalCard data={item} />}
      />
    </SafeAreaView>
  );
};
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
export default SearchResultScreen;
