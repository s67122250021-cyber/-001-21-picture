import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLanguage from "../../context/LanguageContext";
import "../styles/SearchBar.css";
export default function SearchBar({initialValue=""}){
  const [value,setValue]=useState(initialValue); const navigate=useNavigate(); const {t}=useLanguage();
  const submit=e=>{e.preventDefault(); const q=value.trim(); navigate(q?`/search?q=${encodeURIComponent(q)}`:"/search")};
  return <form className="search-bar" onSubmit={submit}>
    <input value={value} onChange={e=>setValue(e.target.value)} placeholder={t("ค้นหาสถานที่ท่องเที่ยว...","Search attractions...")} />
    <button>{t("ค้นหา","Search")}</button>
  </form>;
}
