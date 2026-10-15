import { Route,Routes } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import useLanguage from "./context/LanguageContext";
import { FavoritesProvider } from "./hooks/useFavorites.jsx";
import Navbar from "./components/layout/Navbar";
import HomePage from "./components/pages/HomePage";
import AttractionsPage from "./components/pages/AttractionsPage";
import AttractionDetailPage from "./components/pages/AttractionDetailPage";
import FavoritesPage from "./components/pages/FavoritesPage";
import SearchPage from "./components/pages/SearchPage";
import ProvinceListPage from "./components/pages/ProvinceListPage";
import CategoryListPage from "./components/pages/CategoryListPage";
function Application(){const {t}=useLanguage();return <FavoritesProvider><div className="app"><Navbar/><main className="main-content"><Routes><Route path="/" element={<HomePage/>}/><Route path="/provinces" element={<ProvinceListPage/>}/><Route path="/categories" element={<CategoryListPage/>}/><Route path="/attractions" element={<AttractionsPage/>}/><Route path="/attractions/:id" element={<AttractionDetailPage/>}/><Route path="/favorites" element={<FavoritesPage/>}/><Route path="/search" element={<SearchPage/>}/><Route path="*" element={<div className="container empty-page"><h1>{t("ไม่พบหน้าที่ต้องการ","Page not found")}</h1></div>}/></Routes></main><footer className="footer"><div className="container">{t("เที่ยวไทย 77","Thiew Thai 77")} © 2026</div></footer></div></FavoritesProvider>}
export default function App(){return <LanguageProvider><Application/></LanguageProvider>}
