import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import MyInput from "../../component/MyInput";
import { SafeAreaView } from "react-native";
import colors from "../../util/colors";
import MyButton from "../../component/MyButton";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useForm, Controller } from "react-hook-form";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const ForgotScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    navigation.goBack();
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{
          marginHorizontal: 25,
          flex: 1,
        }}
      >
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
          Quên mật khẩu
        </Text>
        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 22,
                marginBottom: "20%",
                paddingRight: 30,
              }}
            >
              Mã xác thực sẽ được gửi tới email của bạn{" "}
              <Text style={{ color: colors.mainColor }}>trong vòng 24h</Text>
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
          </View>

          <MyButton
            title="Xác nhận"
            buttonStyle={{
              borderRadius: 26,
              paddingVertical: 16,
            }}
            textStyle={{ fontSize: 15 }}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotScreen;
