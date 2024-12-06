import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ContextProviderProps {
  children: ReactNode; 
}

interface CurrencyContex {
    toList: string;
    setToList: React.Dispatch<React.SetStateAction<string>>;
    isSubmitted : boolean;
    setIsSubmitted : React.Dispatch<React.SetStateAction<boolean>>;
}


const ToCurrencyContext = createContext<CurrencyContex | null>(null);

export function CurrencyProvider({ children }: ContextProviderProps) {

  const   [toList, setToList] = useState("");
  const   [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <ToCurrencyContext.Provider value={{ toList, setToList, isSubmitted, setIsSubmitted }}>
      {children}
    </ToCurrencyContext.Provider>
  );
}
export const useCurrency = () => {
  const value = useContext(ToCurrencyContext);
  if (value == null) {
    throw new Error("useTheme has to be used within <ThemeProvider>");
  }
  return value;
};