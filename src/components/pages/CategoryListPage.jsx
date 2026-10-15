import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import useLanguage from "../../context/LanguageContext";
import EmptyState from "../common/EmptyState";
import { getCategories } from "../../services/attractionService";
export default function CategoryListPage(){const {language,t}=useLanguage(),[state,setState]=useState({loading:true,items:[],error:false});useEffect(()=>{getCategories().then(items=>setState({loading:false,items,error:false})).catch(()=>setState({loading:false,items:[],error:true}))},[]);return <div className="page container"><div className="page-heading"><div><p className="eyebrow">CATEGORIES</p><h1>{t("หมวดหมู่สถานที่ท่องเที่ยว","Attraction categories")}</h1></div></div>{state.loading?<div className="loading-state">{t("กำลังโหลดข้อมูล...","Loading...")}</div>:state.error?<EmptyState title={t("โหลดข้อมูลไม่ได้","Could not load data")} message=""/>:<div className="province-grid all-provinces">{state.items.map(c=><Link key={c.category_id} to={`/attractions?category_id=${c.category_id}`}>{c[language==="en"?"name_en":"name_th"]}</Link>)}</div>}</div>}
