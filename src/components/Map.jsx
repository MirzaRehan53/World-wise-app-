import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useCitiesContext } from "../contexts/CitiesContext";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useEffect, useState } from "react";
import Button from "./Button";
/* eslint-disable react/prop-types */

const Map = () => {
  const { cities } = useCitiesContext();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
    setPosition,
  } = useGeolocation();
  const [searchParam, setSearchParam] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const location = useLocation(); // Hook to track route changes

  const mapLat = parseFloat(searchParam.get("lat"));
  const mapLng = parseFloat(searchParam.get("lng"));
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);
  // console.log(mapLat, mapLng);
  // const [mapPosition, setMapPosition] = useState([40, 0]);
  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);
  useEffect(() => {
    // This effect runs on route change
    setPosition(null); // Reset geolocation when route changes
  }, [location, setPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type={"position"} onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use Your Position"}
        </Button>
      )}

      <MapContainer
        // center={[51.505, -0.09]}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
