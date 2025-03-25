import { useRef, useState } from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import colors from "../util/colors";
import { AntDesign, Feather } from "@expo/vector-icons";

const ImageList = ({ images = [] }) => {
  const screenWidth = Dimensions.get("window").width;
  const [currentItem, setCurrentItem] = useState(images[0]);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentItem(viewableItems[0].item);
    }
  }).current;
  return (
    <View>
      <FlatList
        style={{ width: "100%" }}
        horizontal
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={({ item }) => (
          <View
            style={{
              width: screenWidth,
              // borderWidth: 1,
              // borderColor: "blue",
              height: 220,
              paddingHorizontal: 15,
            }}
          >
            <Image
              source={{ uri: item.uri }} // Dùng ảnh sản phẩm làm background
              style={{
                flex: 1,
                borderRadius: 30,
              }}
              resizeMode="cover"
            ></Image>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* Star */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          left: 32,
          top: 12,
        }}
      >
        {Array.from({ length: 3 }, (_, index) => (
          <View
            key={index}
            style={{
              shadowColor: "#000", // Màu bóng
              shadowOffset: { width: 0, height: 2 }, // Độ lệch của bóng
              shadowOpacity: 0.3, // Độ trong suốt của bóng
              shadowRadius: 4, // Bán kính làm mờ bóng
              elevation: 5, // Chỉ dành cho Android
            }}
          >
            <AntDesign name="star" size={16} color="orange" />
          </View>
        ))}
      </View>
      <View
        style={{
          position: "absolute",
          right: 30,
          bottom: 10,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
          backgroundColor: colors.textColor,
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          // Hiệu ứng bóng đổ
          shadowColor: "#000", // Màu bóng
          shadowOffset: { width: 0, height: 2 }, // Độ lệch của bóng
          shadowOpacity: 0.3, // Độ trong suốt của bóng
          shadowRadius: 4, // Bán kính làm mờ bóng
          elevation: 5, // Chỉ dành cho Android
        }}
      >
        <Feather name="camera" size={16} color={colors.whiteColor} />
        <Text
          style={{
            fontWeight: 500,
            textAlign: "center",
            color: colors.whiteColor,
            fontSize: 13,
          }}
        >
          {currentItem?.id}/{images.length}
        </Text>
      </View>
    </View>
  );
};
export default ImageList;
