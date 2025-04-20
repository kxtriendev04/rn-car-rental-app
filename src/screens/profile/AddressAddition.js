import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNavigation from "../../component/HeaderNavigation";
import colors from "../../util/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { useFocusEffect } from "@react-navigation/native";
import { LocationContext } from "../../context/LocationContext";
import { ScrollView } from "react-native";
import { Switch } from "react-native";
import api from "../../util/api";
import { AuthContext } from "../../context/AuthContext";

const AddressAddition = ({ navigation, route }) => {
  const currentLocation = route?.params?.currentLocation;
  const { selectedLocation, setSelectedLocation } = useContext(LocationContext);
  const [addressType, setAddressType] = useState("Nhà riêng");
  const [addressName, setAddressName] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  console.log(currentLocation);
  useEffect(() => {
    if (currentLocation) {
      setIsEnabled(currentLocation.defaultAddress);
      setSelectedLocation(currentLocation);
    } else {
      setSelectedLocation({
        province: "",
        district: "",
        ward: "",
        road: "",
        latitude: 0,
        longitude: 0,
      });
    }
    setAddressName(addressType);
  }, []);
  const onPressCategory = (title) => {
    setAddressType(title);
    setAddressName(title);
  };
  const { user, getCurrentUser } = useContext(AuthContext);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleDelete = async () => {
    // Hiển thị hộp thoại xác nhận trước khi xóa
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa địa chỉ này?", // Nội dung
      [
        {
          text: "Hủy",
          onPress: () => console.log("Xóa bị hủy"), // Hành động khi bấm hủy
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: async () => {
            try {
              await api.delete("/addresses/" + currentLocation.id);
              Alert.alert("Xóa địa chỉ thành công!!!");
              navigation.goBack();
            } catch (e) {
              Alert.alert("Xóa địa chỉ thất bại!!!");
              console.log(e);
            }
          },
        },
      ],
      { cancelable: false } // Không thể tắt hộp thoại khi bấm ngoài màn hình
    );
  };
  const handleSaveAddress = async () => {
    if (!selectedLocation.road.trim()) {
      Alert.alert("Vui lòng nhập đủ thông tin !!!");
      return;
    }
    const addressPost = {
      name: addressName,
      district: selectedLocation.district,
      ward: selectedLocation.ward,
      road: selectedLocation.road,
      province: selectedLocation.province,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      defaultAddress: isEnabled,
    };
    try {
      if (currentLocation) {
        //update
        // addressPost = { ...addressPost, default: selectedLocation.default };
        await api.put(
          "/addresses/" + user.id + "/" + currentLocation.id,
          addressPost
        );
      } else {
        // Add
        await api.post("/addresses/user/" + user.id, addressPost);
      }
      await getCurrentUser(true, user.email);
      navigation.goBack();
      Alert.alert("Thành công!!!");
    } catch (e) {
      Alert.alert("Thất bại!!!");
      console.log(e);
    }
    // console.log(addressName);
    // console.log(selectedLocation);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1 }}>
        <HeaderNavigation
          title={currentLocation ? "Sửa địa chỉ" : "Thêm địa chỉ"}
          navigation={navigation}
          leftIcon={<AntDesign name="close" size={24} color="black" />}
        />
        <View style={{ flex: 1, marginHorizontal: 15 }}>
          <Card title="Loại địa chỉ">
            <View style={{ flexDirection: "row", gap: 10 }}>
              <CategoryCard
                title="Nhà riêng"
                icon={<AntDesign name="home" size={17} color="black" />}
                category={addressType}
                onPressCategory={onPressCategory}
              />
              <CategoryCard
                title="Công ty"
                icon={
                  <MaterialIcons name="apartment" size={17} color="black" />
                }
                category={addressType}
                onPressCategory={onPressCategory}
              />
              <CategoryCard
                title="Khác"
                icon={<Feather name="bookmark" size={17} color="black" />}
                category={addressType}
                onPressCategory={onPressCategory}
              />
            </View>
          </Card>
          <Card title="Tên gợi nhớ">
            <TextInput
              value={addressName}
              onChangeText={setAddressName}
              style={{
                padding: 16,
                borderWidth: 1,
                borderColor: "#e7e7e7",
                borderRadius: 12,
                fontSize: 16,
              }}
              placeholder="Nhập tên gợi nhớ cho địa chỉ"
            ></TextInput>
          </Card>
          <Card title="Tỉnh/Thành phố">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LocationPicker", { item: currentLocation })
              }
              style={{ position: "relative" }}
            >
              <TextInput
                value={selectedLocation.province}
                pointerEvents="none"
                style={{
                  padding: 16,
                  borderWidth: 1,
                  borderColor: "#e7e7e7",
                  borderRadius: 12,
                  fontSize: 16,
                  paddingRight: 40, // Chừa khoảng cho icon
                }}
                editable={false}
                placeholder="Tỉnh/Thành phố"
              />
              <View
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: [{ translateY: -11 }], // căn giữa theo chiều dọc
                }}
              >
                <Entypo name="chevron-small-down" size={26} color="black" />
              </View>
            </TouchableOpacity>
          </Card>
          <Card title="Quận/Huyện">
            <TouchableOpacity
              onPress={() => navigation.navigate("LocationPicker")}
              style={{ position: "relative" }}
            >
              <TextInput
                pointerEvents="none"
                value={selectedLocation.district}
                style={{
                  padding: 16,
                  borderWidth: 1,
                  borderColor: "#e7e7e7",
                  borderRadius: 12,
                  fontSize: 16,
                  paddingRight: 40, // Chừa khoảng cho icon
                }}
                editable={false}
                placeholder="Quận/Huyện"
              />
              <View
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: [{ translateY: -11 }], // căn giữa theo chiều dọc
                }}
              >
                <Entypo name="chevron-small-down" size={26} color="black" />
              </View>
            </TouchableOpacity>
          </Card>
          <Card title="Phường/Xã">
            <TouchableOpacity
              onPress={() => navigation.navigate("LocationPicker")}
              style={{ position: "relative" }}
            >
              <TextInput
                pointerEvents="none"
                value={selectedLocation.ward}
                style={{
                  padding: 16,
                  borderWidth: 1,
                  borderColor: "#e7e7e7",
                  borderRadius: 12,
                  fontSize: 16,
                  paddingRight: 40, // Chừa khoảng cho icon
                }}
                editable={false}
                placeholder="Phường/Xã"
              />
              <View
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: [{ translateY: -11 }], // căn giữa theo chiều dọc
                }}
              >
                <Entypo name="chevron-small-down" size={26} color="black" />
              </View>
            </TouchableOpacity>
          </Card>
          <Card title="Đường">
            <TouchableOpacity
              onPress={() => navigation.navigate("LocationPicker")}
              style={{ position: "relative" }}
            >
              <TextInput
                pointerEvents="none"
                value={selectedLocation.road}
                style={{
                  padding: 16,
                  borderWidth: 1,
                  borderColor: "#e7e7e7",
                  borderRadius: 12,
                  fontSize: 16,
                  paddingRight: 40, // Chừa khoảng cho icon
                }}
                editable={false}
                placeholder="Đường"
              />
              <View
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: [{ translateY: -11 }], // căn giữa theo chiều dọc
                }}
              >
                <Entypo name="chevron-small-down" size={26} color="black" />
              </View>
            </TouchableOpacity>
          </Card>
          <View style={{ marginBottom: 22 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                Đặt làm địa chỉ mặc định
              </Text>
              <Switch
                value={isEnabled}
                onValueChange={toggleSwitch}
                style={{
                  transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                }}
              />
            </View>
            {currentLocation?.id && (
              <TouchableOpacity
                onPress={handleDelete}
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Feather name="trash-2" size={20} color="red" />
                <Text style={{ color: "red" }}>Xóa địa chỉ</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.mainColor,

            alignItems: "center",
            padding: 16,
            borderRadius: 12,
            marginHorizontal: 15,
          }}
          onPress={handleSaveAddress}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Lưu</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const Card = ({ children, title }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
        {title}
      </Text>
      {children}
    </View>
  );
};
const CategoryCard = ({ icon, title, category, onPressCategory }) => {
  return (
    <TouchableOpacity
      onPress={() => onPressCategory(title)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: category === title && colors.lightLightMainColor,
        borderColor: "#e7e7e7",
        borderWidth: 1,
        padding: 6,
        paddingHorizontal: 8,
        borderRadius: 20,
      }}
    >
      {icon}
      <Text style={{ fontSize: 16, fontWeight: 500 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AddressAddition;
