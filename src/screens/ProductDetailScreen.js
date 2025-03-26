import {
  AntDesign,
  EvilIcons,
  Feather,
  FontAwesome5,
  Foundation,
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
  Button,
  Dimensions,
} from "react-native";
import colors from "../util/colors";
import FeatureItem from "../component/FeatureItem";
import MyButton from "../component/MyButton";
import AccomodationRated from "../module/product/AccomodationRated";
import AcommodationDesc from "../module/product/AcommodationDesc";
import RoomList from "../module/product/RoomList";
import ImageList from "../component/ImageList";
import AcommodationLocation from "../module/product/AcommodationLocation";
import HeaderNavigation from "../component/HeaderNavigation";
import { formatDate, formatPrice } from "../util/formatValue";

// Giả sử bạn có danh sách dữ liệu để lấy chi tiết sản phẩm

const data = {
  id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  title: "Podche M12 Full Option",
  images: [
    {
      id: 1,
      uri: "https://images2.thanhnien.vn/528068263637045248/2025/1/9/kia-carnival-hybrid-ra-mat-viet-nam-xe-thanhnien-17363979709501869639727.jpg",
    },
    {
      id: 2,
      uri: "https://images2.thanhnien.vn/528068263637045248/2025/1/9/kia-carnival-hybrid-ra-mat-viet-nam-xe-thanhnien-17363979709501869639727.jpg",
    },
    {
      id: 3,
      uri: "https://images2.thanhnien.vn/528068263637045248/2025/1/9/kia-carnival-hybrid-ra-mat-viet-nam-xe-thanhnien-17363979709501869639727.jpg",
    },
    {
      id: 4,
      uri: "https://images2.thanhnien.vn/528068263637045248/2025/1/9/kia-carnival-hybrid-ra-mat-viet-nam-xe-thanhnien-17363979709501869639727.jpg",
    },
  ],
  discount: 20,
  star: 3,
  location: "Đống Đa, Hà Nội",
  description:
    "Lamborghini vừa ra mắt mẫu siêu xe mới mang tên Temerario, kế nhiệm dòng Huracan, với nhiều cải tiến đáng chú ý. Động cơ V10 hút khí tự nhiên đã được thay thế bằng hệ truyền động plug-in hybrid, kết hợp động cơ V8 4.0L tăng áp kép cùng ba mô-tơ điện, cho tổng công suất 920 mã lực. \n\nXe có khả năng tăng tốc từ 0–100 km/h trong 2,7 giây và đạt tốc độ tối đa 340 km/h. ​\n\nVề thiết kế, Temerario mang dáng vẻ kết hợp giữa Revuelto và Huracan, với kích thước dài x rộng x cao lần lượt là 4.706 x 1.996 x 1.201 mm, lớn hơn so với Huracan LP 610-4. Hệ thống đèn chiếu sáng được thiết kế nhỏ gọn, sắc nét với dải đèn ban ngày LED hình lục giác. Xe trang bị mâm kích thước so le, 20 inch phía trước và 21 inch phía sau, cùng hệ thống phanh Carbon Ceramic Brakes Plus",
  historicalCost: 1620370,
  pricingDecreased: 1215000,
  ratedNumber: 14,
  checkInTime: "14:00",
  checkOutTime: "12:00",
  feature: [
    {
      title: "Không gian thoải mái",
      icon: <Foundation name="social-myspace" size={24} color="black" />,
    },
    {
      title: "Số tự động",
      icon: <EvilIcons name="gear" size={24} color="black" />,
    },
    {
      title: "Giá rẻ",
      icon: <Ionicons name="pricetags-outline" size={24} color="black" />,
    },
    {
      title: "7.5",
      icon: <AntDesign name="star" size={16} color="orange" />,
    },
  ],
  rated: "7.5",
  rooms: [
    {
      id: "room1",
      area: 2007,
      bedNumber: 2,
      name: "Lamborghini Revuelto",
      price: 1500000,
      images: [
        "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
        "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
        "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
      ],
      features: [
        {
          title: "Không gian thoải mái",
          icon: <Foundation name="social-myspace" size={24} color="black" />,
        },
        {
          title: "Số tự động",
          icon: <EvilIcons name="gear" size={24} color="black" />,
        },
        {
          title: "Giá rẻ",
          icon: <Ionicons name="pricetags-outline" size={24} color="black" />,
        },
        {
          title: "7.5",
          icon: <AntDesign name="star" size={16} color="orange" />,
        },
      ],
    },
    {
      id: "room2",
      area: 2018,
      bedNumber: 1,
      name: "Lamborghini Veneno Roadster",
      price: 1200000,
      images: [
        "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
        "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
        "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
        "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
      ],
      features: [
        {
          title: "Two single beds",
          icon: <MaterialIcons name="single-bed" size={18} color="black" />,
        },
        {
          title: "Garden view",
          icon: <MaterialIcons name="grass" size={18} color="black" />,
        },
        {
          title: "Air conditioning",
          icon: <MaterialIcons name="ac-unit" size={18} color="black" />,
        },
      ],
    },
    {
      id: "room3",
      area: 2010,
      bedNumber: 2,
      name: "Lamborghini Temerario",
      price: 2000000,
      images: [
        "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
        "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
        "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
      ],
      features: [
        {
          title: "King bed",
          icon: <MaterialIcons name="hotel" size={18} color="black" />,
        },
        {
          title: "Private balcony",
          icon: <MaterialIcons name="balcony" size={18} color="black" />,
        },
        {
          title: "Mini bar",
          icon: <MaterialIcons name="local-bar" size={18} color="black" />,
        },
      ],
    },
  ],
};
const DateNow = new Date().toISOString().split("T")[0];
const Tomorrow = new Date(new Date().setDate(new Date().getDate() + 2))
  .toISOString()
  .split("T")[0];
