import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../util/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import api from "../util/api";

const coupons = [
  {
    id: 1,
    title: "Giảm ngay 50k",
    desc: "Hóa đơn từ 1tr",
    code: "CHAOBANMOI",
    logo: "https://bidv.com.vn/wps/wcm/connect/674b6448-d23b-484e-b4d3-1e86fa68bd0d/Logo+Nguyen+ban+nen+trang.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-674b6448-d23b-484e-b4d3-1e86fa68bd0d-pfdjkOq",
  },
  {
    id: 2,
    title: "Giảm 10% cho thuê xe 3 ngày",
    desc: "Áp dụng cho tất cả các xe",
    code: "RENT3DAYS",
    logo: "https://bidv.com.vn/wps/wcm/connect/674b6448-d23b-484e-b4d3-1e86fa68bd0d/Logo+Nguyen+ban+nen+trang.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-674b6448-d23b-484e-b4d3-1e86fa68bd0d-pfdjkOq",
  },
  {
    id: 3,
    title: "Freeship xe tận nơi",
    desc: "Áp dụng tại Hà Nội & TP.HCM",
    code: "FREESHIP",
    logo: "https://bidv.com.vn/wps/wcm/connect/674b6448-d23b-484e-b4d3-1e86fa68bd0d/Logo+Nguyen+ban+nen+trang.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-674b6448-d23b-484e-b4d3-1e86fa68bd0d-pfdjkOq",
  },
  {
    id: 4,
    title: "Giảm 200k",
    desc: "Cho đơn hàng trên 5 triệu",
    code: "SALE200K",
    logo: "https://bidv.com.vn/wps/wcm/connect/674b6448-d23b-484e-b4d3-1e86fa68bd0d/Logo+Nguyen+ban+nen+trang.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-674b6448-d23b-484e-b4d3-1e86fa68bd0d-pfdjkOq",
  },
  {
    id: 5,
    title: "Giảm 15% cho thành viên VIP",
    desc: "Chỉ áp dụng cho khách hàng VIP",
    code: "VIP15",
    logo: "https://bidv.com.vn/wps/wcm/connect/674b6448-d23b-484e-b4d3-1e86fa68bd0d/Logo+Nguyen+ban+nen+trang.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-674b6448-d23b-484e-b4d3-1e86fa68bd0d-pfdjkOq",
  },
  {
    id: 6,
    title: "Thuê 7 ngày, tặng 1 ngày",
    desc: "Chỉ áp dụng cho xe SUV & Sedan, Hóa đơn trên 1tr",
    code: "RENT7GET1",
    logo: "https://bidv.com.vn/wps/wcm/connect/674b6448-d23b-484e-b4d3-1e86fa68bd0d/Logo+Nguyen+ban+nen+trang.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-674b6448-d23b-484e-b4d3-1e86fa68bd0d-pfdjkOq",
  },
  {
    id: 7,
    title: "Giảm 500k khi thuê xe sang",
    desc: "Áp dụng cho xe Mercedes, BMW, Audi",
    code: "LUXURY500",
    logo: "https://bidv.com.vn/wps/wcm/connect/674b6448-d23b-484e-b4d3-1e86fa68bd0d/Logo+Nguyen+ban+nen+trang.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-674b6448-d23b-484e-b4d3-1e86fa68bd0d-pfdjkOq",
  },
  {
    id: 8,
    title: "Giảm 20% khi đặt xe lần đầu",
    desc: "Chỉ dành cho khách hàng mới",
    code: "FIRST20",
    logo: "https://bidv.com.vn/wps/wcm/connect/674b6448-d23b-484e-b4d3-1e86fa68bd0d/Logo+Nguyen+ban+nen+trang.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-674b6448-d23b-484e-b4d3-1e86fa68bd0d-pfdjkOq",
  },
  {
    id: 9,
    title: "Giảm 5% khi thanh toán online",
    desc: "Áp dụng cho thanh toán qua MoMo, ZaloPay",
    code: "PAYONLINE5",
    logo: "https://bidv.com.vn/wps/wcm/connect/674b6448-d23b-484e-b4d3-1e86fa68bd0d/Logo+Nguyen+ban+nen+trang.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-674b6448-d23b-484e-b4d3-1e86fa68bd0d-pfdjkOq",
  },
  {
    id: 10,
    title: "Tặng 1 lần bảo dưỡng miễn phí",
    desc: "Cho đơn hàng trên 10 triệu",
    code: "FREECARE",
    logo: "https://bidv.com.vn/wps/wcm/connect/674b6448-d23b-484e-b4d3-1e86fa68bd0d/Logo+Nguyen+ban+nen+trang.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-674b6448-d23b-484e-b4d3-1e86fa68bd0d-pfdjkOq",
  },
];

