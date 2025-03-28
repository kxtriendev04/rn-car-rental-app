import { Alert, Dimensions, FlatList, Image, Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import colors from "../util/colors";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

const SearchVehicalCard = ({ room }) => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  return (
    <Pressable
      // activeOpacity={1}
      onPress={() => navigation.navigate("ProductDetail", { id: room.id })}
      // onPress={() => {
      //   Alert.alert("Click!"); // Hiển thị thông báo khi nhấn
      // }}
      style={{
        marginTop: 16,
        borderRadius: 16,
        backgroundColor: "white",
        margin: 12,
        marginBottom: 0,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#e7e7e7",
      }}
    >
      <View>
        <View>
          <FlatList
            keyboardShouldPersistTaps="handled"
            style={{ width: "100%" }}
            horizontal
            pagingEnabled
            // onViewableItemsChanged={onViewableItemsChanged}
            // viewabilityConfig={viewabilityConfig}
            showsHorizontalScrollIndicator={false}
            data={room?.images}
            renderItem={({ item, index }) => (
              <View
                style={{
                  width: screenWidth - 15 - 12,
                  marginTop: 12,
                  // borderWidth: 1,
                  // borderColor: "blue",
                  height: 220,
                  paddingHorizontal: 15,
                }}
              >
                <Image
                  source={{ uri: room?.images[index] }} // Dùng ảnh sản phẩm làm background
                  style={{
                    flex: 1,
                    borderRadius: 18,
                  }}
                  resizeMode="cover"
                ></Image>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <Image
          source={{
            uri: "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
          }}
          style={{
            width: 42,
            height: 42,
            borderRadius: 1000,
            position: "absolute",
            left: 28,
            borderColor: "white",
            borderWidth: 1,
            bottom: -13,
          }}
        ></Image>
      </View>
      <Text
        style={{
          marginTop: 16,
          textTransform: "uppercase",
          fontSize: 17,
          // backgroundColor: colors.greyBackground,
          paddingHorizontal: 15,
          paddingVertical: 10,
          fontWeight: 500,
        }}
      >
        {room?.name}
      </Text>
      <View>
        <FlatList
          style={{ marginBottom: 6, marginRight: 15 }}
          horizontal
          data={room?.features}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                alignItems: "center",
                // backgroundColor: "#E0E0E0",
                paddingHorizontal: 4,
                paddingVertical: 1.5,
                borderRadius: 12,
                gap: 4,
              }}
            >
              {item.icon}
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: "#A0A0A0",
                }}
              >
                {item.title}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          marginTop: 4,
          marginBottom: 12,
        }}
      >
        <Entypo name="location-pin" size={20} color="orange" />
        <Text style={{ fontWeight: 500, color: colors.textGray, fontSize: 12 }}>
          Quận Cầu Giấy
        </Text>
      </View>
      <View
        style={{
          height: 1.25,
          borderRadius: 100,
          marginHorizontal: 15,
          opacity: 0.3,
          backgroundColor: colors.textGray,
          // marginBottom: 12,
        }}
      ></View>
      <View
        style={{
          // backgroundColor: colors.greyBackground,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 12,
          // alignItems: "flex-end",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="star" size={16} color="orange" />
          <Text
            style={{ marginRight: 8, fontSize: 12, color: colors.textGray }}
          >
            {" "}
            5
          </Text>
          <Text
            style={{ fontSize: 16, fontWeight: 600, color: colors.textGray }}
          >
            {" "}
            •{" "}
          </Text>
          <Ionicons name="journal-outline" size={16} color={colors.mainColor} />
          <Text
            style={{ marginRight: 8, fontSize: 12, color: colors.textGray }}
          >
            {" "}
            25 chuyến
          </Text>
        </View>
        <View
          style={{ fontSize: 12, flexDirection: "row", alignItems: "flex-end" }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: colors.mainColor,
              letterSpacing: -1,
            }}
          >
            {room?.price}k
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: colors.textGray,
              marginBottom: 2,
              // letterSpacing: -1,
            }}
          >
            {" "}
            / ngày
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SearchVehicalCard;
