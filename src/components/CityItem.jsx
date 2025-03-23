/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useCitiesContext } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeoLocation";
const formatDate = (date) => {
  if (!date) return "Unknown date"; // Fallback for missing dates

  const parsedDate = new Date(date);

  // Check if the parsedDate is valid
  if (isNaN(parsedDate)) return "Invalid date";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
};

const CityItem = ({ city }) => {
  const { currentCity, deleteCity } = useCitiesContext();
  const { setPosition } = useGeolocation();

  const { cityName, emoji, date, id, position } = city;

  const handleDelete = (e) => {
    e.preventDefault();
    deleteCity(id);
  };

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.name}>{cityName}</span>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
