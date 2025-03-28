import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
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

const searchResult = [
  {
    id: "room1",
    area: 2007,
    bedNumber: 2,
    name: "Lamborghini Revuelto",
    price: 1500000,
    images: [
      "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
      "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
      "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
    ],
    features: [
      {
        title: "Không gian thoải mái",
        icon: <Foundation name="social-myspace" size={20} color="grey" />,
      },
      {
        title: "Số tự động",
        icon: <EvilIcons name="gear" size={20} color="grey" />,
      },
      {
        title: "Giá rẻ",
        icon: <Ionicons name="pricetags-outline" size={20} color="grey" />,
      },
      {
        title: "7.5",
        icon: <AntDesign name="star" size={16} color="orange" />,
      },
    ],
  },
  {
    id: "room2",
    area: 2018,
    bedNumber: 1,
    name: "Lamborghini Veneno Roadster",
    price: 1200000,
    images: [
      "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
      "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
      "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
      "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
    ],
    features: [
      {
        title: "Two single beds",
        icon: <MaterialIcons name="single-bed" size={18} color="grey" />,
      },
      {
        title: "Garden view",
        icon: <MaterialIcons name="grass" size={18} color="grey" />,
      },
      {
        title: "Air conditioning",
        icon: <MaterialIcons name="ac-unit" size={18} color="grey" />,
      },
    ],
  },
  {
    id: "room3",
    area: 2010,
    bedNumber: 2,
    name: "Lamborghini Temerario",
    price: 2000000,
    images: [
      "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
      "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
      "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
    ],
    features: [
      {
        title: "King bed",
        icon: <MaterialIcons name="hotel" size={18} color="grey" />,
      },
      {
        title: "Private balcony",
        icon: <MaterialIcons name="balcony" size={18} color="grey" />,
      },
      {
        title: "Mini bar",
        icon: <MaterialIcons name="local-bar" size={18} color="grey" />,
      },
    ],
  },
];

const tabs = ["Liên quan", "Mới nhất", "Giá"];
const SearchResultScreen = ({ route, navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Liên quan");
  const searchValue = route?.params?.searchValue || "";
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "SearchResultScreen" || !routeName) {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    }

    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation, route]);
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
        renderItem={({ item }) => <SearchVehicalCard room={item} />}
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
