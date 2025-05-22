import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import colors from "../util/colors";
import { AntDesign, Feather } from "@expo/vector-icons";
import { API_URL_IMG } from "../util/api";

const ImageList = ({ images = [] }) => {
  const screenWidth = Dimensions.get("window").width;
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const isLink = images?.[0]?.imageUrl.startsWith("http");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingImages, setLoadingImages] = useState(
    Array(images.length).fill(true)
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const handleLoadEnd = (index) => {
    const updated = [...loadingImages];
    updated[index] = false;
    setLoadingImages(updated);
  };

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
        renderItem={({ item, index }) => (
          <View
            style={{
              width: screenWidth,
              height: 220,
              paddingHorizontal: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loadingImages[index] && (
              <ActivityIndicator
                size="large"
                color={colors.primaryColor}
                style={{
                  position: "absolute",
                  zIndex: 1,
                }}
              />
            )}
            <Image
              source={{
                uri: !isLink ? API_URL_IMG + item.imageUrl : item.imageUrl,
              }}
              style={{
                flex: 1,
                borderRadius: 30,
                width: "100%",
              }}
              resizeMode="cover"
              onLoadEnd={() => handleLoadEnd(index)}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

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
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Feather name="camera" size={16} color={colors.whiteColor} />
        <Text
          style={{
            fontWeight: "500",
            textAlign: "center",
            color: colors.whiteColor,
            fontSize: 13,
          }}
        >
          {currentIndex + 1}/{images.length}
        </Text>
      </View>
    </View>
  );
};

export default ImageList;
