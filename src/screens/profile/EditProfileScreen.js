import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import colors from "../../util/colors";
import HeaderNavigation from "../../component/HeaderNavigation";

const EditProfileScreen = ({ navigation }) => {
  const [avatar, setAvatar] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "MALE",
    address: "",
  });

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handlePickImage = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES ||
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("Quyền truy cập bị từ chối");
        return;
      }
    }

    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel || response.errorCode) {
          console.log("Cancel/Error", response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setAvatar(response.assets[0].uri);
        }
      }
    );
  };

  const handleSubmit = () => {
    Alert.alert("Thông tin đã được cập nhật", JSON.stringify(form, null, 2));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderNavigation title="Tài khoản của tôi" navigation={navigation} />
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={handlePickImage}
      >
        <Image
          source={
            avatar
              ? { uri: avatar }
              : require("../../../assets/defaultAvatar.jpg")
          }
          style={styles.avatar}
        />
        <Text style={styles.uploadText}>Chọn ảnh</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={form.fullName}
        onChangeText={(text) => handleInputChange("fullName", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleInputChange("email", text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={form.password}
        onChangeText={(text) => handleInputChange("password", text)}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={form.phoneNumber}
        onChangeText={(text) => handleInputChange("phoneNumber", text)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Giới tính</Text>
      <View style={styles.radioGroup}>
        {[
          { label: "Nam", value: "MALE" },
          { label: "Nữ", value: "FEMALE" },
        ].map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.radioButton}
            onPress={() => handleInputChange("gender", option.value)}
          >
            <View
              style={[
                styles.radioCircle,
                form.gender === option.value && styles.selectedRadio,
              ]}
            >
              {form.gender === option.value && (
                <View style={styles.innerCircle} />
              )}
            </View>
            <Text style={styles.radioLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Địa chỉ"
        multiline
        value={form.address}
        onChangeText={(text) => handleInputChange("address", text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Lưu thay đổi</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  uploadText: {
    color: colors.mainColor,
    marginBottom: 20,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  label: {
    marginBottom: 8,
    fontWeight: "600",
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#888",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  selectedRadio: {
    borderColor: colors.primary,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  radioLabel: {
    fontSize: 16,
  },
});
