import styles from "./CountryList.module.css";
import Spinner from "../components/Spinner";
import CountryItem from "./CountryItem";
import Message from "../components/Message";
import { useCitiesContext } from "../contexts/CitiesContext";
/* eslint-disable react/prop-types */

const CountryList = () => {
  const { cities, isLoading } = useCitiesContext();
  const countries = [];
  for (let i = 0; i < cities.length; i++) {
    // console.log(cities[i + 1].country);
    if (!countries.some((item) => cities[i].country === item.country)) {
      countries.push({
        country: cities[i].country,
        emoji: cities[i].emoji,
      });
    }
  }
  // console.log(countries);

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

  console.log(countries);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country} />
      ))}
    </ul>
  );
};

export default CountryList;
