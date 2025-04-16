import { Text, TouchableOpacity } from "react-native";
import colors from "../util/colors";
import { TextInput } from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

const MyInput = ({
  placeholder = "",
  inputStyle = {},
  keyboardType = "default",
  text = "",
  type = "normal",
  isPasswordShow = false,
  setIsPasswordShow = () => {},
  onChangeText = () => {},
}) => {
  return (
    <View style={{ position: "relative" }}>
      <TextInput
        value={text}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={type != "normal" && !isPasswordShow ? true : false}
        style={[
          {
            fontSize: 15,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            paddingRight: type != "normal" ? 50 : 10,
            borderRadius: 16,
            paddingVertical: 15,
            paddingHorizontal: 20,
            width: "100%",
          },
          ,
          inputStyle,
        ]}
      />
      {type != "normal" && (
        <Pressable
          onPress={() => setIsPasswordShow(!isPasswordShow)}
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            padding: 14,
            paddingRight: 16,
            borderRadius: 25,
            right: 0,
            //   backgroundColor: "red",
          }}
        >
          {!isPasswordShow ? (
            <Ionicons name="eye-outline" size={22} color="grey" />
          ) : (
            <Ionicons name="eye-off-outline" size={22} color="grey" />
          )}
        </Pressable>
      )}
    </View>
  );
};

export default MyInput;
