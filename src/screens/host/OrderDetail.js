import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native";
import { Text } from "react-native";
import colors from "../../util/colors";
import {
  AntDesign,
  EvilIcons,
  Foundation,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Alert } from "react-native";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import api from "../../util/api";

const getStatusText = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "Chờ duyệt";
    case "approved":
      return "Đã duyệt";
    case "rejected":
      return "Từ chối";
    case "completed":
      return "Hoàn thành";
    case "delivering":
      return "Đang dùng";
    default:
      return "Không xác định";
  }
};

const getStatusBackgroundColor = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "#FFF3CD";
    case "approved":
      return "#D4EDDA";
    case "rejected":
      return "#F8D7DA";
    case "completed":
      return "#D1ECF1";
    case "delivering":
      return "lightblue";
    default:
      return "#FFF";
  }
};

const getStatusTextColor = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "#856404";
    case "approved":
      return "#155724";
    case "rejected":
      return "#721c24";
    case "completed":
      return "#0c5460";
    case "delivering":
      return "#black";
    default:
      return "#333";
  }
};

const getDeliveryText = (delivery) => {
  switch (delivery) {
    case "self":
      return "Người thuê xe tự đến lấy";
    case "delivery":
      return "Bạn cần giao xe cho người thuê";
  }
};

function formatCurrencyVND(number) {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

const OrderDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params;
  const { user } = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const checkRole = user.id === data.vehicle.owner.id;

  const onApprove = async () => {
    try {
      const response = await api.put(
        `/rentals/${data.id}/status?status=APPROVED`
      );
      if (response.status === 200) {
        Alert.alert("Thay đổi trạng thái đơn hàng thành công");
        const notification = {
          tieuDe: "Đơn hàng của bạn vừa được chấp nhận",
          moTa: `Đơn hàng có mã ${data.id} vừa được người dùng ${data.vehicle.owner.fullName} chấp thuận, hãy kiểm tra lại thông tin nhé`,
          userIds: [data.renter.id]
        }
        const notiResponse = await api.post('/notifications', notification);
        navigation.goBack();
      }
    } catch (e) {
      console.log("Mã lỗi: ", e);
    }
  };

  const onDelivered = async () => {
    try {
      const response = await api.put(
        `/rentals/${data.id}/status?status=DELIVERING`
      );
      if (response.status === 200) {
        Alert.alert("Thay đổi trạng thái đơn hàng thành công");
        const notification = {
          tieuDe: "Đơn hàng của bạn vừa được giao tới cho người thuê",
          moTa: `Đơn hàng có mã ${data.id} vừa được người dùng ${data.vehicle.owner.fullName} giao tới, hãy kiểm tra lại thông tin nhé`,
          userIds: [data.renter.id]
        }
        const notiResponse = await api.post('/notifications', notification);
        navigation.goBack();
      }
    } catch (e) {
      console.log("Mã lỗi: ", e);
    }
  };

  const onReject = async () => {
    try {
      const response = await api.put(
        `/rentals/${data.id}/status?status=REJECTED`
      );
      if (response.status === 200) {
        Alert.alert("Thay đổi trạng thái đơn hàng thành công");
        const notification = {
          tieuDe: "Đơn hàng của bạn vừa bị từ chối",
          moTa: `Đơn hàng có mã ${data.id} vừa được người dùng ${data.vehicle.owner.fullName} từ chối, hãy tiếp tục thuê 1 xe khác nhé`,
          userIds: [data.renter.id]
        }
        const notiResponse = await api.post('/notifications', notification);
        navigation.goBack();
      }
    } catch (e) {
      console.log("Mã lỗi: ", e);
    }
  };

  const onReturned = async () => {
    try {
      const response = await api.put(
        `/rentals/${data.id}/status?status=COMPLETED`
      );
      if (response.status === 200) {
        Alert.alert("Thay đổi trạng thái đơn hàng thành công");
        const notification = {
          tieuDe: "Đơn hàng của bạn vừa được hoàn tất",
          moTa: `Đơn hàng có mã ${data.id} vừa được người dùng ${data.vehicle.owner.fullName} hoàn tất, cảm ơn bạn đã trải nghiệm`,
          userIds: [data.renter.id]
        }
        const notiResponse = await api.post('/notifications', notification);
        navigation.goBack();
      }
    } catch (e) {
      console.log("Mã lỗi: ", e);
    }
  };

  const renderButtons = (status) => {
    switch (status) {
      case "pending":
        return (
          <>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: getStatusBackgroundColor("rejected"),
                },
              ]}
              onPress={onReject}
            >
              <Text style={{ color: getStatusTextColor("rejected") }}>
                Từ chối
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: getStatusBackgroundColor("approved"),
                },
              ]}
              onPress={onApprove}
            >
              <Text style={{ color: getStatusTextColor("approved") }}>Duyệt</Text>
            </TouchableOpacity>
          </>
        );
      case "approved":
        return (
          <>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: getStatusBackgroundColor("rejected"),
                },
              ]}
              onPress={onReject}
            >
              <Text style={{ color: getStatusTextColor("rejected") }}>
                Huỷ đơn
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: getStatusBackgroundColor("approved"),
                },
              ]}
              onPress={onDelivered}
            >
              <Text style={{ color: getStatusTextColor("approved") }}>
                Giao xe
              </Text>
            </TouchableOpacity>
          </>
        );
      case "delivering":
        return (
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: getStatusBackgroundColor("complete"),
              },
            ]}
            onPress={onReturned}
          >
            <Text style={{ color: getStatusTextColor("complete") }}>
              Đã nhận được xe
            </Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCopy = async (id) => {
    try {
      await Clipboard.setStringAsync(id.toString());
      Alert.alert("Đã sao chép", "Mã đơn hàng đã được sao chép vào clipboard.");
    } catch (error) {
      console.log("e: ", error)
      Alert.alert("Lỗi", "Không thể sao chép mã đơn hàng.", error);
    }
  };

  function calculateTotalPrice(startDate, endDate, pricePerDay) {
    const start = moment(startDate);
    const end = moment(endDate);
    const days = end.diff(start, "days");

    const total = days * pricePerDay;
    return formatCurrencyVND(total);
  }

  function calculateTotalPriceAfterDiscount(
    startDate,
    endDate,
    pricePerDay,
    discountValue
  ) {
    const start = moment(startDate);
    const end = moment(endDate);
    const days = end.diff(start, "days");

    const total = days * pricePerDay;

    const totalAfterDiscount = total - discountValue;

    return formatCurrencyVND(totalAfterDiscount);
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: getStatusBackgroundColor(data.status),
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          >
            <Text
              style={{
                color: getStatusTextColor(data.status),
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Trạng thái: {getStatusText(data.status)}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.whiteColor,
              paddingHorizontal: 15,
              paddingTop: 15,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: 600, fontSize: 16.5 }}>
              Thông tin vận chuyển
            </Text>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 15,
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                color={getStatusTextColor(data.status)}
                size={25}
              />
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {getDeliveryText("self")}
              </Text>
            </View>
          </View>
          <View style={styles.subContainer}>
            <Text style={{ fontWeight: 600, fontSize: 16.5 }}>
              {checkRole ? "Thông tin người thuê" : "Thông tin chủ xe"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 15,
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="location-on"
                color={getStatusTextColor(data.status)}
                size={25}
              />
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 16, paddingLeft: 15 }}>
                    {!checkRole
                      ? data.vehicle.owner.fullName
                      : data.renter.fullName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      paddingLeft: 15,
                      color: colors.textGray,
                    }}
                  >
                    {!checkRole
                      ? data.vehicle.owner.phoneNumber
                      : data.renter.phoneNumber}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    paddingLeft: 15,
                    paddingTop: 3,
                    color: "#666",
                  }}
                >
                  {!checkRole
                    ? data.vehicle.owner.address
                      ? data.vehicle.owner.address
                      : "Chưa rõ địa chỉ"
                    : data.renter.address
                      ? data.renter.address
                      : "Chưa rõ địa chỉ"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", padding: 15 }}>
            <Image
              source={{ uri: data.vehicle.images[0].imageUrl }}
              style={styles.image}
            />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 16 }}>{data.vehicle.name}</Text>
                <Text
                  style={{
                    fontSize: 14.5,
                    paddingTop: 2.5,
                    color: colors.textGray,
                  }}
                >
                  Ngày tạo{" "}
                  {moment(data.createdAt).format("HH:mm:ss DD/MM/YYYY")}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text>{formatCurrencyVND(data.vehicle.pricePerDay)}/ngày</Text>
              </View>
            </View>
          </View>

          {isExpanded && (
            <View style={styles.subContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: 12.5,
                }}
              >
                <Text>Tổng tiền thuê xe</Text>
                <Text>
                  {calculateTotalPrice(
                    data.startDate,
                    data.endDate,
                    data.vehicle.pricePerDay
                  )}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: 12.5,
                }}
              >
                <Text>Tổng tiền giảm giá</Text>
                <Text>
                  {" "}
                  - {formatCurrencyVND(data.voucher?.discountValue || 0)}
                </Text>
              </View>
            </View>
          )}
          <TouchableOpacity onPress={handleToggle} activeOpacity={0.8}>
            <View style={styles.subContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  paddingBottom: 12.5,
                }}
              >
                <Text style={{ fontSize: 15 }}>Tổng thanh toán: </Text>
                <Text style={{ fontSize: 15 }}>
                  {calculateTotalPriceAfterDiscount(
                    data.startDate,
                    data.endDate,
                    data.vehicle.pricePerDay,
                    data.voucher?.discountValue || 0
                  )}
                </Text>
                <AntDesign name="down" color={colors.textGray} size={15} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 12.5,
              paddingTop: 15,
              paddingHorizontal: 15,
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: 600, fontSize: 16 }}>Mã đơn hàng</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: colors.textGray, paddingRight: 10 }}>
                {data.id}
              </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  padding: 5,
                  borderRadius: 10,
                  borderColor: colors.textGray,
                }}
                onPress={() => handleCopy(data.id)}
              >
                <Text>SAO CHÉP</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 12.5,
              paddingHorizontal: 15,
            }}
          >
            <Text>Phương thức thanh toán</Text>
            <Text style={{ color: colors.textGray }}>
              Thanh toán khi nhận xe
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 12.5,
              paddingHorizontal: 15,
            }}
          >
            <Text>Đặt cọc:</Text>
            <Text style={{ color: colors.textGray }}>
              Đặt cọc giấy tờ theo quy định
            </Text>
          </View>
          <View style={styles.subContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 12.5,
              }}
            >
              <Text>Thời gian tạo đơn</Text>
              <Text style={{ color: colors.textGray }}>
                {moment(data.createdAt).format("HH:mm:ss DD/MM/YYYY")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 12.5,
              }}
            >
              <Text>Dự kiến giao xe</Text>
              <Text style={{ color: colors.textGray }}>
                {moment(data.startDate).format("HH:mm:ss DD/MM/YYYY")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 12.5,
              }}
            >
              <Text>Dự kiến trả xe</Text>
              <Text style={{ color: colors.textGray }}>
                {moment(data.endDate).format("HH:mm:ss DD/MM/YYYY")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 12.5,
              }}
            >
              <Text>Thời gian kết thúc</Text>
              <Text style={{ color: colors.textGray }}>
                {moment(data.endDate).format("HH:mm:ss DD/MM/YYYY")}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {checkRole && renderButtons(data.status.toLowerCase())}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteColor,
    borderRadius: 15,
    marginTop: 10,
    flexDirection: "column",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  subContainer: {
    backgroundColor: colors.whiteColor,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopColor: colors.greyBackground,
    borderTopWidth: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 125,
    alignItems: "center",
  },
});
