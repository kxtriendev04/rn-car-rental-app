import { Fontisto, Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../util/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AccomodationItem from "../../component/home/AccomodationItem";
import OrderCard from "../../module/Order/OrderCard";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import api from "../../util/api";
import { AuthContext } from "../../context/AuthContext";
import { Alert } from "react-native";

const HostHomeScreen = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const isFocused = useIsFocused();

  const fetchingCars = async () => {
    try {
      const response = await api.get("/vehicles/owner/" + user.id);
      setData(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchingOrders = async () => {
    try {
      const response = await api.get(`/rentals/user/split/${user.id}`);
      if (response.status === 200) setOrder(response.data.results.content);
    } catch (e) {
      console.log("Mã lỗi: ", e);
      Alert.alert("Không thể lấy dữ liệu đơn hàng");
    }
  };

  // useEffect(() => {
  //   fetchingOrders();
  //   fetchingCars();
  // }, []);
  useEffect(() => {
    if (isFocused) {
      fetchingOrders();
      fetchingCars();
    }
  }, [isFocused]);

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
          {order.length > 0 ? (
            order
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
