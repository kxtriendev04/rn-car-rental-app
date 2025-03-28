export const formatDates = (dateString1) => {
  const date1 = new Date(dateString1);
  const day1 = date1.getDate();
  const month1 = date1.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = date1.getFullYear();
  // const year2 = date2.getFullYear();

  return `${day1}/${month1}/${year}`;
};
export const formatPrice = (price) => {
  if (!price) return "Null";
  // return price.toLocaleString("vi-VN");
  return (price / 1000).toLocaleString("vi-VN");
};

export const formatTime = (value) => {
  // const hours = Math.floor(value);
  const parts = value.split(":");
  // const minutes = Math.round((value % 1) * 60);
  // return `${hours.toString().padStart(2, "0")}h${minutes
  //   .toString()
  //   .padStart(2, "0")}`;
  return parts[0] + "h" + parts[1];
};

export const getNumberOfDays = (pickupDate, returnDate) => {
  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const differenceInTime = end - start;
  return differenceInTime / (1000 * 60 * 60 * 24);
};

export const calculateDays = ({
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
}) => {
  const pickup = new Date(pickupDate);
  const returnD = new Date(returnDate);

  // Tách giờ và phút từ chuỗi "8:30" -> [8, 30]
  const [pickupHour, pickupMinute] = pickupTime.split(":").map(Number);
  const [returnHour, returnMinute] = returnTime.split(":").map(Number);

  // Đặt thời gian chính xác
  pickup.setHours(pickupHour, pickupMinute, 0, 0);
  returnD.setHours(returnHour, returnMinute, 0, 0);

  // Tính số ngày
  const diffInMs = returnD - pickup;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return Math.ceil(diffInDays); // Làm tròn lên để tính số ngày thuê
};
