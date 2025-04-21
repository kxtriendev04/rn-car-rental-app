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
  FontAwesome,
} from "@expo/vector-icons";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
import {
  calculateDays,
  formatDates,
  formatPrice,
  formatTime,
} from "../util/formatValue";
import { TimeContext } from "../context/TimeContext";
import RadioButton from "../component/RadioButton";
import AccomodationItem from "../component/home/AccomodationItem";
import api from "../util/api";
import { AuthContext } from "../context/AuthContext";

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
      icon: <Foundation name="social-myspace" size={20} color="black" />,
    },
    {
      title: "Số tự động",
      icon: <EvilIcons name="gear" size={20} color="black" />,
    },
    {
      title: "Giá rẻ",
      icon: <Ionicons name="pricetags-outline" size={20} color="black" />,
    },
    {
      title: "7.5",
      icon: <AntDesign name="star" size={16} color="orange" />,
    },
  ],
  rated: "7.5",
  rooms: [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Tesla Model X",
      img: "https://i.vietgiaitri.com/2022/12/2/loat-xe-o-to-pho-thong-gia-re-cong-nghe-dinh-cao-dang-mua-nhat-don-nam-moi-2023-731-6773678.jpg",
      discount: 20,
      star: 3,
      location: "Đống Đa, Hà Nội",
      historicalCost: 1620370,
      pricingDecreased: 1215000,
      ratedNumber: 14,
      feature: "Free breakfast",
      rated: "7.5 Very good",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Tesla Model 3",
      img: "https://i.vietgiaitri.com/2022/12/2/loat-xe-o-to-pho-thong-gia-re-cong-nghe-dinh-cao-dang-mua-nhat-don-nam-moi-2023-731-6773678.jpg",
      discount: 20,
      star: 3,
      location: "Cầu giấy, Hà Nội",
      historicalCost: 1620370,
      pricingDecreased: 1115000,
      ratedNumber: 304,
      feature: "Good location",
      rated: "8.0 Execllent",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Tesla Model 3",
      img: "https://i.vietgiaitri.com/2022/12/2/loat-xe-o-to-pho-thong-gia-re-cong-nghe-dinh-cao-dang-mua-nhat-don-nam-moi-2023-731-6773678.jpg",
      discount: 25,
      star: 4,
      location: "Thanh Xuân, Hà Nội",
      historicalCost: 1078210,
      pricingDecreased: 999000,
      ratedNumber: 106,
      feature: "Good reviews",
      rated: "10.0 Exceptional",
    },
  ],
};

const ProductDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { time } = useContext(TimeContext);
  const [selectedValue, setSelectedValue] = useState("Tôi tự đến lấy xe");
  const [data, setData] = useState({});
  const [img, setimg] = useState([]);
  const { user } = useContext(AuthContext);
  const { id } = route.params;
  const fetchingData = async () => {
    try {
      const response = await api.get("/vehicles/" + id);
      setData(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginBottom: 0 }}>
        <HeaderNavigation
          title={data.name}
          navigation={navigation}
          rightIcon=<AntDesign name="hearto" size={24} color="black" />
        />
        <View style={{ backgroundColor: colors.whiteColor, paddingBottom: 0 }}>
          <ImageList images={data?.images}></ImageList>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data.features}
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
              {data.name}
            </Text>

            {/* <Text style={{ fontSize: 13, color: colors.textGray }}></Text> */}
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: colors.mainColor,
                }}
              >
                {formatPrice(data.pricePerDay)} VNĐ
              </Text>
              <Text style={{ fontSize: 13 }}>/ngày</Text>
            </View>
          </View>
          {/* Star */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {Array.from({ length: data.star }, (_, index) => (
              <FontAwesome key={index} name="star" size={14} color="orange" />
            ))}
            {data.star % 1 === 0.5 && (
              <FontAwesome name="star-half" size={14} color="orange" />
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <EvilIcons
              name="location"
              style={{ padding: 0, margin: 0 }}
              size={24}
              color={colors.mainColor}
            />
            <Text>{data?.address || "Xe chưa có địa chỉ"}</Text>
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
            Chủ xe
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
                  {/* <AntDesign name="star" size={16} color={colors.mainColor} /> */}
                  <Text>{data.owner?.tripCount} chuyến</Text>
                </View>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}
                >
                  {data.owner?.fullName}
                </Text>
                <Text>
                  • Tham gia vào{" "}
                  {new Date(data.owner?.createdAt)
                    .toLocaleDateString("en-GB", {
                      month: "2-digit",
                      year: "numeric",
                    })
                    .replace("/", "-")}
                </Text>
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

        {/* Trip dates */}
        <View
          style={{
            // marginHorizontal: 15,
            backgroundColor: colors.whiteColor,
            paddingHorizontal: 15,
            paddingBottom: 20,
            // marginBottom: 8,
          }}
        >
          <View
            style={{
              // marginHorizontal: 15,
              backgroundColor: colors.greyBackground,
              paddingHorizontal: 15,
              borderRadius: 14,
              // paddingBottom: 15,
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
              Thời gian thuê xe
            </Text>
            <View
              style={{
                // padding: 10,
                borderRadius: 16,
                // backgroundColor: "red",
                // flexDirection: "row",

                borderWidth: 1,
                borderColor: "#e7e7e7",
                paddingVertical: 18,
                paddingHorizontal: 16,
              }}
            >
              <View
                style={{
                  width: "100%",
                  // backgroundColor: "red",
                  flexDirection: "row",
                  justifyContent: "space-between",
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
                  <Text style={{ fontWeight: 600, fontSize: 15 }}>
                    {calculateDays(time)} ngày
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    alignItems: "center",
                  }}
                  onPress={() => navigation.navigate("TripDateTimePicker")}
                >
                  <Text style={{ fontWeight: 500, color: colors.mainColor }}>
                    Change
                  </Text>
                  <AntDesign name="right" size={16} color={colors.mainColor} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 12,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontWeight: 500,
                      color: colors.textGray,
                      marginBottom: 10,
                    }}
                  >
                    Nhận xe
                  </Text>
                  <Text
                    style={{
                      fontWeight: 500,
                    }}
                  >
                    {formatTime(time.pickupTime)} {formatDates(time.pickupDate)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontWeight: 500,
                      color: colors.textGray,
                      marginBottom: 10,
                    }}
                  >
                    Trả xe
                  </Text>
                  <Text
                    style={{
                      fontWeight: 500,
                    }}
                  >
                    {formatTime(time.returnTime)} {formatDates(time.returnDate)}
                  </Text>
                </View>
              </View>
              {/* <Text style={{ fontWeight: 500 }}>
                {formatDates(time.pickupDate, time.returnDate)}
              </Text> */}
            </View>
            <Text
              style={{
                fontWeight: 600,
                fontSize: 17,
                marginBottom: 16,
                marginTop: 22,
              }}
            >
              Địa điểm giao nhận xe
            </Text>
            <View
              style={{
                backgroundColor: colors.greyBackground,
                paddingBottom: 15,
                borderRadius: 12,
              }}
            >
              <View>
                {/* <Text>Tự đến lấy xe</Text> */}
                <RadioButton
                  options={[
                    {
                      name: "Tôi tự đến lấy xe",
                      location: data?.address || "Xe chưa có địa chỉ",
                    },
                    {
                      name: "Tôi muốn được giao xe tận nơi",
                      location: `${user.defaultAddress.road}, ${user.defaultAddress.ward}`,
                    },
                  ]}
                  selected={selectedValue}
                  onSelect={setSelectedValue}
                ></RadioButton>
              </View>
            </View>
          </View>
        </View>

        {/* Acommodation Rated */}
        <AccomodationRated
          ratedNumber={data.ratedNumber}
          rated={data.rated}
          navigation={navigation}
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
        {/* Acommodation Privacy*/}
        <View
          style={{
            borderRadius: 15,
            backgroundColor: colors.whiteColor,
            padding: 15,
          }}
        >
          {/* Giấy tờ */}
          <View style={{ marginBottom: 30 }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Giấy tờ thuê xe
            </Text>
            <Text style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
              Chọn 1 trong 2 hình thức
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <AntDesign
                name="idcard"
                size={22}
                color={colors.textGray}
                style={{ width: 30 }}
              />
              <Text style={{ color: colors.textColor }}>
                {"GPLX (đối chiếu) & CCCD (đối chiếu VNeID)"}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <FontAwesome5
                name="passport"
                size={22}
                color={colors.textGray}
                style={{ width: 30 }}
              />
              <Text style={{ color: colors.textColor }}>
                {"GPLX (đối chiếu) & Passport (Giữ lại)"}
              </Text>
            </View>
            {/* <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <FontAwesome5
                name="passport"
                size={22}
                color={colors.textGray}
                style={{ width: 30 }}
              />
              <Text style={{ color: colors.textColor }}>
                {"GPLX (đối chiếu) & Passport (Giữ lại)"}
              </Text>
            </View> */}
          </View>
          <View
            style={{ height: 1, backgroundColor: "#e7e7e7", marginBottom: 16 }}
          ></View>
          <View style={{ marginBottom: 30 }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Tài sản thế chấp
            </Text>
            <View>
              <Text
                style={{
                  color: colors.ttextColorextGray,
                  lineHeight: 22,
                  fontSize: 14,
                  paddingRight: 30,
                }}
              >
                {"30 triệu (tiền mặt/chuyển khoản cho chủ xe khi nhận xe) "}
              </Text>
              <Text
                style={{
                  color: colors.textColor,
                  lineHeight: 22,
                  fontSize: 14,
                  paddingRight: 30,
                }}
              >
                {"hoặc xe máy (kèm cà vẹt gốc) trị giá 30 triệu"}
              </Text>
              <Text
                style={{
                  color: colors.textColor,
                  lineHeight: 22,
                  fontSize: 14,
                  paddingRight: 30,
                }}
              >
                {data.collateral}
              </Text>
            </View>
          </View>
          <View
            style={{ height: 1, backgroundColor: "#e7e7e7", marginBottom: 16 }}
          ></View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Điều khoản khác
          </Text>
          <Text
            style={{ fontSize: 14, color: colors.textColor, lineHeight: 20 }}
          >
            Bảo quản xe cẩn thận, không được tự ý sửa chữa, thay đổi kết cấu xe.
            {"\n"}
            Đổ nhiên liệu theo đúng loại quy định của nhà sản xuất.{"\n"}
            Báo ngay cho bên cho thuê nếu xe gặp sự cố, hỏng hóc hoặc tai nạn.
            {"\n"}
            Trả xe đúng thời gian, địa điểm và tình trạng như lúc nhận.{"\n"}
            Hai bên cam kết thực hiện đúng các điều khoản trên, nếu có tranh
            chấp, sẽ giải quyết bằng thương lượng hoặc theo pháp luật Việt Nam.
          </Text>
          <Text
            style={{ fontSize: 14, color: colors.textColor, lineHeight: 20 }}
          >
            {data.term}
          </Text>
        </View>
        <View
          style={{ height: 15, backgroundColor: colors.greyBackground }}
        ></View>
        {/* Room List */}
        <View
          style={{
            paddingVertical: 15,
            borderRadius: 15,
            backgroundColor: colors.whiteColor,
          }}
        >
          <Text
            style={{
              paddingLeft: 15,
              fontSize: 17,
              fontWeight: 600,
              marginBottom: 14,
              color: colors.mainColor,
            }}
          >
            Những xe nổi bật khác của Triển
          </Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data?.rooms}
            renderItem={({ item }) => <AccomodationItem data={item} />}
            keyExtractor={(item) => item.id}
            style={{ paddingLeft: 5 }}
          />
        </View>
        <View
          style={{ height: 80, backgroundColor: colors.greyBackground }}
        ></View>
      </ScrollView>

      {/* Fixed Component */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: colors.whiteColor,
          borderTopColor: "#e7e7e7",
          borderTopWidth: 2,
          paddingBottom: 20,
          // height: 96,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 16,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 20,
                  color: colors.mainColor,
                  fontWeight: 600,
                }}
              >
                {formatPrice(data.pricePerDay)} VNĐ
              </Text>
              <Text
                style={{
                  color: colors.textGray,
                  fontSize: 12,
                  marginBottom: 2,
                }}
              >
                {" "}
                /ngày
              </Text>
            </View>
            <Text style={{ fontSize: 12, color: colors.textGray }}>
              Giá tổng: {formatPrice(data.pricePerDay * calculateDays(time))}{" "}
              VNĐ
            </Text>
          </View>
          <MyButton
            onPress={() => {
              // console.log("data: ", data);
              navigation.navigate("ProductCheckout", { data: data });
            }}
            title="Chọn thuê"
            // onPress={scrollToRoomList} // Gọi hàm cuộn khi nhấn
            buttonStyle={{ paddingVertical: 12, opacity: 0.8 }}
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