const ProductDetailScreen = ({ route }) => {
  const [time, setTime] = useState({
    pickupDate: DateNow,
    returnDate: Tomorrow,
    pickupTime: 5,
    returnTime: 22,
  });
  const navigation = useNavigation();
  // Lấy id từ tham số navigation
  const { id } = route.params;

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "ProductDetail" || !routeName) {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    }

    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation, route]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginBottom: 100 }}>
        <HeaderNavigation
          title={data.title}
          navigation={navigation}
          rightIcon=<Feather name="save" size={24} color="black" />
        />
        <View style={{ backgroundColor: colors.whiteColor, paddingBottom: 0 }}>
          <ImageList images={data?.images}></ImageList>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data.feature}
            renderItem={({ item }) => <FeatureItem feature={item} />}
            keyExtractor={(item, index) => index.toString()} // Tránh cảnh báo key
            contentContainerStyle={{ paddingVertical: 10 }} // Đảm bảo không bị cắt trên/dưới
          />
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 18,
            backgroundColor: "white",
            gap: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 500, paddingRight: 50 }}>
              {data.title}
            </Text>

            {/* <Text style={{ fontSize: 13, color: colors.textGray }}></Text> */}
            <Text style={{}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "orange",
                }}
              >
                {formatPrice(data.pricingDecreased)}
              </Text>{" "}
              VNĐ/day
            </Text>
          </View>
          {/* Star */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {Array.from({ length: data.star }, (_, index) => (
              <AntDesign key={index} name="star" size={14} color="orange" />
            ))}
          </View>
          <View style={{ flexDirection: "row" }}>
            <EvilIcons
              name="location"
              style={{ padding: 0, margin: 0 }}
              size={24}
              color={colors.mainColor}
            />
            <Text>{data.location}</Text>
          </View>
        </View>
        <View
          style={{ height: 15, backgroundColor: colors.greyBackground }}
        ></View>
        {/* Host info */}
        <View
          style={{
            backgroundColor: colors.whiteColor,
            paddingHorizontal: 15,
            paddingBottom: 15,
          }}
        >
          <Text
            style={{
              fontWeight: 600,
              fontSize: 17,
              marginBottom: 16,
              marginTop: 22,
            }}
          >
            Host
          </Text>
          <View
            style={{
              padding: 10,
              borderRadius: 16,
              backgroundColor: colors.lightLightMainColor,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Image
                  source={{
                    uri: "https://i.pinimg.com/564x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg",
                  }}
                  style={{ width: 56, height: 56, borderRadius: 100 }}
                />
                <View style={{ flexDirection: "row", gap: 4 }}>
                  <AntDesign name="star" size={16} color={colors.mainColor} />
                  <Text>{data.star}</Text>
                </View>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}
                >
                  Khúc Triển
                </Text>
                <Text>179 Trips • Joined Sep 2020</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 10, padding: 5 }}>
              <SimpleLineIcons
                name="phone"
                size={20}
                color={colors.mainColor}
              />
              <AntDesign name="message1" size={20} color={colors.mainColor} />
            </View>
          </View>
        </View>

        <View
          style={{ height: 15, backgroundColor: colors.greyBackground }}
        ></View>
        {/* Trip dates */}
        <View
          style={{
            backgroundColor: colors.whiteColor,
            paddingHorizontal: 15,
            paddingBottom: 15,
          }}
        >
          <Text
            style={{
              fontWeight: 600,
              fontSize: 17,
              marginBottom: 16,
              marginTop: 22,
            }}
          >
            Trip dates
          </Text>
          <View
            style={{
              // padding: 10,
              borderRadius: 16,
              // backgroundColor: "red",
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#e7e7e7",
              paddingVertical: 18,
              paddingHorizontal: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
              }}
            >
              <Ionicons
                name="calendar-outline"
                size={24}
                color={colors.mainColor}
              />
              <Text style={{ fontWeight: 500 }}>
                {formatDate(time.pickupDate)}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("TripDateTimePicker", { time, setTime })
              }
            >
              <Text style={{ fontWeight: 500, color: colors.mainColor }}>
                Change
              </Text>
              <AntDesign name="right" size={16} color={colors.mainColor} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ height: 15, backgroundColor: colors.greyBackground }}
        ></View>
        {/* Acommodation Rated */}
        <AccomodationRated
          ratedNumber={data.ratedNumber}
          rated={data.rated}
        ></AccomodationRated>
        <View
          style={{ height: 15, backgroundColor: colors.greyBackground }}
        ></View>
        {/* Acommodation Desc */}
        <AcommodationDesc description={data.description}></AcommodationDesc>
        <View
          style={{ height: 15, backgroundColor: colors.greyBackground }}
        ></View>
        {/* Acommodation Location */}
        <AcommodationLocation />
        <View
          style={{ height: 15, backgroundColor: colors.greyBackground }}
        ></View>
        {/* Room List */}
        {/* <RoomList rooms={data.rooms}></RoomList> */}
        {/* Room List với onLayout để lấy tọa độ Y */}
        <View
        // onLayout={(event) => {
        //   const { y } = event.nativeEvent.layout;
        //   setRoomListY(y);
        // }}
        >
          <RoomList rooms={data.rooms}></RoomList>
        </View>
        <View
          style={{ height: 15, backgroundColor: colors.greyBackground }}
        ></View>
        {/* Acommodation Privacy*/}
        <View
          style={{
            borderRadius: 15,
            backgroundColor: colors.whiteColor,
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Chính sách khi thuê xe
          </Text>
          <View style={{ gap: 20, marginBottom: 10 }}>
            <View>
              <View style={{ flexDirection: "row", gap: 8, marginBottom: 10 }}>
                <AntDesign
                  name="clockcircleo"
                  size={18}
                  color={colors.mainColor}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Giờ nhận xe, trả xe
                </Text>
              </View>
              <View style={{ gap: 4 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 26,
                  }}
                >
                  <Text>Nhận xe</Text>
                  <Text>
                    từ{" "}
                    <Text style={{ fontWeight: 700 }}>{data.checkInTime}</Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 26,
                  }}
                >
                  <Text>Trả xe</Text>
                  <Text>
                    trước{" "}
                    <Text style={{ fontWeight: 700 }}>{data.checkOutTime}</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={{}}>
              <View style={{ flexDirection: "row", gap: 8, marginBottom: 10 }}>
                <AntDesign
                  name="clockcircleo"
                  size={18}
                  color={colors.mainColor}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Giờ nhận xe, trả xe
                </Text>
              </View>
              <View style={{ gap: 4 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 26,
                  }}
                >
                  <Text>Nhận xe</Text>
                  <Text>
                    từ{" "}
                    <Text style={{ fontWeight: 700 }}>{data.checkInTime}</Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 26,
                  }}
                >
                  <Text>Trả xe</Text>
                  <Text>
                    trước{" "}
                    <Text style={{ fontWeight: 700 }}>{data.checkOutTime}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ height: 15, backgroundColor: colors.greyBackground }}
        ></View>

        <Text>{id}</Text>
      </ScrollView>

      {/* Fixed Component */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: colors.whiteColor,
        }}
      >
        <View
          style={{
            height: 35,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: colors.mainColor,
          }}
        ></View>
        <View
          style={{
            height: 96,
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 16,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View>
            <Text
              style={{ fontSize: 12, color: colors.textGray, marginBottom: 6 }}
            >
              Giá bắt đầu từ
            </Text>
            <Text style={{ fontSize: 16, color: "orange", fontWeight: 600 }}>
              {formatPrice(data.pricingDecreased)} VND
            </Text>
          </View>
          <MyButton
            onPress={() => navigation.navigate("ProductCheckout")}
            title="Đặt xe"
            // onPress={scrollToRoomList} // Gọi hàm cuộn khi nhấn
            buttonStyle={{ paddingVertical: 16 }}
          ></MyButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
  background: {
    height: 220,
    borderRadius: 30,
    marginHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 500,
  },
  icon: {
    // shadowColor: "#999", // Màu bóng
    // shadowOffset: { width: 1, height: 1 }, // Độ lệch bóng (X, Y)
    // shadowOpacity: 0.5, // Độ mờ
    // shadowRadius: 1, // Bán kính mờ
    // elevation: 2, // Bóng trên Android
  },
  headerButtonContainer: {
    padding: 8,
    // borderColor: colors.borderColor,
    // borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#999", // Màu bóng
    shadowOffset: { width: 1, height: 1 }, // Độ lệch bóng (X, Y)
    shadowOpacity: 0.5, // Độ mờ
    shadowRadius: 2, // Bán kính mờ
    elevation: 2, // Bóng trên Android
  },
});

export default ProductDetailScreen;
