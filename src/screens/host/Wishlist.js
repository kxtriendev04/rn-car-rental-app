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


const data = {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Podche M12 Full Option",
    images: [
      {
        id: 1,
        uri: "https://images2.thanhnien.vn/528068263637045248/2025/1/9/kia-carnival-hybrid-ra-mat-viet-nam-xe-thanhnien-17363979709501869639727.jpg",
      },
      {
        id: 2,
        uri: "https://images2.thanhnien.vn/528068263637045248/2025/1/9/kia-carnival-hybrid-ra-mat-viet-nam-xe-thanhnien-17363979709501869639727.jpg",
      },
      {
        id: 3,
        uri: "https://images2.thanhnien.vn/528068263637045248/2025/1/9/kia-carnival-hybrid-ra-mat-viet-nam-xe-thanhnien-17363979709501869639727.jpg",
      },
      {
        id: 4,
        uri: "https://images2.thanhnien.vn/528068263637045248/2025/1/9/kia-carnival-hybrid-ra-mat-viet-nam-xe-thanhnien-17363979709501869639727.jpg",
      },
    ],
    discount: 20,
    star: 3,
    location: "Đống Đa, Hà Nội",
    description:
      "Lamborghini vừa ra mắt mẫu siêu xe mới mang tên Temerario, kế nhiệm dòng Huracan, với nhiều cải tiến đáng chú ý. Động cơ V10 hút khí tự nhiên đã được thay thế bằng hệ truyền động plug-in hybrid, kết hợp động cơ V8 4.0L tăng áp kép cùng ba mô-tơ điện, cho tổng công suất 920 mã lực. \n\nXe có khả năng tăng tốc từ 0–100 km/h trong 2,7 giây và đạt tốc độ tối đa 340 km/h. ​\n\nVề thiết kế, Temerario mang dáng vẻ kết hợp giữa Revuelto và Huracan, với kích thước dài x rộng x cao lần lượt là 4.706 x 1.996 x 1.201 mm, lớn hơn so với Huracan LP 610-4. Hệ thống đèn chiếu sáng được thiết kế nhỏ gọn, sắc nét với dải đèn ban ngày LED hình lục giác. Xe trang bị mâm kích thước so le, 20 inch phía trước và 21 inch phía sau, cùng hệ thống phanh Carbon Ceramic Brakes Plus",
    historicalCost: 1620370,
    pricingDecreased: 1215000,
    ratedNumber: 14,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    feature: [
      {
        title: "Không gian thoải mái",
        icon: <Foundation name="social-myspace" size={20} color="black" />,
      },
      {
        title: "Số tự động",
        icon: <EvilIcons name="gear" size={20} color="black" />,
      },
      {
        title: "Giá rẻ",
        icon: <Ionicons name="pricetags-outline" size={20} color="black" />,
      },
      {
        title: "7.5",
        icon: <AntDesign name="star" size={16} color="orange" />,
      },
    ],
    rated: "7.5",
    rooms: [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Tesla Model X",
        img: "https://i.vietgiaitri.com/2022/12/2/loat-xe-o-to-pho-thong-gia-re-cong-nghe-dinh-cao-dang-mua-nhat-don-nam-moi-2023-731-6773678.jpg",
        discount: 20,
        star: 3,
        location: "Đống Đa, Hà Nội",
        historicalCost: 1620370,
        pricingDecreased: 1215000,
        ratedNumber: 14,
        feature: "Free breakfast",
        rated: "7.5 Very good",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Tesla Model 3",
        img: "https://i.vietgiaitri.com/2022/12/2/loat-xe-o-to-pho-thong-gia-re-cong-nghe-dinh-cao-dang-mua-nhat-don-nam-moi-2023-731-6773678.jpg",
        discount: 20,
        star: 3,
        location: "Cầu giấy, Hà Nội",
        historicalCost: 1620370,
        pricingDecreased: 1115000,
        ratedNumber: 304,
        feature: "Good location",
        rated: "8.0 Execllent",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Tesla Model 3",
        img: "https://i.vietgiaitri.com/2022/12/2/loat-xe-o-to-pho-thong-gia-re-cong-nghe-dinh-cao-dang-mua-nhat-don-nam-moi-2023-731-6773678.jpg",
        discount: 25,
        star: 4,
        location: "Thanh Xuân, Hà Nội",
        historicalCost: 1078210,
        pricingDecreased: 999000,
        ratedNumber: 106,
        feature: "Good reviews",
        rated: "10.0 Exceptional",
      },
    ],
  };

const Wishlist = () => {
    return (
        <View style={{flex: 1, }}>
            <FlatList
                data={data?.rooms}
                renderItem={({ item }) => <AccomodationItem data={item} />}
                keyExtractor={(item) => item.id}
                style={{ paddingLeft: 5}}
              />
        </View>
    );
}

export default Wishlist;