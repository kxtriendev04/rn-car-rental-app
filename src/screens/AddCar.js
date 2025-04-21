import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import colors from "../util/colors";
import { useForm, Controller } from "react-hook-form";
import HeaderNavigation from "../component/HeaderNavigation";
import api from "../util/api";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

const AddCar = ({ navigation }) => {
  const [features, setFeatures] = useState([""]);
  const [images, setImages] = useState([]);
  const [showBrandOptions, setShowBrandOptions] = useState(false);
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  const richText = useRef();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ownerId: 1,
      name: "",
      description: "",
      star: 0,
      brand: "Khác",
      year: "",
      pricePerDay: "",
      features: [],
      collateral: "",
      term: "",
      isPublished: false,
      status: "Sẵn xe",
      images: [],
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets]);
    }
  };

  const onSubmit = async (data) => {
    const htmlContent = await richText.current?.getContentHtml();
    console.log("Nội dung HTML:", htmlContent);
    // if (features.length > 0 && features.some((f) => !f.trim())) {
    //   Alert.alert("Lỗi", "Bạn đang bỏ trống đặc điểm nổi bật");
    //   return;
    // }
    // data.features = features.filter((f) => f.trim());
    // data.images = images;
    const requestFeature = [];
    features.forEach((f) => {
      requestFeature.push({
        library: "MaterialCommunityIcons",
        name: "air-conditioner",
        title: f.trim(),
      });
    });
    // console.log(requestFeature);
    // console.log("images: ", images);
    const request = {
      name: data.name,
      brand: data.brand,
      description: data.description,
      year: data.year,
      star: 5,
      pricePerDay: data.pricePerDay,
      isPublished: data.isPublished,
      collateral: data.collateral,
      term: data.term,
      status: data.status == "Sẵn xe" ? "Available" : "NotAvailable",
      owner: {
        id: data.ownerId,
      },
      // images: [
      //   {
      //     imageUrl:
      //       "https://m.atcdn.co.uk/ect/media/%7Bresize%7D/4b14ab0c7868451baf5912779f112f40.jpg",
      //   },
      //   {
      //     imageUrl:
      //       "https://static.independent.co.uk/2025/02/18/10/40/Kia-EV6.png",
      //   },
      // ],
      features: requestFeature,
      // "address": {"id": 15}
    };
    // console.log(request);
    try {
      console.log(123);
      await api.post("/vehicles", request);
      // console.log("success");
      Alert.alert("Thêm xe thành công!!!");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Thêm xe thất bại!!! ", e);
    }
  };

  const brandOptions = ["Tesla", "Vinfast", "KIA", "Toyota", "Khác"];
  const statusOptions = ["Sẵn xe", "Không sẵn xe"];

  const dismissEditor = () => {
    richText.current?.blurContentEditor();
    Keyboard.dismiss(); //
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={dismissEditor}>
        <ScrollView contentContainerStyle={styles.container}>
          <HeaderNavigation navigation={navigation} title="Thêm xe của bạn" />
          <View style={{ marginHorizontal: 16 }}>
            {/* <Text style={styles.label}>ID chủ xe: 1</Text> */}

            <Text style={styles.label}>Tên xe *</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: "Bạn đang bỏ trống tên xe" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Nhập tên xe"
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.name && (
              <Text style={styles.error}>{errors.name.message}</Text>
            )}

            <Text style={styles.label}>Mô tả *</Text>
            {/* <RichEditor
              ref={richText}
              placeholder="Nhập nội dung ở đây..."
              style={styles.richEditor}
              // onChange={(text) => console.log("Content:", text)}
            />

            <RichToolbar
              editor={richText}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
              ]}
              iconMap={{
                [actions.setBold]: () => <Text style={styles.icon}>B</Text>,
                [actions.setItalic]: () => <Text style={styles.icon}>I</Text>,
              }}
            /> */}
            <Controller
              control={control}
              name="description"
              rules={{ required: "Bạn đang bỏ trống mô tả" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={[
                    styles.input,
                    {
                      height: 90,
                    },
                  ]}
                  placeholder="Nhập mô tả"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.description && (
              <Text style={styles.error}>{errors.description.message}</Text>
            )}

            <Text style={styles.label}>Hãng xe *</Text>
            <Controller
              control={control}
              name="brand"
              render={({ field: { onChange, value } }) => (
                <View>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setShowBrandOptions(!showBrandOptions)}
                  >
                    <Text style={styles.dropdownButtonText}> {value} </Text>
                    <Text
                      style={[
                        styles.dropdownButtonText,
                        { color: colors.mainColor },
                      ]}
                    >
                      {" "}
                      ▼{" "}
                    </Text>
                  </TouchableOpacity>
                  {showBrandOptions && (
                    <View style={styles.dropdown}>
                      {brandOptions.map((option) => (
                        <TouchableOpacity
                          key={option}
                          style={styles.dropdownItem}
                          onPress={() => {
                            onChange(option);
                            setShowBrandOptions(false);
                          }}
                        >
                          <Text style={styles.dropdownText}>{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              )}
            />

            <Text style={styles.label}>Năm sản xuất *</Text>
            <Controller
              control={control}
              name="year"
              rules={{ required: "Bạn đang bỏ trống năm sản xuất của xe" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Chọn năm sản xuất"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.year && (
              <Text style={styles.error}>{errors.year.message}</Text>
            )}

            <Text style={styles.label}>Giá thuê mỗi ngày (VNĐ) *</Text>
            <Controller
              control={control}
              name="pricePerDay"
              rules={{ required: "Bạn đang bỏ trống giá thuê" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Nhập giá cho thuê"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.pricePerDay && (
              <Text style={styles.error}>{errors.pricePerDay.message}</Text>
            )}

            <Text style={styles.label}>Đặc điểm nổi bật</Text>
            {features.map((feature, idx) => (
              <View key={idx} style={styles.row}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={feature}
                  placeholder="Nhập tên đặc điểm"
                  onChangeText={(text) => {
                    const newFeatures = [...features];
                    newFeatures[idx] = text;
                    setFeatures(newFeatures);
                  }}
                />
                <TouchableOpacity
                  onPress={() =>
                    setFeatures(features.filter((_, i) => i !== idx))
                  }
                >
                  <TouchableOpacity
                    style={styles.buttonRed}
                    onPress={() =>
                      setFeatures(features.filter((_, i) => i !== idx))
                    }
                  >
                    <Text style={styles.buttonText}>Xoá</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            ))}
            {features.length < 5 && (
              <TouchableOpacity
                style={styles.buttonBlue}
                onPress={() => setFeatures([...features, ""])}
              >
                <Text style={styles.buttonText}>Thêm đặc điểm</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.label}>Tài sản thế chấp</Text>
            <Controller
              control={control}
              name="collateral"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    {
                      height: 90,
                    },
                  ]}
                  multiline
                  numberOfLines={4}
                  placeholder="Nhập tài sản thế chấp"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Text style={styles.label}>Điều khoản khác</Text>
            <Controller
              control={control}
              name="term"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    {
                      height: 90,
                    },
                  ]}
                  multiline
                  numberOfLines={4}
                  placeholder="Nhập điều khoản khác"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <View style={styles.rowCheckbox}>
              <Text style={styles.label}>Công khai</Text>
              <Controller
                control={control}
                name="isPublished"
                render={({ field: { value, onChange } }) => (
                  <Checkbox value={value} onValueChange={onChange} />
                )}
              />
            </View>

            <Text style={styles.label}>Trạng thái *</Text>
            <Controller
              control={control}
              name="status"
              render={({ field: { onChange, value } }) => (
                <View>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setShowStatusOptions(!showStatusOptions)}
                  >
                    <Text style={styles.dropdownButtonText}> {value} </Text>
                    <Text
                      style={[
                        styles.dropdownButtonText,
                        { color: colors.mainColor },
                      ]}
                    >
                      {" "}
                      ▼{" "}
                    </Text>
                  </TouchableOpacity>
                  {showStatusOptions && (
                    <View style={styles.dropdown}>
                      {statusOptions.map((option) => (
                        <TouchableOpacity
                          key={option}
                          style={styles.dropdownItem}
                          onPress={() => {
                            onChange(option);
                            setShowStatusOptions(false);
                          }}
                        >
                          <Text style={styles.dropdownText}>{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              )}
            />

            <Text style={styles.label}>Danh sách ảnh</Text>
            <TouchableOpacity style={styles.buttonBlue} onPress={pickImage}>
              <Text style={styles.buttonText}>Chọn ảnh</Text>
            </TouchableOpacity>

            <ScrollView horizontal>
              {images.map((img, idx) => (
                <Image
                  key={idx}
                  source={{ uri: img.uri }}
                  style={{ width: 100, height: 100, margin: 5 }}
                />
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.buttonMain}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Thêm xe</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    paddingTop: 20,
    backgroundColor: colors.whiteColor,
  },
  label: {
    // fontWeight: "bold",
    marginTop: 16,
    // marginBottom: 12,
    fontSize: 17,
    fontFamily: "Quicksand_600SemiBold",
    marginBottom: 10,
    color: colors.textColor,
  },
  input: {
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 8,
    // padding: 10,
    // marginTop: 4,
    // marginBottom: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    paddingRight: 50,
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "100%",

    textAlignVertical: "top",
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  rowCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  remove: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 10,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    marginBottom: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#000",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  buttonBlue: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonRed: {
    backgroundColor: "red",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 6,
    // height: "100%",
  },
  buttonMain: {
    backgroundColor: colors.mainColor,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 20,
    marginBottom: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 4,
  },
  richEditor: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    minHeight: 100,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  icon: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 4,
  },
});

export default AddCar;
