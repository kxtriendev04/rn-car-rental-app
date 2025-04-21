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
import api from "../../util/api";

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
const HomeCategory = () => {
  const [selectedCate, setSelectedCate] = useState("");
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    setSelectedCate(categories[0].title);
  }, []);

  const fetchingData = async () => {
    try {
      const response = await api.get("/vehicles/brand?brand=" + selectedCate);
      setVehicles(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchingData();
  }, [selectedCate]);

  return (
    <View
      style={{
        backgroundColor: "white",
        paddingBottom: 8,
        paddingTop: 4,
        borderRadius: 16,
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
            Hãng xe nổi bật
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
        Những chiếc xe tốt nhất
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={vehicles}
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
