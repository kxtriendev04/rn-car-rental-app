import React, { useContext, useState } from "react";
import { View, Text, Alert } from "react-native";
import MyInput from "../../component/MyInput";
import { SafeAreaView } from "react-native";
import colors from "../../util/colors";
import MyButton from "../../component/MyButton";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { ScrollView } from "react-native";
import { AuthContext } from "../../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const { login, user } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("Form Data:", data);
    try {
      await login(data.email, data.password);
      navigation.replace("MainTabs");
    } catch {
      Alert.alert("Thông tin đăng nhập không hợp lệ!!!");
    }
    console.log("user: ", user);
    // navigation.replace("MainTabs")
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView
        style={{
          marginHorizontal: 25,
        }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView>
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
              Đăng nhập
            </Text>
            <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: "20%" }}>
              Vui lòng nhập thông tin đăng nhập của bạn bên dưới
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Quicksand_600SemiBold",
                marginBottom: 10,
                color: colors.textColor,
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
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Quicksand_600SemiBold",
                marginBottom: 10,
                marginTop: 20,
                color: colors.textColor,
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
            <Pressable onPress={() => navigation.navigate("Forgot")}>
              <Text
                style={{
                  color: "#777",
                  textAlign: "right",
                  fontSize: 14,
                  marginBottom: 30,
                }}
              >
                Quên mật khẩu?
              </Text>
            </Pressable>
            <MyButton
              title="Đăng nhập"
              buttonStyle={{
                borderRadius: 26,
                paddingVertical: 16,
                marginBottom: 30,
              }}
              textStyle={{ fontSize: 15 }}
              onPress={handleSubmit(onSubmit)}
            />
            <Pressable
              style={{ paddingBottom: 40 }}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={{ textAlign: "center", color: "#777" }}>
                Chưa có tài khoản?{" "}
                <Text style={{ color: colors.mainColor }}>Đăng ký</Text>
              </Text>
            </Pressable>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
