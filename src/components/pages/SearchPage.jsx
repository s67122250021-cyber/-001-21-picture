import { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../common/SearchBar";
import AttractionCard from "../common/AttractionCard";
import EmptyState from "../common/EmptyState";
import useLanguage from "../../context/LanguageContext";
import { searchAttractions } from "../../services/attractionService";
import "../styles/SearchPage.css";
export default function SearchPage(){const {t}=useLanguage(),[params]=useSearchParams(),q=(params.get("q")||"").trim(),[state,setState]=useState({loading:Boolean(q),items:[],error:false});useEffect(()=>{if(!q){setState({loading:false,items:[],error:false});return}searchAttractions(q).then(items=>setState({loading:false,items,error:false})).catch(()=>setState({loading:false,items:[],error:true}))},[q]);return <div className="page container"><div className="search-heading"><p className="eyebrow">SEARCH</p><h1>{t("ค้นหาสถานที่ท่องเที่ยว","Search attractions")}</h1><SearchBar initialValue={q}/>{q&&<p>{t("ผลการค้นหา","Search results")} “{q}” {t("พบ","found")} {state.items.length} {t("รายการ","items")}</p>}</div>{!q?<EmptyState title={t("เริ่มค้นหา","Start searching")} message={t("พิมพ์ชื่อสถานที่ จังหวัด หรือคำที่เกี่ยวข้องเพื่อค้นหา","Search by place, province, or a related term.")}/>:state.loading?<div className="loading-state">{t("กำลังโหลดข้อมูล...","Loading...")}</div>:state.error?<EmptyState title={t("โหลดข้อมูลไม่ได้","Could not load data")} message=""/>:state.items.length?<div className="grid">{state.items.map(x=><AttractionCard key={x.attraction_id} attraction={x}/>)}</div>:<EmptyState title={t("ไม่พบผลการค้นหา","No results")} message={t("ลองใช้คำค้นอื่น","Try a different search term.")}/>}</div>}
