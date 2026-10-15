import { NavLink,Link } from "react-router-dom";
import useLanguage from "../../context/LanguageContext";
import LanguageSwitcher from "../features/LanguageSwitcher";
import "../styles/Navbar.css";
export default function Navbar(){const {t}=useLanguage();return <header className="navbar"><div className="navbar-inner container"><Link to="/" className="brand"><span className="brand-mark">TH</span><strong>{t("เที่ยวไทย 77","Thiew Thai 77")}</strong></Link><nav className="nav-links"><NavLink to="/">{t("หน้าแรก","Home")}</NavLink><NavLink to="/provinces">{t("จังหวัด","Provinces")}</NavLink><NavLink to="/categories">{t("หมวดหมู่","Categories")}</NavLink><NavLink to="/attractions">{t("สถานที่ท่องเที่ยว","Attractions")}</NavLink><NavLink to="/favorites">{t("รายการโปรด","Favorites")}</NavLink></nav><LanguageSwitcher/></div></header>}
