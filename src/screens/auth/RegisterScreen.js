import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native";
import { View, Text, Button } from "react-native";
import colors from "../../util/colors";
import MyInput from "../../component/MyInput";
import MyButton from "../../component/MyButton";
import { ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import api from "../../util/api";
import { Alert } from "react-native";

const RegisterScreen = ({ navigation }) => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try{
      console.log("Form Data:", data);
      const respone = await api.post("/users", data)
      if(respone.status === 201)
        Alert.alert("Bạn đã đăng kí thành công");
      navigation.replace("MainTabs");
    }catch (error){
      Alert.alert("Bạn đã đăng kí thất bại");
      console.error('Lỗi khi tạo user:', error.response?.data || error.message);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView style={{ flex: 1, paddingHorizontal: 25 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={{
                  marginTop: 20,
                  marginBottom: "20%",
                  padding: 8,
                  borderColor: "#e5e5e5",
                  borderWidth: 1,
                  borderRadius: 999,
                }}
              >
                <AntDesign name="swapleft" size={24} color="black" />
              </Pressable>
            </View>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "Quicksand_500Medium",
                marginBottom: 30,
              }}
            >
              Đăng ký
            </Text>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 22,
                marginBottom: "20%",
                paddingRight: 30,
              }}
            >
              Vui lòng nhập thông tin của bạn để đăng ký tới{" "}
              <Text style={{ color: colors.mainColor, fontWeight: 500 }}>
                Therocars
              </Text>
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Quicksand_600SemiBold",
                  marginBottom: 10,
                  color: colors.textColor,
                  marginTop: 10,
                }}
              >
                Họ và tên
              </Text>
              {/* <MyInput
            placeholder="Nhập họ và tên"
            inputStyle={{ marginBottom: 26 }}
            text={username}
            onChangeText={setUsername}
          /> */}
              <Controller
                control={control}
                name="fullName"
                rules={{ required: "Họ và tên không được bỏ trống" }}
                render={({ field: { onChange, value } }) => (
                  <MyInput
                    placeholder="Nhập họ và tên"
                    inputStyle={{ marginBottom: 6 }}
                    text={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.fullName && (
                <Text
                  style={{
                    color: "red",
                    marginBottom: 16,
                    fontSize: 13,
                    // marginLeft: 4,
                  }}
                >
                  {errors.fullName.message}
                </Text>
              )}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Quicksand_600SemiBold",
                  marginBottom: 10,
                  color: colors.textColor,
                  marginTop: 10,
                }}
              >
                Email
              </Text>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email không được bỏ trống",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email không hợp lệ",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <MyInput
                    placeholder="Nhập email"
                    inputStyle={{ marginBottom: 6 }}
                    text={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                  />
                )}
              />
              {errors.email && (
                <Text
                  style={{
                    color: "red",
                    marginBottom: 16,
                    fontSize: 13,
                    // marginLeft: 4,
                  }}
                >
                  {errors.email.message}
                </Text>
              )}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Quicksand_600SemiBold",
                  marginBottom: 10,
                  color: colors.textColor,
                  marginTop: 10,
                }}
              >
                Số điện thoại
              </Text>
              {/* <MyInput
            placeholder="Nhập số điện thoại"
            inputStyle={{ marginBottom: 26 }}
            text={username}
            onChangeText={setUsername}
            keyboardType="email-address"
          /> */}
              <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  required: "Số điện thoại không được bỏ trống",
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <MyInput
                    placeholder="Nhập số điện thoại"
                    inputStyle={{ marginBottom: 6 }}
                    text={value}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                  />
                )}
              />
              {errors.phoneNumber && (
                <Text
                  style={{
                    color: "red",
                    marginBottom: 16,
                    fontSize: 13,
                    // marginLeft: 4,
                  }}
                >
                  {errors.phoneNumber.message}
                </Text>
              )}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Quicksand_600SemiBold",
                  marginBottom: 10,
                  color: colors.textColor,
                  marginTop: 10,
                }}
              >
                Mật khẩu
              </Text>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Mật khẩu không được bỏ trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <MyInput
                    placeholder="Nhập mật khẩu"
                    inputStyle={{ marginBottom: 6 }}
                    text={value}
                    onChangeText={onChange}
                    type="password"
                    isPasswordShow={isPasswordShow}
                    setIsPasswordShow={setIsPasswordShow}
                  />
                )}
              />
              {errors.password && (
                <Text
                  style={{
                    color: "red",
                    marginBottom: 16,
                    fontSize: 13,
                    // marginLeft: 4,
                  }}
                >
                  {errors.password.message}
                </Text>
              )}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Quicksand_600SemiBold",
                  marginBottom: 10,
                  color: colors.textColor,
                  marginTop: 10,
                }}
              >
                Nhập lại mật khẩu
              </Text>
              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  required: "Vui lòng nhập lại mật khẩu",
                  validate: (value) =>
                    value === watch("password") || "Mật khẩu không khớp",
                }}
                render={({ field: { onChange, value } }) => (
                  <MyInput
                    placeholder="Nhập lại mật khẩu"
                    inputStyle={{ marginBottom: 6 }}
                    text={value}
                    // value={value}
                    onChangeText={onChange}
                    type="password"
                    isPasswordShow={isPasswordShow}
                    setIsPasswordShow={setIsPasswordShow}
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text
                  style={{
                    color: "red",
                    marginBottom: 16,
                    fontSize: 13,
                  }}
                >
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            <MyButton
              title="Đăng ký"
              onPress={handleSubmit(onSubmit)}
              buttonStyle={{
                borderRadius: 26,
                paddingVertical: 16,
                marginBottom: 30,
                marginTop: 30,
              }}
              textStyle={{ fontSize: 15 }}
              // onPress={() => navigation.replace("MainTabs")}
            />
            <Pressable
              style={{ paddingBottom: 40 }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={{ textAlign: "center", color: "#777" }}>
                Đã có tài khoản?{" "}
                <Text style={{ color: colors.mainColor }}>Đăng nhập ngay</Text>
              </Text>
            </Pressable>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
