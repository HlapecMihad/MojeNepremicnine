import React, { createContext, useState } from "react";

export const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [comparisonList, setComparisonList] = useState([]);

  const addToComparison = (item) => {
    setComparisonList((prev) => {
      if (prev.length < 3 && !prev.some((i) => i.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFromComparison = (id) => {
    setComparisonList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ComparisonContext.Provider
      value={{ comparisonList, addToComparison, removeFromComparison }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};
