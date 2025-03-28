import { createContext, useState } from "react";

export const TimeContext = createContext();
const DateNow = new Date().toISOString().split("T")[0];
const Tomorrow = new Date(new Date().setDate(new Date().getDate() + 2))
  .toISOString()
  .split("T")[0]; // Chuyển đổi thành chuỗi YYYY-MM-DD

export const TimeProvider = ({ children }) => {
  const [time, setTime] = useState({
    pickupDate: DateNow,
    returnDate: Tomorrow,
    pickupTime: "8:30",
    returnTime: "7:30",
  });

  return (
    <TimeContext.Provider value={{ time, setTime }}>
      {children}
    </TimeContext.Provider>
  );
};
