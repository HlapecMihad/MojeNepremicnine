import React, { createContext, useState } from "react";
 
export const NepremicnineContext = createContext();
 
export const NepremicnineProvider = ({ children }) => {
  const [nepremicnine, setNepremicnine] = useState([]);
 
  const addNepremicnine = (items) => {
    setNepremicnine(items);
  };
 
  return (
    <NepremicnineContext.Provider value={{ nepremicnine, addNepremicnine }}>
      {children}
    </NepremicnineContext.Provider>
  );
};
 