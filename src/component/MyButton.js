import { Text, TouchableOpacity } from "react-native";
import colors from "../util/colors";

const MyButton = ({
  title = "",
  buttonStyle = {},
  textStyle = {},
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          paddingHorizontal: 14,
          paddingVertical: 12,
          borderRadius: 10,
          backgroundColor: colors.mainColor,
        },
        buttonStyle,
      ]}
    >
      <Text
        style={[{ color: colors.whiteColor, textAlign: "center" }, textStyle]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;
