import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import colors from "../../util/colors";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { formatPrice } from "../../util/formatValue";
import { API_URL_IMG } from "../../util/api";
import api from "../../util/api";
import { AuthContext } from "../../context/AuthContext";

const AccomodationItem = ({ data, type = "normal" }) => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [likedVehicles, setLikedVehicles] = useState({});
  const [imageLoading, setImageLoading] = useState(true);

  const imageUrl = data?.images?.[0]?.imageUrl;
  const isAbsoluteUrl =
    imageUrl?.startsWith("http://") || imageUrl?.startsWith("https://");
  const fullImageUrl = imageUrl
    ? isAbsoluteUrl
      ? imageUrl
      : `${API_URL_IMG}${imageUrl}`
    : null;

  const fetchFavorites = async () => {
    try {
      const res = await api.get(`/favorites?userId=${user.id}`);
      const favorites = res.data.results || [];
      const likedVehiclesMap = {};
      favorites.forEach((vehicle) => {
        likedVehiclesMap[vehicle.id] = true;
      });
      setLikedVehicles(likedVehiclesMap);
    } catch (e) {
      console.log("Lỗi khi lấy danh sách yêu thích: ", e);
      Alert.alert("Lỗi", "Không thể lấy danh sách yêu thích");
    }
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) fetchFavorites();
  }, [isFocused]);

  const toggleLike = async () => {
    const wasLiked = !!likedVehicles[data.id]; //ép về boolean
    setLikedVehicles((prev) => ({
      ...prev,
      [data.id]: !wasLiked,
    }));

    try {
      if (!wasLiked) {
        // Thêm vào yêu thích
        const res = await api.post(
          `/favorites?userId=${user.id}&vehicleId=${data.id}`
        );
        if (res.status === 200 || res.status === 201) {
          await fetchFavorites();
        } else {
          throw new Error("Thêm yêu thích thất bại");
        }
      } else {
        // Xóa khỏi yêu thích
        const res = await api.delete(
          `/favorites?userId=${user.id}&vehicleId=${data.id}`
        );
        if (res.status === 200 || res.status === 204) {
          await fetchFavorites(); // Đồng bộ lại danh sách yêu thích
        } else {
          throw new Error("Xóa yêu thích thất bại");
        }
      }
    } catch (e) {
      // Rollback nếu tym bị lỗi
      setLikedVehicles((prev) => ({
        ...prev,
        [data.id]: wasLiked,
      }));
      console.log("Đã có lỗi xảy ra: ", e);
      Alert.alert(
        "Lỗi",
        `Không thể ${!wasLiked ? "thêm" : "xóa"} xe yêu thích`
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("HomeStack", {
          screen: "ProductDetail",
          params: { id: data.id },
        });
      }}
      style={[
        {
          minHeight: type == "full" ? 320 : 250,
          marginBottom: 10,
          borderRadius: 22,
          backgroundColor: "white",
          shadowColor: "#999",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 1,
          elevation: 2,
          position: "relative",
        },
        type === "normal" && type !== "masonry"
          ? { width: 247, marginLeft: 10, marginRight: 5 }
          : { width: "100%" },
      ]}
    >
      <View style={{ position: "relative", flex: type === "normal" ? 3.2 : 2 }}>
        <View
          style={{ flex: type === "normal" ? 3.2 : 2, position: "relative" }}
        >
          {imageLoading && (
            <ActivityIndicator
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                zIndex: 1,
                transform: [{ translateX: -15 }, { translateY: -15 }],
              }}
              size="large"
              color={colors.mainColor}
            />
          )}
          <Image
            onLoadEnd={() => setImageLoading(false)}
            style={{
              borderTopLeftRadius: 22,
              borderTopRightRadius: 22,
              width: "100%",
              height: type == "full" ? 200 : type == "masonry" ? 120 : 150,
              // height: 500,
              objectFit: "cover",
            }}
            source={
              fullImageUrl
                ? { uri: fullImageUrl }
                : require("../../../assets/defaultCar.png")
            }
          />
        </View>
        <TouchableOpacity
          onPress={toggleLike}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: colors.whiteColor,
            borderRadius: 20,
            padding: 5,
            opacity: likedVehicles[data.id] ? 0.8 : 0.5,
          }}
        >
          <AntDesign
            name={likedVehicles[data.id] ? "heart" : "hearto"}
            size={20}
            color={likedVehicles[data.id] ? colors.mainColor : "black"}
          />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10, gap: 6, flex: 1.5 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontWeight: 500,
              fontSize: 16,
              color: colors.textColor,
              maxWidth: "80%",
            }}
            numberOfLines={1}
          >
            {data?.name}
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
          {data?.status === "Available" ? "Sẵn sàng cho thuê" : "Không có sẵn"}
        </Text>
        <View
          style={{
            flexDirection: type !== "normal" ? "column" : "row",
            justifyContent: "space-between",
            marginTop: 3,
            gap: 8,
            marginHorizontal: type !== "normal" ? 0 : 5,
          }}
        >
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="globe-model"
              size={18}
              color={colors.mainColor}
            />
            <Text style={{ fontSize: 14, letterSpacing: -1 }}>
              {data?.year}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 0, alignItems: "center" }}>
            <MaterialIcons
              name="attach-money"
              size={20}
              color={colors.mainColor}
            />
            <Text style={{ fontSize: 14, letterSpacing: -1 }}>
              {formatPrice(data?.pricePerDay)} VNĐ
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AccomodationItem;