const HomeCoupon = () => {
  const [data, setData] = useState([]);
  const fetchingData = async () => {
    try {
      const response = await api.get("/vouchers");
      setData(response.data.results);
    } catch (e) {
      console.log("Lỗi khi lấy vouchers ", e);
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);
  return (
    <View style={{ backgroundColor: "#f9f9f9" }}>
      <Text
        style={{
          fontSize: 19,
          fontWeight: 500,
          marginBottom: 8,
          paddingHorizontal: 15,
          paddingTop: 8,
          lineHeight: 24,
          paddingRight: 200,
          color: colors.textColor,
        }}
      >
        Ưu đãi giảm giá
      </Text>
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        // pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CouponCard coupon={item} />}
        disableIntervalMomentum={true} // Cuộn mượt mà, không tự động căn chỉnh
        decelerationRate="normal" // Cuộn tự nhiên hơn, không bị dừng đột ngột
      />
    </View>
  );
};
const CouponCard = ({ coupon }) => {
  return (
    <View style={styles.container}>
      {/* Notch bên trái */}
      <View style={styles.notchLeft} />
      {/* Notch bên phải */}
      <View style={styles.notchRight} />

      {/* Content */}
      <View style={{ flexDirection: "row", gap: 6, padding: 12 }}>
        <Image
          source={{ uri: coupon.logo }}
          style={{
            width: 55,
            height: 55,
            objectFit: "contain",
            borderRadius: 60,
          }}
        />
        <View style={{ paddingVertical: 8 }}>
          <Text style={styles.title}>{coupon.title || "Tiêu đề voucher"}</Text>
          <Text style={styles.desc}>
            {coupon.description || "Mô tả voucher"}
          </Text>
        </View>
      </View>
      <View
        style={[
          {
            height: 1,
            overflow: "hidden",
            position: "relative",
            top: 6, // Điều chỉnh để dịch xuống
          },
        ]}
      >
        <View
          style={[
            {
              marginHorizontal: 10,
              // marginTop: 2,
              height: 2,
              borderWidth: 1,
              borderColor: "#ddd",
              borderStyle: "dashed",
            },
          ]}
        ></View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 16,
          paddingHorizontal: 12,
          // marginVertical: 8,
          marginTop: 10,
          paddingTop: 8,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 6,
            borderRadius: 4,
            backgroundColor: colors.greyBackground,
            height: 32,
            padding: 5,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <FontAwesome6 name="copy" size={16} color="grey" />
          <Text style={{ color: colors.textGray }}>{coupon.code}</Text>
        </View>
        <TouchableOpacity
          onPress={async () => {
            await Clipboard.setStringAsync(coupon.code);
            alert("Đã sao chép!");
          }}
          style={{
            flex: 3.6,
            backgroundColor: colors.mainColor,
            height: 32,
            justifyContent: "center",
            borderRadius: 22,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: colors.whiteColor,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Copy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 8,
    paddingBottom: 12,
    margin: 10,
    // paddingHorizontal: 12,
    position: "relative",
    elevation: 3, // Tạo hiệu ứng đổ bóng
    // alignItems: "center",
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
    // flex: 2,
  },
  desc: {
    fontSize: 13,
    lineHeight: 18,
    color: "#666",
    paddingRight: 70,
    // flex: 8,
    // textAlign: "center",
  },
  copyButton: {
    marginTop: 10,
    backgroundColor: "#ddeeff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 20,
  },
  copyText: {
    fontWeight: "bold",
    color: "#0055cc",
  },
  notchLeft: {
    position: "absolute",
    left: -10, // Đẩy notch ra khỏi viền
    top: "57%",
    width: 20,
    height: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  notchRight: {
    position: "absolute",
    right: -10, // Đẩy notch ra khỏi viền
    top: "57%",
    width: 20,
    height: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
});
export default HomeCoupon;
