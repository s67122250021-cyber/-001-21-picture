import bilingualData from "../data/master-data.bilingual.json";

const provinceNames = [
  ["กรุงเทพมหานคร","Bangkok"],["กระบี่","Krabi"],["กาญจนบุรี","Kanchanaburi"],["กาฬสินธุ์","Kalasin"],
  ["กำแพงเพชร","Kamphaeng Phet"],["ขอนแก่น","Khon Kaen"],["จันทบุรี","Chanthaburi"],["ฉะเชิงเทรา","Chachoengsao"],
  ["ชลบุรี","Chonburi"],["ชัยนาท","Chai Nat"],["ชัยภูมิ","Chaiyaphum"],["ชุมพร","Chumphon"],
  ["เชียงราย","Chiang Rai"],["เชียงใหม่","Chiang Mai"],["ตรัง","Trang"],["ตราด","Trat"],
  ["ตาก","Tak"],["นครนายก","Nakhon Nayok"],["นครปฐม","Nakhon Pathom"],["นครพนม","Nakhon Phanom"],
  ["นครราชสีมา","Nakhon Ratchasima"],["นครศรีธรรมราช","Nakhon Si Thammarat"],["นครสวรรค์","Nakhon Sawan"],
  ["นนทบุรี","Nonthaburi"],["นราธิวาส","Narathiwat"],["น่าน","Nan"],["บึงกาฬ","Bueng Kan"],
  ["บุรีรัมย์","Buri Ram"],["ปทุมธานี","Pathum Thani"],["ประจวบคีรีขันธ์","Prachuap Khiri Khan"],
  ["ปราจีนบุรี","Prachin Buri"],["ปัตตานี","Pattani"],["พระนครศรีอยุธยา","Phra Nakhon Si Ayutthaya"],
  ["พะเยา","Phayao"],["พังงา","Phang Nga"],["พัทลุง","Phatthalung"],["พิจิตร","Phichit"],
  ["พิษณุโลก","Phitsanulok"],["เพชรบุรี","Phetchaburi"],["เพชรบูรณ์","Phetchabun"],["แพร่","Phrae"],
  ["ภูเก็ต","Phuket"],["มหาสารคาม","Maha Sarakham"],["มุกดาหาร","Mukdahan"],["แม่ฮ่องสอน","Mae Hong Son"],
  ["ยโสธร","Yasothon"],["ยะลา","Yala"],["ร้อยเอ็ด","Roi Et"],["ระนอง","Ranong"],
  ["ระยอง","Rayong"],["ราชบุรี","Ratchaburi"],["ลพบุรี","Lopburi"],["ลำปาง","Lampang"],
  ["ลำพูน","Lamphun"],["เลย","Loei"],["ศรีสะเกษ","Si Sa Ket"],["สกลนคร","Sakon Nakhon"],
  ["สงขลา","Songkhla"],["สตูล","Satun"],["สมุทรปราการ","Samut Prakan"],["สมุทรสงคราม","Samut Songkhram"],
  ["สมุทรสาคร","Samut Sakhon"],["สระแก้ว","Sa Kaeo"],["สระบุรี","Saraburi"],["สิงห์บุรี","Sing Buri"],
  ["สุพรรณบุรี","Suphan Buri"],["สุราษฎร์ธานี","Surat Thani"],["สุรินทร์","Surin"],["สุโขทัย","Sukhothai"],
  ["หนองคาย","Nong Khai"],["หนองบัวลำภู","Nong Bua Lamphu"],["อ่างทอง","Ang Thong"],["อำนาจเจริญ","Amnat Charoen"],
  ["อุดรธานี","Udon Thani"],["อุตรดิตถ์","Uttaradit"],["อุทัยธานี","Uthai Thani"],["อุบลราชธานี","Ubon Ratchathani"]
];

