import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../util/colors";
import {
  AntDesign,
  EvilIcons,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import MyButton from "../component/MyButton";
import HeaderNavigation from "../component/HeaderNavigation";
import { calculateDays, formatTime } from "../util/formatValue";
import { useContext } from "react";
import { TimeContext } from "../context/TimeContext";

const car = {
  id: "room1",
  star: 4,
  area: 2007,
  bedNumber: 2,
  name: "Lamborghini Revuelto",
  price: 1500000,
  images:
    "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
};

const ProductCheckoutScreen = ({ route }) => {
  const navigation = useNavigation();
  const { time } = useContext(TimeContext);
  const { data } = route.params;
  // console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderNavigation
          title="Kiểm tra lại đơn đặt"
          navigation={navigation}
        />
        {/* <ProductDetailHeader title="Resquest to book" navigation={navigation} /> */}
        {/* Product info */}
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginHorizontal: 15,
            marginTop: 12,
          }}
        >
          <Image
            source={{ uri: car.images }}
            style={{
              width: 120,
              height: 90,
              objectFit: "cover",
              borderRadius: 16,
            }}
          />
          <View
            style={{
              gap: 4,
              paddingVertical: 6,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: 500 }}>{data.name}</Text>
              <Text>
                <AntDesign name="star" size={16} color={colors.mainColor} />{" "}
                {data.star} • {data.brand}
              </Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>
              {data.pricePerDay} vnđ
            </Text>
          </View>
        </View>
        {/* Date */}
        <CheckoutSection title="Ngày và thời gian thuê">
          <View
            style={{
              backgroundColor: colors.lightLightMainColor,
              // flexDirection: "row",
              // justifyContent: "space-evenly",
              // alignItems: "center",
              // padding: 15,
              borderRadius: 8,
              paddingHorizontal: 30,
            }}
          >
            <View
              style={{
                marginTop: 8,
                flexDirection: "row",
                gap: 6,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="calendar-today"
                size={20}
                color={colors.mainColor}
              />
              <Text style={{ textAlign: "center", fontWeight: 500 }}>
                {calculateDays(time)} ngày
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: 15,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontWeight: 500, fontSize: 17, marginBottom: 8 }}
                >
                  {time.pickupDate}
                </Text>
                <Text style={{ fontSize: 13, color: colors.textGray }}>
                  {formatTime(time.pickupTime)}
                </Text>
              </View>
              <AntDesign
                name="arrowright"
                size={24}
                color="black"
                style={{ marginHorizontal: 15 }}
              />
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontWeight: 500, fontSize: 17, marginBottom: 8 }}
                >
                  {time.returnDate}
                </Text>
                <Text style={{ fontSize: 13, color: colors.textGray }}>
                  {formatTime(time.returnTime)}
                </Text>
              </View>
            </View>
          </View>
        </CheckoutSection>
        {/* Pick up */}
        <CheckoutSection title="Địa điểm nhận và trả xe">
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Ionicons
              name="location-outline"
              size={22}
              color={colors.mainColor}
            />
            <Text>Cầu Giấy, Hà Nội</Text>
          </View>
        </CheckoutSection>
        <CheckoutSection title="Phiếu giảm giá">
          <View style={{ flexDirection: "row", gap: 6 }}>
            <TextInput
              placeholder="Enter your coupon"
              style={{
                flex: 9.5,
                borderWidth: 1,
                borderColor: colors.textGray,
                fontSize: 20,
                height: 48,
                fontSize: 12,
                borderRadius: 8,
                paddingLeft: 15,
                textAlignVertical: "center",
              }}
            ></TextInput>
            <MyButton title="Apply"></MyButton>
          </View>
        </CheckoutSection>
        <View style={{ paddingHorizontal: 15, marginTop: 32 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: colors.textColor,
              marginBottom: 10,
            }}
          >
            Lời nhắn cho chủ xe
          </Text>
          <TextInput
            style={{
              borderWidth: 0.5,
              borderColor: "#e7e7e7",
              borderRadius: 12,
              height: 120,
              padding: 15,
            }}
            multiline={true}
            placeholder="Nhập nội dung nhắn cho chủ xe"
          ></TextInput>
        </View>
        <CheckoutSection title="Thanh toán">
          <View
            style={{
              backgroundColor: colors.greyBackground,
              // flexDirection: "row",
              // justifyContent: "space-evenly",
              alignItems: "center",
              // padding: 15,
              paddingHorizontal: 15,
              paddingTop: 15,
              borderRadius: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 14, color: colors.textGray }}>
                $1,579.2 x 7 days
              </Text>
              <Text style={{ fontWeight: 500, fontSize: 14 }}>11,054.4</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 14, color: colors.textGray }}>
                Ship fee
              </Text>
              <Text style={{ fontWeight: 500, fontSize: 14 }}>$3.87</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 14, color: colors.textGray }}>
                Giảm giá
              </Text>
              <Text style={{ fontWeight: 500, fontSize: 14 }}>-</Text>
            </View>
            <View
              style={{
                height: 0.5,
                width: "100%",
                backgroundColor: "#777",
                marginBottom: 16,
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 500 }}>
                Total Amount
              </Text>
              <Text style={{ fontWeight: 500, fontSize: 16 }}>11,058.27</Text>
            </View>
          </View>
        </CheckoutSection>

        <MyButton
          buttonStyle={{
            marginHorizontal: 15,
            marginTop: 28,
            paddingVertical: 16,
          }}
          title="Đặt xe"
          textStyle={{ fontWeight: 800 }}
        ></MyButton>
      </ScrollView>
      {/* <Text>ProductCheckout</Text> */}
    </SafeAreaView>
  );
};

const CheckoutSection = ({ title, children }) => {
  return (
    <View style={{ paddingHorizontal: 15, marginTop: 32 }}>
      <Text style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
        {title}
      </Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
});

export default ProductCheckoutScreen;
