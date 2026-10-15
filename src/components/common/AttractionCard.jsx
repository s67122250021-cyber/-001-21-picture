import { Link } from "react-router-dom";
import { useState } from "react";
import useLanguage from "../../context/LanguageContext";
import { getProvince } from "../../services/attractionService";
import FavoriteButton from "../features/FavoriteButton";
import "../styles/AttractionCard.css";

export default function AttractionCard({ attraction }) {
  const { language, t } = useLanguage();
  const province = getProvince(attraction);
  
  const formattedId = String(attraction.attraction_id).padStart(3, "0");
  const defaultImage = `/images/attractions/attraction_${formattedId}.jpg`;
  
  const [imgSrc, setImgSrc] = useState(
    attraction.image_thumbnail || attraction.image_detail || defaultImage
  );
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (imgSrc !== defaultImage) {
      setImgSrc(defaultImage);
    } else {
      setHasError(true);
    }
  };

  return (
    <article className="attraction-card">
      <div className="card-image-container">
        {!hasError ? (
          <img
            src={imgSrc}
            alt={attraction[language === "en" ? "name_en" : "name_th"]}
            className="card-image"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="card-image-placeholder">
            {language === "en" ? "Image coming soon" : "ยังไม่มีรูปภาพ"}
          </div>
        )}
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span>{province?.[language === "en" ? "name_en" : "name_th"]}</span>
          <FavoriteButton attractionId={attraction.attraction_id} />
        </div>
        <h3>{attraction[language === "en" ? "name_en" : "name_th"]}</h3>
        <p>{attraction[language === "en" ? "description_en" : "description_th"]}</p>
        <Link className="card-link" to={`/attractions/${attraction.attraction_id}`}>
          {t("ดูรายละเอียด →", "View details →")}
        </Link>
      </div>
    </article>
  );
}