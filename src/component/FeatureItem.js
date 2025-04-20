import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import FeatureIcon from "./FeatureIcon";

const FeatureItem = ({ feature }) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 10,
        marginLeft: 15,
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        alignItems: "center",
        paddingHorizontal: 12,
        gap: 8,
        borderRadius: 12,
        paddingVertical: 11,
      }}
    >
      <FeatureIcon
        library={feature.library}
        name={feature.name}
        size={19}
        color="black"
      />
      <Text
        style={{
          flexShrink: 1,
          fontSize: 14,
          fontWeight: 500,
          color: "black",
        }}
      >
        {feature.name}
      </Text>
    </TouchableOpacity>
  );
};
export default FeatureItem;
