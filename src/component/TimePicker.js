import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { TimeContext } from "../context/TimeContext";

const TimePicker = ({ isVisible, onClose, onSelectTime }) => {
  const { time, setTime } = useContext(TimeContext);
  //   const formatTime = (hour) => `${hour.toString().padStart(2, "0")}:00`;
  const [pickupTime, setPickupTime] = useState(time.pickupTime);
  const [returnTime, setReturnTime] = useState(time.returnTime);
  //   console.log(pickupTime, returnTime);
  const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  const isReturnTimeValid =
    convertToMinutes(returnTime) <= convertToMinutes(pickupTime);
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onClose}
          pointerEvents="auto"
          style={styles.closeButton}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            paddingHorizontal: 20,
            color: "red",
            marginBottom: 4,
          }}
        >
          *Thời gian trả xe phải nhỏ hơn hoặc bằng thời gian nhận
        </Text>
        {/* Hai Picker đặt theo chiều ngang */}
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Nhận xe</Text>
            <Picker
              selectedValue={pickupTime}
              // selectedValue="8:30"
              onValueChange={(itemValue) => setPickupTime(itemValue)}
              style={styles.picker}
            >
              {Array.from({ length: 24 }, (_, h) =>
                ["00", "30"].map((m) => (
                  <Picker.Item
                    key={`pickup-${h}:${m}`}
                    label={`${h}:${m}`}
                    value={`${h}:${m}`}
                  />
                ))
              )}
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Trả xe</Text>
            <Picker
              selectedValue={returnTime}
              onValueChange={(itemValue) => setReturnTime(itemValue)}
              style={styles.picker}
            >
              {Array.from({ length: 24 }, (_, h) =>
                ["00", "30"].map((m) => (
                  <Picker.Item
                    key={`return-${h}:${m}`}
                    label={`${h}:${m}`}
                    value={`${h}:${m}`}
                  />
                ))
              )}
            </Picker>
          </View>
        </View>

        {/* Nút xác nhận */}
        <TouchableOpacity
          //   disabled={true}
          style={[styles.button, !isReturnTimeValid && styles.buttonDisabled]}
          onPress={() => {
            // onSelectTime({ pickupTime, returnTime });
            setTime((prevTime) => ({
              ...prevTime,
              pickupTime,
              returnTime,
            }));
            onClose();
          }}
          disabled={!isReturnTimeValid}
        >
          <Text style={styles.buttonText}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: { justifyContent: "flex-end", margin: 0 },
  container: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  pickerContainer: {
    flexDirection: "row", // Đặt theo chiều ngang
    justifyContent: "space-between",
  },
  pickerWrapper: {
    flex: 1,
    alignItems: "center",
  },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  picker: { width: 140, height: 90 }, // Điều chỉnh chiều rộng Picker
  button: {
    backgroundColor: "#66cc66",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 100,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  buttonDisabled: {
    backgroundColor: "#cccccc",
    opacity: 0.5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 5,
    borderRadius: 20,
    zIndex: 100,
  },
  closeButtonText: {
    fontSize: 20,
    color: "black",
  },
});

export default TimePicker;
