import React from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import colors from "../../util/colors";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatPrice } from "../../util/formatValue";

const AccomodationItem = ({ data, type = "normal" }) => {
  const isNormal = type == "normal";
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { id: data.id })}
      style={[
        {
          // width: 250,
          height: 250,
          marginBottom: 10,

          borderRadius: 22,
          // overflow: "hidden",
          backgroundColor: "white", // Cần có màu nền để shadow hiển thị
          shadowColor: "#999", // Màu bóng
          shadowOffset: { width: 1, height: 1 }, // Độ lệch bóng (X, Y)
          shadowOpacity: 0.5, // Độ mờ
          shadowRadius: 1, // Bán kính mờ
          elevation: 2, // Bóng trên Android
          position: "relative",
        },
        isNormal ? { width: 247, marginLeft: 10, marginRight: 5 } : {},
      ]}
    >
      <Image
        style={[
          {
            // height: 220,
            borderTopLeftRadius: 22, // Bo góc trên bên trái
            borderTopRightRadius: 22, // Bo góc trên bên phải
            //   borderRadius: 12,
            width: "100%",
            objectFit: "cover",
            flex: isNormal ? 3.2 : 2,
          },
        ]}
        source={{ uri: data?.img }}
      ></Image>
      {false && isNormal && (
        <Text
          style={{
            textAlign: "center",
            backgroundColor: colors.blue,
            fontSize: 14,
            fontWeight: 500,
            padding: 2,
            color: "white",
          }}
        >
          {data.feature}
        </Text>
      )}
      <View style={{ padding: 10, gap: 6, flex: 1.5 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{ fontWeight: 500, fontSize: 16, color: colors.textColor }}
          >
            {data.title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="star" size={16} color={colors.mainColor} />
            <Text style={{ fontSize: 14, color: colors.textGray }}>
              {" "}
              {data?.star}
            </Text>
          </View>
        </View>

        <Text style={{ color: colors.textGray, fontSize: 15 }}>
          Available Now
        </Text>
        <View
          style={{
            flexDirection: type != "normal" ? "col" : "row",
            justifyContent: "space-between",
            marginTop: 3,
            gap: 8,
            marginHorizontal: type != "normal" ? 0 : 5,
          }}
        >
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="seat-outline"
              size={18}
              color={colors.mainColor}
            />
            <Text
              style={{
                fontSize: 14,
                letterSpacing: -1,
              }}
            >
              4 seats
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 0, alignItems: "center" }}>
            <MaterialIcons
              name="attach-money"
              size={20}
              color={colors.mainColor}
            />
            <Text
              style={{
                fontSize: 14,
                letterSpacing: -1,
              }}
            >
              {formatPrice(data?.pricingDecreased)}k
            </Text>
          </View>
          {/* <Text
            style={{
              fontSize: 13,
              textDecorationLine: "line-through",
              letterSpacing: -1,
            }}
          >
            đ {data?.historicalCost}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: colors.mainColor,
              letterSpacing: -1,
            }}
          >
            đ {data?.pricingDecreased}
          </Text> */}
        </View>
      </View>
      {/* <View
        style={{ position: "absolute", top: 80, right: -7.5, zIndex: 9999 }}
      >
        <View
          style={{
            width: 0,
            height: 0,
            borderLeftWidth: 8,
            borderLeftColor: "#8C3200",
            borderTopWidth: 6,
            borderTopColor: "transparent",
            borderBottomWidth: 6,
            borderBottomColor: "transparent",
            position: "absolute",
            right: 0, // Đẩy tam giác ra ngoài
            bottom: -7,
          }}
        />
        <Text
          style={{
            padding: 2,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            borderTopRightRadius: 4,
            // borderBottomRightRadius: 8,
            backgroundColor: "#D86F00",
            color: "white",
            paddingHorizontal: 10,
            shadowColor: "#999", // Màu bóng
            shadowOffset: { width: 1, height: 1 }, // Độ lệch bóng (X, Y)
            shadowOpacity: 0.5, // Độ mờ
            shadowRadius: 1, // Bán kính mờ
            elevation: 2, // Bóng trên Android
            fontSize: 12,
          }}
        >
          Tiết kiệm {data?.discount} %
        </Text>
      </View> */}
    </TouchableOpacity>
  );
};

export default AccomodationItem;
