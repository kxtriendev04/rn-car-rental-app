export const getCoordinatesFromLocationObject = async (location) => {
  const { road, ward, district, province } = location;

  // Ghép thành chuỗi địa chỉ đầy đủ
  const fullAddress = `${road}, ${ward}, ${district}, ${province}, Vietnam`;

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        fullAddress
      )}&format=json`,
      {
        headers: {
          "User-Agent": "your-app-name", // đặt tên tùy ý
          "Accept-Language": "vi",
        },
      }
    );

    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon, display_name } = data[0];
      return {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        fullAddress: display_name,
      };
    } else {
      throw new Error("Không tìm thấy địa chỉ.");
    }
  } catch (error) {
    console.error("Lỗi tìm địa chỉ:", error);
    return null;
  }
};
