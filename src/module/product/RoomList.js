import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import colors from "../../util/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyButton from "../../component/MyButton";
import { useNavigation } from "@react-navigation/native";

// const rooms = [
//   {
//     id: "room1",
//     name: "Deluxe King Room",
//     price: 1500000,
//     img: "https://example.com/room1.jpg",
//   },
// ];

const RoomList = ({ rooms = [] }) => {
  return (
    <View
      style={{
        paddingVertical: 15,
        borderRadius: 15,
        backgroundColor: colors.lightMainColor,
      }}
    >
      <Text
        style={{
          paddingLeft: 15,
          fontSize: 17,
          fontWeight: 600,
          marginBottom: 12,
          color: colors.mainColor,
        }}
      >
        Những xe khác của Triển
      </Text>
      {/* Schedule */}
      <View style={{ height: 50, backgroundColor: "white" }}>
        <Text>Lịch</Text>
      </View>
      {/* Room Item */}
      <View>
        {rooms &&
          rooms.map((room) => <RoomItem room={room} key={room.id}></RoomItem>)}
      </View>
    </View>
  );
};

const RoomItem = ({ room }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 16,
        borderRadius: 8,
        backgroundColor: "white",
        margin: 10,
        overflow: "hidden",
      }}
    >
      <FlatList
        style={{}}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={room?.images}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: 300,
              height: 150,
            }}
          >
            <Image
              source={{ uri: room?.images[index] }} // Dùng ảnh sản phẩm làm background
              style={{ flex: 1 }}
              resizeMode="cover"
            ></Image>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text
        style={{
          fontSize: 17,
          backgroundColor: colors.greyBackground,
          paddingHorizontal: 10,
          paddingVertical: 10,
          fontWeight: 600,
        }}
      >
        {room?.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          paddingHorizontal: 10,
          paddingVertical: 12,
        }}
      >
        <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
          <MaterialCommunityIcons name="ruler" size={18} color="black" />
          <Text style={{ fontSize: 14 }}>Đời xe: {room?.area}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
          <MaterialCommunityIcons
            name="seat-recline-normal"
            size={18}
            color="black"
          />

          <Text style={{ fontSize: 14 }}>{room?.bedNumber} Chỗ</Text>
        </View>
      </View>
      <View>
        <FlatList
          style={{ marginBottom: 6, marginRight: 15 }}
          horizontal
          data={room?.features}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                alignItems: "center",
                backgroundColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 1.5,
                borderRadius: 12,
                gap: 4,
              }}
            >
              {item.icon}
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: "#A0A0A0",
                }}
              >
                {item.title}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
        <View
          style={{
            height: 1.25,
            borderRadius: 100,
            marginHorizontal: 15,
            opacity: 0.3,
            backgroundColor: colors.textGray,
            marginBottom: 4,
          }}
        ></View>
      </View>
      <View
        style={{
          backgroundColor: colors.greyBackground,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          alignItems: "flex-end",
        }}
      >
        <View style={{ gap: 6 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: colors.mainColor,
                letterSpacing: -1,
              }}
            >
              đ {room?.price}
            </Text>
            <Text
              style={{
                fontSize: 13,
                textDecorationLine: "line-through",
                letterSpacing: -1,
              }}
            >
              đ {room?.price}
            </Text>
          </View>
          <Text style={{ fontSize: 12, width: 200, color: colors.textGray }}>
            Tổng giá đ {room?.price} VNĐ chưa bao gồm thuế
          </Text>
        </View>
        <MyButton
          onPress={() => navigation.navigate("ProductCheckout")}
          title="Đặt"
        ></MyButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RoomList;
