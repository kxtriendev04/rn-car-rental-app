import { Fontisto, Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../util/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AccomodationItem from "../../component/home/AccomodationItem";
import OrderCard from "../../module/Order/OrderCard";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import api from "../../util/api";
import { AuthContext } from "../../context/AuthContext";

const cars = [
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

const rentalOrders = [
  {
    id: "ORD001",
    owner: "Nguyễn Văn A",
    renter: "Trần Thị B",
    createdAt: "2025-04-01",
    start: "2025-04-05",
    end: "2025-04-10",
    original: 5000000,
    discount: 500000,
    total: 4500000,
    carImage:
      "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
    carName: "Maserati MC20",
    phoneNumber: "0901234567",
    location: "123 Nguyễn Trãi, Hà Nội",
    status: "pending",
    pay: "cash",
    delivery: "self",
  },
  {
    id: "ORD002",
    owner: "Lê Hữu C",
    renter: "Phạm Văn D",
    createdAt: "2025-04-03",
    start: "2025-04-06",
    end: "2025-04-08",
    original: 3000000,
    discount: 300000,
    total: 2700000,
    carImage:
      "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
    carName: "Maserati MC20",
    phoneNumber: "0902345678",
    location: "456 Lê Lợi, Đà Nẵng",
    status: "approved",
    pay: "cash",
    delivery: "self",
  },
  {
    id: "ORD003",
    owner: "Đặng Thị E",
    renter: "Ngô Quốc F",
    createdAt: "2025-04-02",
    start: "2025-04-07",
    end: "2025-04-09",
    original: 4000000,
    discount: 0,
    total: 4000000,
    carImage:
      "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
    carName: "Maserati MC20",
    phoneNumber: "0903456789",
    location: "789 Trường Chinh, TP.HCM",
    status: "completed",
    pay: "cash",
    delivery: "delivery",
  },
  {
    id: "ORD004",
    owner: "Phan Minh G",
    renter: "Hoàng Mai H",
    createdAt: "2025-04-04",
    start: "2025-04-10",
    end: "2025-04-15",
    original: 6000000,
    discount: 1000000,
    total: 5000000,
    carImage:
      "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
    carName: "Maserati MC20",
    phoneNumber: "0904567890",
    location: "321 Cách Mạng Tháng 8, Cần Thơ",
    status: "rejected",
    pay: "cash",
    delivery: "delivery",
  },
  {
    id: "ORD005",
    owner: "Phan Minh G",
    renter: "Hoàng Mai H",
    createdAt: "2025-04-04",
    start: "2025-04-10",
    end: "2025-04-15",
    original: 6000000,
    discount: 1000000,
    total: 5000000,
    carImage:
      "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
    carName: "Maserati MC20",
    phoneNumber: "0904567890",
    location: "321 Cách Mạng Tháng 8, Cần Thơ",
    status: "delivering",
    pay: "cash",
    delivery: "delivery",
  },
];

const HostHomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const fetchingData = async () => {
    try {
      const response = await api.get("/vehicles/owner/" + user.id);
      setData(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.whiteColor }}
      edges={["top"]}
    >
      <ScrollView style={{ paddingHorizontal: 15 }}>
        <View style={styles.container}>
          {/* <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                marginBottom: 8,
                fontWeight: 500,
                color: colors.textGray,
              }}
            >
              Current location
            </Text>
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <Ionicons
                name="location-outline"
                size={20}
                color={colors.mainColor}
              />
              <Text style={{ fontWeight: 600, fontSize: 16 }}>
                Bắc Từ Liêm, Hà Nội
              </Text>
            </View>
          </View> */}
          {/* <View
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
              name="bell"
              size={24}
              color="black"
              onPress={() => {
                navigation.navigate("UserStackNavigator", {
                  screen: "Notification",
                });
              }}
            />
          </View> */}
          <Text style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
            Xin chào,{" "}
            <Text style={{ color: colors.mainColor }}>{user.fullName}</Text>
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>Xe của tôi</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HostStackNavigator", {
                screen: "AddCar",
              });
            }}
          >
            <Text
              style={{ color: colors.mainColor, fontWeight: 600, fontSize: 16 }}
            >
              + thêm xe của bạn
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => <AccomodationItem data={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>Bạn chưa có xe nào cả</Text>}
          horizontal={true}
        />
        <View style={styles.container}>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            Đơn hàng của bạn
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UserStackNavigator", {
                screen: "ManageRented",
              });
            }}
          >
            <Text style={{ color: "darkgrey", fontWeight: 600, fontSize: 16 }}>
              Xem tất cả
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 5 }}>
          {rentalOrders.length > 0 ? (
            rentalOrders
              .slice(0, 3)
              .map((item) => <OrderCard key={item.id.toString()} data={item} />)
          ) : (
            <Text>Bạn chưa có đơn hàng nào</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HostHomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // height: 60,
    marginBottom: 16,
    alignItems: "center",
  },
});
