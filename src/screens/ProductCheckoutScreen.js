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
import { AntDesign, EvilIcons, Foundation, Ionicons } from "@expo/vector-icons";
import MyButton from "../component/MyButton";
import HeaderNavigation from "../component/HeaderNavigation";

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderNavigation title="Resquest to book" navigation={navigation} />
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
              <Text style={{ fontSize: 18, fontWeight: 500 }}>
                Tesla Roadster
              </Text>
              <Text>
                <AntDesign name="star" size={16} color={colors.mainColor} />{" "}
                {car.star} • 179 Trips
              </Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>$26.32/h</Text>
          </View>
        </View>
        {/* Date */}
        <CheckoutSection title="Trip date & time">
          <View
            style={{
              backgroundColor: colors.lightLightMainColor,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: 15,
              borderRadius: 8,
              paddingHorizontal: 30,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: 500, fontSize: 17, marginBottom: 8 }}>
                10 Aug,Thu
              </Text>
              <Text style={{ fontSize: 13, color: colors.textGray }}>
                5:00 AM
              </Text>
            </View>
            <AntDesign
              name="arrowright"
              size={24}
              color="black"
              style={{ marginHorizontal: 15 }}
            />
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: 500, fontSize: 17, marginBottom: 8 }}>
                10 Aug,Thu
              </Text>
              <Text style={{ fontSize: 13, color: colors.textGray }}>
                5:00 AM
              </Text>
            </View>
          </View>
        </CheckoutSection>
        {/* Pick up */}
        <CheckoutSection title="Pickup & return">
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Ionicons
              name="location-outline"
              size={22}
              color={colors.mainColor}
            />
            <Text>Los Angels, CA 91602</Text>
          </View>
        </CheckoutSection>
        <CheckoutSection title="Coupon">
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
        <CheckoutSection title="Payment">
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
                Discount
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
          title="Check out"
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
