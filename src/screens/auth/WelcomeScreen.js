import { View } from "react-native";
import { Image, SafeAreaView, Text } from "react-native";
import MyButton from "../../component/MyButton";
import colors from "../../util/colors";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          height: "68%",
        }}
      >
        <Image
          source={require("../../../assets/welcome.png")}
          style={{
            width: "100%",
            height: "100%",
            //   width: "85%",
            marginBottom: "10%",
            // objectFit không dùng trong React Native
            alignSelf: "flex-start",
            paddingLeft: 0,
          }}
        ></Image>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 26,
            marginBottom: 12,
            fontFamily: "Quicksand_600SemiBold",
          }}
        >
          Chào mừng bạn
        </Text>
        <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 26 }}>
          ‘
          <Text
            style={{
              color: colors.mainColor,
              fontFamily: "Quicksand_500Medium",
            }}
          >
            Therocars
          </Text>
          ’ Ứng dụng thuê xe
        </Text>
        <MyButton
          title="Tôi đã có tài khoản"
          buttonStyle={{
            borderRadius: 26,
            paddingVertical: 17,
            marginBottom: 10,
          }}
          textStyle={{ fontSize: 15 }}
          onPress={() => navigation.navigate("Login")}
        />
        <MyButton
          title="Tôi chưa có tài khoản"
          buttonStyle={{
            borderRadius: 26,
            paddingVertical: 17,
            backgroundColor: "none",
          }}
          textStyle={{ fontSize: 15, color: "#444" }}
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </SafeAreaView>
  );
};
export default WelcomeScreen;
