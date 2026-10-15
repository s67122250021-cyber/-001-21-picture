import { createContext, useContext, useState } from "react";
const LanguageContext=createContext(null);
export function LanguageProvider({children}){const [language,setLanguage]=useState("th");return <LanguageContext.Provider value={{language,setLanguage,t:(th,en)=>language==="en"?en:th}}>{children}</LanguageContext.Provider>}
export default function useLanguage(){const value=useContext(LanguageContext);if(!value)throw new Error("useLanguage must be used inside LanguageProvider");return value}
