import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Slider from "@react-native-community/slider";
import HeaderNavigation from "../component/HeaderNavigation";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import colors from "../util/colors";
import { AntDesign } from "@expo/vector-icons";
import MyButton from "../component/MyButton";
import { TimeContext } from "../context/TimeContext";
import { formatTime } from "../util/formatValue";
import TimePicker from "../component/TimePicker";

const timeOptions = ["23:00", "23:30", "00:00"];

const TripDateTimePicker = ({ route, navigation }) => {
  const { time, setTime } = useContext(TimeContext);
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Chưa chọn");

  // console.log(time);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        title="Select Trip Date & Time"
        navigation={navigation}
      ></HeaderNavigation>

      <View
        style={{
          backgroundColor: colors.lightLightMainColor,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: 28,
          borderRadius: 8,
          paddingHorizontal: 30,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: 500, fontSize: 17, marginBottom: 8 }}>
            {time.pickupDate}
          </Text>
          <Text style={{ fontSize: 13, color: colors.textGray }}>
            {formatTime(time.pickupTime)}
          </Text>
        </View>
        <AntDesign
          name="arrowright"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: 500, fontSize: 17, marginBottom: 8 }}>
            {time.returnDate}
          </Text>
          <Text style={{ fontSize: 13, color: colors.textGray }}>
            {formatTime(time.returnTime)}
          </Text>
        </View>
      </View>

      {/* Calendar */}
      <Calendar
        current={time.pickupDate}
        minDate={new Date().toISOString().split("T")[0]}
        markedDates={getMarkedDates(time.pickupDate, time.returnDate)}
        onDayPress={(day) => {
          if (!time.pickupDate || time.returnDate) {
            setTime({ ...time, pickupDate: day.dateString, returnDate: "" });
          } else if (time.pickupDate > day.dateString) {
            setTime({
              ...time,
              pickupDate: day.dateString,
              returnDate: time.pickupDate,
            });
          } else {
            setTime({ ...time, returnDate: day.dateString });
          }
        }}
        theme={{
          selectedDayBackgroundColor: colors.mainColor,
          todayTextColor: "red",
          arrowColor: "black",
          textMonthFontSize: 17,
          textMonthFontWeight: 600,
          textDayHeaderFontSize: 16,
          textDayHeaderFontWeight: 500,
          textDayFontSize: 16,
          textDayFontWeight: 400,
          //   textDayStyle: { padding: 2 },
        }}
      />

      {/* Time Picker */}
      {/* <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Pickup</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={23}
          step={0.5}
          value={time.pickupTime}
          onValueChange={(value) => setTime({ ...time, pickupTime: value })}
          minimumTrackTintColor={colors.mainColor}
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="green"
        />
        <Text>{formatTime(time.pickupTime)}</Text>
      </View> */}
      <View style={{ margin: 15, flexDirection: "row", gap: 10 }}>
        <Pressable
          onPress={() => setSheetVisible(true)}
          style={{
            flex: 1,
            borderColor: "#e7e7e7",
            borderWidth: 1,
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: colors.textGray }}>
            Nhận xe :{" "}
            <Text style={{ fontSize: 15, fontWeight: 500, color: "black" }}>
              {formatTime(time.pickupTime)}
            </Text>
          </Text>
          <AntDesign name="down" size={20} color="black" />
        </Pressable>
        <Pressable
          onPress={() => setSheetVisible(true)}
          style={{
            flex: 1,
            borderColor: "#e7e7e7",
            borderWidth: 1,
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: colors.textGray }}>
            Trả xe :{" "}
            <Text style={{ fontSize: 15, fontWeight: 500, color: "black" }}>
              {formatTime(time.returnTime)}
            </Text>
          </Text>
          <AntDesign name="down" size={20} color="black" />
        </Pressable>
      </View>
      <Text
        style={{
          backgroundColor: colors.greyBackground,
          width: "100%",
          padding: 15,
          marginBottom: 8,
          marginHorizontal: 15,
          borderRadius: 10,
          color: "#333",
          fontSize: 13,
        }}
      >
        Thời gian trả xe: 0h - {formatTime(time.pickupTime)}
      </Text>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => setSheetVisible(true)}
      >
        <Text style={styles.buttonText}>Mở chọn giờ</Text>
      </TouchableOpacity> */}
      <TimePicker
        isVisible={isSheetVisible}
        onClose={() => setSheetVisible(false)}
        onSelectTime={(time) => setSelectedTime(time)}
      />
      {/* <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Return</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={23}
          step={0.5}
          value={time.returnTime}
          onValueChange={(value) => setTime({ ...time, returnTime: value })}
          minimumTrackTintColor={colors.mainColor}
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="green"
        />
        <Text>{formatTime(time.returnTime)}</Text>
      </View> */}

      {/* Save Button */}
      <MyButton
        title="Save"
        buttonStyle={{ marginHorizontal: 15, paddingVertical: 18 }}
        onPress={() => navigation.goBack()}
      ></MyButton>
      {/* <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: { fontSize: 24, fontWeight: "bold" },
  title: { fontSize: 18, fontWeight: "bold" },
  resetText: { fontSize: 16, color: "red" },
  dateContainer: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#e8f5e9",
    borderRadius: 10,
    marginBottom: 20,
  },
  dateText: { fontSize: 18, fontWeight: "bold", color: "black" },
  timeText: { fontSize: 16, color: "gray" },
  sliderContainer: {
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  sliderLabel: { fontSize: 16, fontWeight: "bold" },
  slider: { flex: 1, marginHorizontal: 10 },
  saveButton: {
    backgroundColor: "green",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

const getMarkedDates = (pickupDate, returnDate) => {
  let markedDates = {};

  if (pickupDate) {
    markedDates[pickupDate] = {
      selected: true,
      selectedColor: colors.mainColor,
    };
  }

  if (returnDate) {
    markedDates[returnDate] = {
      selected: true,
      selectedColor: colors.mainColor,
    };

    let start = new Date(pickupDate);
    let end = new Date(returnDate);
    let current = new Date(start);

    while (current < end) {
      current.setDate(current.getDate() + 1);
      let dateString = current.toISOString().split("T")[0];
      if (dateString !== returnDate) {
        markedDates[dateString] = { selected: true, selectedColor: "#90ee90" }; // Màu nhạt hơn cho ngày giữa
      }
    }
  }

  return markedDates;
};

export default TripDateTimePicker;
