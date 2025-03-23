import styles from "./CityList.module.css";
import Spinner from "../components/Spinner";
import CityItem from "./CityItem";
import Message from "../components/Message";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useEffect } from "react";
/* eslint-disable react/prop-types */

const CityList = () => {
  const { cities, isLoading } = useCitiesContext();

  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
  }
  console.log(cities);

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city?.id} />
      ))}
    </ul>
  );
};

export default CityList;
