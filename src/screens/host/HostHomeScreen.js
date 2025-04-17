import { Fontisto, Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../util/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import AccomodationItem from "../../component/home/AccomodationItem";
import OrderCard from "../../module/Order/OrderCard";

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

const orders = [
  {
    id: "1",
    carImage: "https://i.imgur.com/xyz123.jpg",
    carName: "Tesla Roadster",
    dueDate: "11 Sep, 2023",
    userName: "Chris",
    phoneNumber: "+1202-555-0877",
    status: "In Use"
  },
  {
    id: "2",
    carImage: "https://i.imgur.com/xyz123.jpg",
    carName: "Tesla Roadster",
    dueDate: "11 Sep, 2023",
    userName: "Chris",
    phoneNumber: "+1202-555-0877",
    status: "In Use"
  },
];

const HostHomeScreen = () => {
    return(
      <SafeAreaView style={{paddingHorizontal: 15, backgroundColor: colors.whiteColor}}>
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
                Bắc Từ Liêm, Hà Nội
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
              name="bell"
              size={24}
              color="black"
            />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={{fontWeight: 600, fontSize: 16}}>Xe của tôi</Text>
          <TouchableOpacity>
            <Text style={{color: colors.mainColor, fontWeight: 600, fontSize: 16}}>+ thêm xe của bạn</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data = {cars}
          renderItem={({item}) => (
            <AccomodationItem data={item}/>
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>Bạn chưa có xe nào cả</Text>}
          horizontal={true}
        />
        <View style={styles.container}>
          <Text style={{fontWeight: 600, fontSize: 16}}>Đơn hàng của bạn</Text>
          <TouchableOpacity>
            <Text style={{color: "darkgrey", fontWeight: 600, fontSize: 16}}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data = {orders}
          renderItem={({item}) => (
            <OrderCard data={item}/>
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>Bạn chưa có xe nào cả</Text>}
        />
      </SafeAreaView>
    )
  };
  
export default HostHomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 60,
    alignItems: "center",
  },
})