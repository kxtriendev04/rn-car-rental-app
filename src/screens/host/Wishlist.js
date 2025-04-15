import react, {useState} from 'react'
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
import AccomodationItem from '../../component/home/AccomodationItem';
import { useNavigation } from "@react-navigation/native";

const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Tesla AI",
      img: "https://i1-vnexpress.vnecdn.net/2022/12/14/Kia-Sorento-Hybrid_1671001157.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=1-sPT8ES4QUDqEwST55phQ&t=image",
      discount: 20,
      star: 3,
      location: "Đống Đa, Hà Nội",
      historicalCost: 1620370,
      pricingDecreased: 1215000,
      ratedNumber: 14,
      rated: "7.5 Very good",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Tesla A3",
      img: "https://i1-vnexpress.vnecdn.net/2022/12/14/Kia-Sorento-Hybrid_1671001157.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=1-sPT8ES4QUDqEwST55phQ&t=image",
      discount: 20,
      star: 3,
      location: "Cầu giấy, Hà Nội",
      historicalCost: 1620370,
      pricingDecreased: 1115000,
      ratedNumber: 304,
      rated: "8.0 Execllent",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Tesla Z",
      img: "https://i1-vnexpress.vnecdn.net/2022/12/14/Kia-Sorento-Hybrid_1671001157.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=1-sPT8ES4QUDqEwST55phQ&t=image",
      discount: 25,
      star: 4,
      location: "Thanh Xuân, Hà Nội",
      historicalCost: 1078210,
      pricingDecreased: 999000,
      ratedNumber: 106,
      rated: "10.0 Exceptional",
    },
  ];

const Wishlist = () => {
    const navigator = useNavigation();
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{flex: 1, }}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <AccomodationItem data={item} type={"no"} />}
                        keyExtractor={(item) => item.id}
                        // style={{ paddingLeft: 5}}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Wishlist;