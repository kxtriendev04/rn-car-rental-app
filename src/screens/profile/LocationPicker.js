import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { provinces } from "../../util/location";
import HeaderNavigation from "../../component/HeaderNavigation";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../util/colors";
import { LocationContext } from "../../context/LocationContext";
import { getCoordinatesFromLocationObject } from "../../util/StreetAPI";
import MapView, { Marker } from "react-native-maps";

const TABS = ["Tỉnh/Thành Phố", "Quận/Huyện", "Phường/Xã", "Đường", "Bản Đồ"];

const LocationPicker = ({ navigation, route }) => {
  const currentLocation = route?.params?.item;
  // console.log("currentLocation: ", currentLocation);
  const [activeTab, setActiveTab] = useState(0);
  //   const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState({
    province: "",
    district: "",
    ward: "",
    road: "",
    latitude: 0,
    longitude: 0,
  });
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedStreet, setSelectedStreet] = useState(null);

  const { setSelectedLocation, selectedLocation } = useContext(LocationContext);

  const [searchTextProvince, setSearchTextProvince] = useState("");
  const [searchTextDistrict, setSearchTextDistrict] = useState("");
  const [searchTextWard, setSearchTextWard] = useState("");
  const [searchTextStreet, setSearchTextStreet] = useState("");

  const filteredProvinces = provinces.filter((p) =>
    p.name.toLowerCase().includes(searchTextProvince.toLowerCase())
  );

  const filteredDistricts = selectedProvince?.districts.filter((d) =>
    d.name.toLowerCase().includes(searchTextDistrict.toLowerCase())
  );

  const filteredWards = selectedDistrict?.wards.filter((w) =>
    w.name.toLowerCase().includes(searchTextWard.toLowerCase())
  );
  const filteredStreets = selectedWard?.streets.filter((s) =>
    s.name.toLowerCase().includes(searchTextStreet.toLowerCase())
  );

  const handleGetLocation = async () => {
    const result = await getCoordinatesFromLocationObject(location);
    if (result) {
      setCoordinates({
        ...coordinates,
        latitude: result.lat,
        longitude: result.lon,
      });
    } else {
      alert("Không tìm thấy toạ độ.");
    }
  };
  useEffect(() => {
    const locationToUse = currentLocation || selectedLocation;
    if (!locationToUse) {
      console.log("No location found.");
      return;
    }

    const { province, district, ward, road } = locationToUse;

    const foundProvince = provinces.find((p) => p.name === province);
    if (!foundProvince) {
      console.log("Province not found.");
      return;
    }

    const foundDistrict = foundProvince.districts.find(
      (d) => d.name === district
    );
    if (!foundDistrict) {
      console.log("District not found.");
      return;
    }

    const foundWard = foundDistrict.wards.find((w) => w.name === ward);
    const selectedWard = foundWard || null;

    const foundStreet = foundWard?.streets?.find((s) => s.name === road);
    const selectedStreet = foundStreet || null;

    setLocation(locationToUse);
    setSelectedProvince(foundProvince);
    setSelectedDistrict(foundDistrict);
    setSelectedWard(selectedWard);
    setSelectedStreet(selectedStreet);

    if (selectedStreet) {
      setCoordinates({
        latitude: selectedStreet.latitude,
        longitude: selectedStreet.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    if (currentLocation) {
      handleGetLocation(currentLocation);
    }
  }, [currentLocation, selectedLocation]);

  const renderTabHeader = () => (
    <View style={styles.tabRow}>
      {
        <FlatList
          data={TABS}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.tabItem,
                activeTab === index && styles.tabItemActive,
              ]}
              onPress={() => {
                setActiveTab(index);
              }}
            >
              <Text
                style={
                  activeTab === index ? styles.tabTextActive : styles.tabText
                }
              >
                {/* {idx === 0 && selectedProvince ? selectedProvince : tab} */}
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      }
    </View>
  );

  const renderProvince = ({ item }) => {
    const isActive = location.province === item.name;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          setLocation({ ...location, province: item.name });
          setSelectedProvince(item);
          setActiveTab(1); // chuyển sang tab Quận/Huyện sau khi chọn tỉnh
          //   setSearchText("");
        }}
      >
        <Text
          style={[styles.itemText, { color: isActive && colors.mainColor }]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderRoadInput = () => (
    <View style={{}}>
      <InputConponent
        placeholder="Số nhà, đường"
        searchText={searchTextStreet}
        setSearchText={setSearchTextStreet}
      />

      <FlatList
        data={filteredStreets}
        keyExtractor={(item, index) => `${item?.code} ${index}`}
        renderItem={({ item }) => {
          const isActive = location.road === item.name;
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setLocation({ ...location, road: item.name });
                setSelectedStreet(item);
                handleGetLocation();
                setActiveTab(4);
              }}
            >
              <Text
                style={[
                  styles.itemText,
                  { color: isActive && colors.mainColor },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  const renderMapTab = () => (
    <View style={{}}>
      <Text style={{ fontSize: 16, marginBottom: 14 }}>
        {location.road} , {location.ward}, {location.district},{" "}
        {location.province}
      </Text>

      <MapView
        style={{ width: "100%", height: 200, borderRadius: 14 }}
        region={coordinates}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
      >
        {/* Hiển thị marker với tên địa điểm */}
        <Marker
          coordinate={coordinates}
          title="Vị trí"
          description="Vị trí được đánh dấu"
        />
      </MapView>
      <TouchableOpacity
        style={{
          backgroundColor: colors.mainColor,
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={() => {
          setSelectedLocation(location);

          navigation.goBack();
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Xác nhận vị trí
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderNavigation
        headerStyle={{ backgroundColor: "none" }}
        title="Chọn vị trí"
        navigation={navigation}
        leftIcon={<AntDesign name="close" size={24} color="black" />}
      />
      {renderTabHeader()}

      <View style={{ marginHorizontal: 15 }}>
        {activeTab === 0 && (
          <View>
            <InputConponent
              placeholder="Tỉnh/Thành phố"
              searchText={searchTextProvince}
              setSearchText={setSearchTextProvince}
            />
            <FlatList
              data={filteredProvinces}
              keyExtractor={(item) => item.code}
              renderItem={renderProvince}
            />
          </View>
        )}

        {activeTab === 1 && selectedProvince && (
          <View>
            <InputConponent
              placeholder="Quận/Huyện"
              searchText={searchTextDistrict}
              setSearchText={setSearchTextDistrict}
            />
            <FlatList
              data={filteredDistricts}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => {
                const isActive = location.district == item.name;
                return (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      setSelectedDistrict(item);
                      setActiveTab(2);
                      setLocation({ ...location, district: item.name });
                    }}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        { color: isActive && colors.mainColor },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}

        {activeTab === 2 && selectedDistrict && (
          <View>
            <InputConponent
              placeholder="Phường/Xã"
              searchText={searchTextWard}
              setSearchText={setSearchTextWard}
            />
            <FlatList
              data={filteredWards}
              keyExtractor={(item) => `${item.name}-${item.code}`}
              renderItem={({ item }) => {
                const isActive = location.ward == item.name;
                return (
                  <TouchableOpacity
                    style={[styles.item]}
                    onPress={() => {
                      const newLocation = {
                        ...location,
                        ward: item.name,
                      };
                      setSelectedWard(item);
                      setLocation(newLocation);
                      setActiveTab(3);
                    }}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        { color: isActive && colors.mainColor },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
        {activeTab === 3 && selectedWard && renderRoadInput()}
        {activeTab === 4 && selectedStreet && renderMapTab()}
      </View>
    </View>
  );
};

const InputConponent = ({
  placeholder = "",
  searchText = "",
  setSearchText = () => {},
}) => {
  return (
    <View
      style={{
        position: "relative",
        marginBottom: 12,
      }}
    >
      <TextInput
        style={{
          padding: 10,
          paddingLeft: 40, // chừa khoảng cho icon
          borderWidth: 1,
          borderColor: "#e7e7e7",
          backgroundColor: "#e3e3e3",
          borderRadius: 12,
          fontSize: 15,
        }}
        placeholder={`Tìm kiếm ${placeholder}`}
        value={searchText}
        onChangeText={setSearchText}
      />
      <Ionicons
        name="search-outline"
        size={20}
        color="gray"
        style={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: [{ translateY: -10 }],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    // paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "white",
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  tabRow: { flexDirection: "row", marginBottom: 16 },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 2,
    paddingHorizontal: 15,
    borderBottomColor: "transparent",
  },
  tabItemActive: {
    borderBottomColor: colors.mainColor,
  },
  tabText: { color: "#888" },
  tabTextActive: { color: "black", fontWeight: "semibold" },
  searchInput: {
    backgroundColor: "#eee",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  item: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e7e7e7",
  },
  itemText: {
    fontSize: 16,
  },
  placeholder: {
    padding: 20,
    alignItems: "center",
  },
});

export default LocationPicker;
