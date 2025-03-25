import {
  AntDesign,
  Entypo,
  Feather,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import colors from "../../util/colors";
import AccomodationItem from "../../component/home/AccomodationItem";

const categories = [
  {
    title: "Tesla",
    url: "https://www.edigitalagency.com.au/wp-content/uploads/Tesla-logo-red-large-size.png",
  },
  {
    title: "Vinfast",
    url: "https://brasol.vn/wp-content/uploads/2022/09/logo-vinfast-png.png",
  },
  {
    title: "KIA",
    url: "https://bucket.dealervenom.com/2023/05/Kia.png?auto=compress%2Cformat&ixlib=php-3.3.1",
  },
  {
    title: "Toyota",
    url: "https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_001.jpg",
  },
];
const itemList = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Tesla Model X",
    img: "https://i.vietgiaitri.com/2022/12/2/loat-xe-o-to-pho-thong-gia-re-cong-nghe-dinh-cao-dang-mua-nhat-don-nam-moi-2023-731-6773678.jpg",
    discount: 20,
    star: 3,
    location: "Đống Đa, Hà Nội",
    historicalCost: 1620370,
    pricingDecreased: 1215000,
    ratedNumber: 14,
    feature: "Free breakfast",
    rated: "7.5 Very good",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Tesla Model 3",
    img: "https://i.vietgiaitri.com/2022/12/2/loat-xe-o-to-pho-thong-gia-re-cong-nghe-dinh-cao-dang-mua-nhat-don-nam-moi-2023-731-6773678.jpg",
    discount: 20,
    star: 3,
    location: "Cầu giấy, Hà Nội",
    historicalCost: 1620370,
    pricingDecreased: 1115000,
    ratedNumber: 304,
    feature: "Good location",
    rated: "8.0 Execllent",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Tesla Model 3",
    img: "https://i.vietgiaitri.com/2022/12/2/loat-xe-o-to-pho-thong-gia-re-cong-nghe-dinh-cao-dang-mua-nhat-don-nam-moi-2023-731-6773678.jpg",
    discount: 25,
    star: 4,
    location: "Thanh Xuân, Hà Nội",
    historicalCost: 1078210,
    pricingDecreased: 999000,
    ratedNumber: 106,
    feature: "Good reviews",
    rated: "10.0 Exceptional",
  },
];

const HomeCategory = () => {
  const [selectedCate, setSelectedCate] = useState("");
  useEffect(() => {
    setSelectedCate(categories[0].title);
  }, []);
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingBottom: 8,
        paddingTop: 4,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
            paddingTop: 8,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 19,
              fontWeight: 500,
              paddingHorizontal: 15,
              paddingRight: 150,
              lineHeight: 24,
              color: colors.textColor,
            }}
          >
            Top brand
          </Text>
          <Text style={{ paddingHorizontal: 15, color: colors.textGray }}>
            View All {">"}
          </Text>
        </View>
        <FlatList
          // style={{  }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({ item }) => (
            <CategoryItem
              data={item}
              selectedCate={selectedCate}
              setSelectedCate={setSelectedCate}
            />
          )}
          keyExtractor={(item) => item.title}
          style={{ marginBottom: 15, paddingLeft: 9 }}
        />
      </View>
      <Text
        style={{
          fontSize: 19,
          fontWeight: 500,
          marginBottom: 8,
          paddingHorizontal: 15,
          paddingTop: 8,
          paddingRight: 150,
          lineHeight: 24,
          color: colors.textColor,
        }}
      >
        {/* Popular {selectedCate} in your location */}
        Top Rated Cars
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={itemList}
        renderItem={({ item }) => <AccomodationItem data={item} />}
        keyExtractor={(item) => item.id}
        style={{ paddingLeft: 5 }}
      />
    </View>
  );
};

const CategoryItem = ({ data, selectedCate, setSelectedCate }) => {
  const isSelected = selectedCate == data.title;
  const IconComponent = data.library;
  return (
    <TouchableOpacity
      style={{
        marginTop: 12,
        marginLeft: 6,
        marginRight: 5,
        backgroundColor: isSelected ? "#e3e3e3" : colors.greyBackground,
        alignItems: "center",
        paddingHorizontal: 14,
        gap: 8,
        borderRadius: 12,
        paddingVertical: 10,
      }}
      onPress={() => setSelectedCate(data.title)}
    >
      {/* <IconComponent
        name={data.iconName}
        size={20}
        color={isSelected ? "white" : colors.textGray}
      /> */}

      <View
        style={{
          padding: 5, // Khoảng cách giữa border và Image
          backgroundColor: "white", // Màu nền để border tách biệt
          borderRadius: 1000,
          borderWidth: 1, // Độ dày của viền

          borderColor: "#e6e6e6", // Màu viền
        }}
      >
        <View
          style={{
            padding: 10,
            borderRadius: 1000,
          }}
        >
          <Image
            source={{
              uri: data.url,
            }}
            style={{ width: 38, height: 38, resizeMode: "cover" }}
          />
        </View>
      </View>

      <Text
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: isSelected ? "black" : colors.textGray,
        }}
      >
        {data.title}
      </Text>
    </TouchableOpacity>
  );
};

export default HomeCategory;
