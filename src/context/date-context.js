import { createContext, useContext, useState } from "react";

const NumericalValueContext = createContext();

export const NumericalValueProvider = ({ children }) => {
  const [numericalValue, setNumericalValue] = useState(0);

  const setNumericalValueWrapper = (value) => {
    setNumericalValue(value);
  };

  return (
    <NumericalValueContext.Provider
      value={{ numericalValue, setNumericalValue: setNumericalValueWrapper }}
    >
      {children}
    </NumericalValueContext.Provider>
  );
};

export const useNumericalValue = () => {
  return useContext(NumericalValueContext);
};