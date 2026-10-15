import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import useLanguage from "../../context/LanguageContext";
import EmptyState from "../common/EmptyState";
import { getProvinces } from "../../services/attractionService";
export default function ProvinceListPage(){const {language,t}=useLanguage(),[state,setState]=useState({loading:true,items:[],error:false});useEffect(()=>{getProvinces().then(items=>setState({loading:false,items,error:false})).catch(()=>setState({loading:false,items:[],error:true}))},[]);return <div className="page container"><div className="page-heading"><div><p className="eyebrow">PROVINCES</p><h1>{t("จังหวัดทั้ง 77 จังหวัด","All 77 provinces")}</h1><p>{t("เลือกจังหวัดเพื่อดูสถานที่ท่องเที่ยว","Choose a province to explore attractions.")}</p></div></div>{state.loading?<div className="loading-state">{t("กำลังโหลดข้อมูล...","Loading...")}</div>:state.error?<EmptyState title={t("โหลดข้อมูลไม่ได้","Could not load data")} message=""/>:<div className="province-grid all-provinces">{state.items.map(p=><Link key={p.province_id} to={`/attractions?province_id=${p.province_id}`}>{p[language==="en"?"name_en":"name_th"]}</Link>)}</div>}</div>}
