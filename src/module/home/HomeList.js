import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../../util/colors";
import { useNavigation } from "@react-navigation/native";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Tesla AI",
    img: "https://i1-vnexpress.vnecdn.net/2022/12/14/Kia-Sorento-Hybrid_1671001157.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=1-sPT8ES4QUDqEwST55phQ&t=image",
    discount: 20,
    star: 3,
    location: "Đống Đa, Hà Nội",
    historicalCost: 1620370,
    pricingDecreased: 1215000,
    ratedNumber: 14,
    rated: "7.5 Very good",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Tesla A3",
    img: "https://i1-vnexpress.vnecdn.net/2022/12/14/Kia-Sorento-Hybrid_1671001157.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=1-sPT8ES4QUDqEwST55phQ&t=image",
    discount: 20,
    star: 3,
    location: "Cầu giấy, Hà Nội",
    historicalCost: 1620370,
    pricingDecreased: 1115000,
    ratedNumber: 304,
    rated: "8.0 Execllent",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Tesla Z",
    img: "https://i1-vnexpress.vnecdn.net/2022/12/14/Kia-Sorento-Hybrid_1671001157.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=1-sPT8ES4QUDqEwST55phQ&t=image",
    discount: 25,
    star: 4,
    location: "Thanh Xuân, Hà Nội",
    historicalCost: 1078210,
    pricingDecreased: 999000,
    ratedNumber: 106,
    rated: "10.0 Exceptional",
  },
];

const HomeList = ({ title = "Limited time sale in Hanoi" }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingBottom: 8,
      }}
    >
      <Text
        style={{
          fontSize: 19,
          fontWeight: 500,
          marginBottom: 8,
          paddingHorizontal: 15,
          paddingTop: 8,
          lineHeight: 24,
          paddingRight: 200,
          color: colors.textColor,
        }}
      >
        {title}
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={DATA}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={(item) => item.id}
        style={{ paddingLeft: 5 }}
      />
    </View>
  );
};

const Item = ({ data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { id: data.id })}
      style={{
        width: 250,
        height: 350,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 5,
        borderRadius: 16,
        // overflow: "hidden",
        backgroundColor: "white", // Cần có màu nền để shadow hiển thị
        shadowColor: "#999", // Màu bóng
        shadowOffset: { width: 1, height: 1 }, // Độ lệch bóng (X, Y)
        shadowOpacity: 0.5, // Độ mờ
        shadowRadius: 1, // Bán kính mờ
        elevation: 2, // Bóng trên Android
        position: "relative",
      }}
    >
      <Image
        style={{
          width: "100%",
          height: 150,
          objectFit: "cover",
          flex: 2,
          borderTopLeftRadius: 16, // Bo góc trên bên trái
          borderTopRightRadius: 16,
        }}
        source={{ uri: data?.img }}
      ></Image>
      <View style={{ padding: 10, gap: 6, flex: 1.3 }}>
        <Text
          style={{ fontWeight: 500, fontSize: 16, color: colors.textColor }}
        >
          {data.title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {Array.from({ length: data.star }, (_, index) => (
            <AntDesign key={index} name="star" size={16} color="orange" />
          ))}
          <Entypo name="location-pin" size={16} color="gray" />
          <Text style={{ color: colors.textGray }}>{data.location}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: colors.blue,
              fontWeight: 500,
              paddingRight: 5,
            }}
          >
            {data?.rated}
          </Text>
          <Text style={{ fontSize: 13, color: colors.textGray }}>
            {data?.ratedNumber + " reviews"}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.7,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 8,
            marginLeft: 8,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: 500,
              color: colors.mainColor,
              letterSpacing: -1,
            }}
          >
            {" "}
            đ {data?.pricingDecreased}
          </Text>
          <Text
            style={{
              fontSize: 13,
              textDecorationLine: "line-through",
              letterSpacing: -1,
            }}
          >
            đ {data?.historicalCost}
          </Text>
        </View>
      </View>
      <View style={{ position: "absolute", top: 15, right: 15 }}>
        <Text
          style={{
            padding: 2,
            borderRadius: 2,
            backgroundColor: colors.mainColor,
            color: "white",
            paddingHorizontal: 10,
            shadowColor: "#999", // Màu bóng
            shadowOffset: { width: 1, height: 1 }, // Độ lệch bóng (X, Y)
            shadowOpacity: 0.5, // Độ mờ
            shadowRadius: 1, // Bán kính mờ
            elevation: 2, // Bóng trên Android
          }}
        >
          {data?.discount} %
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeList;
