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
import SearchVehicalCard from '../../component/SearchVehicalCard';

const data = [
  {
    id: "room1",
    area: 2007,
    bedNumber: 2,
    name: "Lamborghini Revuelto",
    price: 1500000,
    images: [
      "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
      "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
      "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
    ],
    features: [
      {
        title: "Không gian thoải mái",
        icon: <Foundation name="social-myspace" size={20} color="grey" />,
      },
      {
        title: "Số tự động",
        icon: <EvilIcons name="gear" size={20} color="grey" />,
      },
      {
        title: "Giá rẻ",
        icon: <Ionicons name="pricetags-outline" size={20} color="grey" />,
      },
      {
        title: "7.5",
        icon: <AntDesign name="star" size={16} color="orange" />,
      },
    ],
  },
  {
    id: "room2",
    area: 2018,
    bedNumber: 1,
    name: "Lamborghini Veneno Roadster",
    price: 1200000,
    images: [
      "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
      "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
      "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
      "https://xehay.vn/uploads/images/2023/7/03/xehay-Lamborghini-150623-2.jpg",
    ],
    features: [
      {
        title: "Two single beds",
        icon: <MaterialIcons name="single-bed" size={18} color="grey" />,
      },
      {
        title: "Garden view",
        icon: <MaterialIcons name="grass" size={18} color="grey" />,
      },
      {
        title: "Air conditioning",
        icon: <MaterialIcons name="ac-unit" size={18} color="grey" />,
      },
    ],
  },
  {
    id: "room3",
    area: 2010,
    bedNumber: 2,
    name: "Lamborghini Temerario",
    price: 2000000,
    images: [
      "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
      "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
      "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/4/4/lamborghini-veneno-roadster-16-2-17122329042051523283468-323-130-1206-1816-crop-171223293068827755609.jpg",
    ],
    features: [
      {
        title: "King bed",
        icon: <MaterialIcons name="hotel" size={18} color="grey" />,
      },
      {
        title: "Private balcony",
        icon: <MaterialIcons name="balcony" size={18} color="grey" />,
      },
      {
        title: "Mini bar",
        icon: <MaterialIcons name="local-bar" size={18} color="grey" />,
      },
    ],
  },
];

const Wishlist = () => {
    const navigator = useNavigation();
    return (
        <SafeAreaView>
            <FlatList
                data={data}
                renderItem={({ item }) => <SearchVehicalCard room={item}/>}
                keyExtractor={(item) => item.id}
                // style={{ paddingLeft: 5}}
            />
        </SafeAreaView>
    );
}

export default Wishlist;