export const provinces = provinceNames.map(([name_th, name_en], i) => ({
  province_id: `province_${String(i + 1).padStart(3, "0")}`,
  name_th,
  name_en
}));

export const categories = [
  { category_id: "category_nature", name_th: "ธรรมชาติ", name_en: "Nature" },
  { category_id: "category_culture", name_th: "วัฒนธรรมและประวัติศาสตร์", name_en: "Culture & history" },
  { category_id: "category_general", name_th: "แหล่งท่องเที่ยว", name_en: "Attractions" }
];

const byProvinceTh = Object.fromEntries(provinces.map(p => [p.name_th, p]));
const byProvinceId = Object.fromEntries(provinces.map(p => [p.province_id, p]));

const categorize = (item) => {
  const text = `${item.name_th || ''} ${item.description_th || ''}`;
  if (/วัด|พิพิธภัณฑ์|เมืองเก่า|โบราณ|พระธาตุ|มัสยิด|ศาล|อุโมงค์|ปราสาท|ค่าย|หอ/.test(text)) {
    return "category_culture";
  }
  if (/อุทยาน|ดอย|ภู|น้ำตก|หาด|ทะเล|เกาะ|ถ้ำ|คลอง|เขา|กว๊าน|ปางอุ๋ง|ผา|บึง|สวน|สระ|แหลม/.test(text)) {
    return "category_nature";
  }
  return "category_general";
};

function normalize(item, index = 0) {
  const formattedId = String(item.attraction_id || (index + 1)).padStart(3, "0");
  const province = byProvinceId[item.province_id] || 
                   byProvinceTh[item.province_th || item.province] || 
                   provinces[0];

  const autoImagePath = `/images/attractions/attraction_${formattedId}.jpg`;
  const name_en = item.name_en || `Thai attraction ${formattedId}`;

  return {
    ...item,
    attraction_id: formattedId,
    province_id: province.province_id,
    category_id: categorize(item),
    name_th: item.name_th || item.name || "ไม่ระบุชื่อสถานที่",
    name_en: name_en,
    description_th: item.description_th || item.description || "ยังไม่มีรายละเอียด",
    description_en: item.description_en || `${name_en} is a tourist destination in ${province.name_en}, Thailand.`,
    history_th: item.history_th || item.history || "ยังไม่มีข้อมูลประวัติ",
    history_en: item.history_en || `${name_en} is included in the Thiew Thai 77 attraction collection.`,
    is_featured: item.is_featured ?? index < 6,
    image_thumbnail: item.image_thumbnail || autoImagePath,
    image_detail: item.image_detail || autoImagePath
  };
}

const fallbackAttractions = (bilingualData.data || []).map(normalize);

export async function getAttractions() { return fallbackAttractions; }
export async function getAttractionById(id) {
  const list = await getAttractions();
  return list.find(x => x.attraction_id === String(id).padStart(3, "0")) || null;
}
export async function getProvinces() { return provinces; }
export async function getCategories() { return categories; }

export async function searchAttractions(query = "", filters = {}) {
  const keyword = query.trim().toLowerCase();
  const list = await getAttractions();
  
  return list.filter(x => {
    const province = byProvinceId[x.province_id];
    const text = [x.name_th, x.name_en, x.description_th, x.description_en, province?.name_th, province?.name_en].filter(Boolean);
    const matchesQuery = !keyword || text.some(v => v.toLowerCase().includes(keyword));
    const matchesProvince = !filters.province_id || x.province_id === filters.province_id;
    const matchesCategory = !filters.category_id || x.category_id === filters.category_id;
    return matchesQuery && matchesProvince && matchesCategory;
  });
}

export function getProvince(item) {
  if (!item) return provinces[0];
  return byProvinceId[item.province_id] || byProvinceTh[item.province_th || item.province] || provinces[0];
}

export function getCategory(item) {
  if (!item) return categories[2];
  return categories.find(x => x.category_id === item.category_id) || categories[2];
}