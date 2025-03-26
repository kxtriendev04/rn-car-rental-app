export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  return `${day} tháng ${month} ${year}`;
};
export const formatPrice = (price) => {
  return price.toLocaleString("vi-VN");
};
