import useLanguage from "../../context/LanguageContext";
export default function LanguageSwitcher(){const {language,setLanguage}=useLanguage();return <div className="language-switcher" aria-label="Language"><button className={language==="th"?"active":""} onClick={()=>setLanguage("th")}>TH</button><button className={language==="en"?"active":""} onClick={()=>setLanguage("en")}>EN</button></div>}
