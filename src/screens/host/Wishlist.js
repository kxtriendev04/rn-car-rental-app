import react, { useContext, useEffect, useState } from "react";
import {
  AntDesign,
  EvilIcons,
  Feather,
  FontAwesome5,
  Foundation,
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
  Button,
  Dimensions,
} from "react-native";
import AccomodationItem from "../../component/home/AccomodationItem";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import SearchVehicalCard from "../../component/SearchVehicalCard";
import api from "../../util/api";
import { AuthContext } from "../../context/AuthContext";
import colors from "../../util/colors";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await api.get(`/favorites?userId=${user.id}`);
      if (res === 200 || res === 201) setData(res.data.results);
    } catch (e) {
      console.log("Đã xảy ra lỗi: ", e);
    }
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) fetchData();
  }, [isFocused]);

  const navigator = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("HomeStack", {
          screen: "ProductDetail",
          params: { id: item.id },
        })
      }
    >
      <AccomodationItem data={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteColor }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <Text>Bạn chưa có xe nào trong danh sách yêu thích</Text>
          </View>
        }
        contentContainerStyle={{ paddingHorizontal: 5 }}
      />
    </SafeAreaView>
  );
};

export default Wishlist;
