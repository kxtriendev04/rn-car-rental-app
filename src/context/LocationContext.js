// LocationContext.js
import React, { createContext, useState, useContext } from "react";

// Tạo Context
export const LocationContext = createContext();

// Tạo Provider
export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState({
    province: "",
    district: "",
    ward: "",
    road: "",
    latitude: 0,
    longitude: 0,
  });

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook để sử dụng Context
// export const useLocation = () => useContext(LocationContext);
