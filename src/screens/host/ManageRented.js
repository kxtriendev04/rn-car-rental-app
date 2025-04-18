import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Text } from "react-native";
import colors from "../../util/colors";
import {
    AntDesign,
    EvilIcons,
    Foundation,
    Ionicons,
    MaterialIcons,
  } from "@expo/vector-icons";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import OrderCard from "../../module/Order/OrderCard";

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
    carImage: "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
    carName: "Maserati MC20",
    phoneNumber: "0901234567",
    location: "123 Nguyễn Trãi, Hà Nội",
    status: "pending",
    pay: "cash",
    delivery: "self"
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
    carImage: "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
    carName: "Maserati MC20",
    phoneNumber: "0902345678",
    location: "456 Lê Lợi, Đà Nẵng",
    status: "approved",
    pay: "cash",
    delivery: "self"
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
    carImage: "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
    carName: "Maserati MC20",
    phoneNumber: "0903456789",
    location: "789 Trường Chinh, TP.HCM",
    status: "completed",
    pay: "cash",
    delivery: "delivery"
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
    carImage: "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
    carName: "Maserati MC20",
    phoneNumber: "0904567890",
    location: "321 Cách Mạng Tháng 8, Cần Thơ",
    status: "rejected",
    pay: "cash",
    delivery: "delivery"
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
    carImage: "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
    carName: "Maserati MC20",
    phoneNumber: "0904567890",
    location: "321 Cách Mạng Tháng 8, Cần Thơ",
    status: "delivering",
    pay: "cash",
    delivery: "delivery"
  }
];

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

const ManageRented = () => {
    const tabs = ["Chờ duyệt", "Đang giao", "Đã giao", "Từ chối", "Hoàn thành"];
    const [selectedTab, setSelectedTab] = useState("Chờ duyệt");

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 30, backgroundColor: colors.whiteColor }}>
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
          </View>
          <FlatList
            data = {rentalOrders}
            renderItem={({item}) => (
              <OrderCard data={item}/>
            )}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text>Bạn chưa có xe nào cả</Text>}
            style={{padding: 5}}
          />
        </SafeAreaView>
    );
};

export default ManageRented;