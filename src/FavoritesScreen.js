import React from "react";
import CityCard from "./components/CityCard";
import { useSelector } from "react-redux";
import "./FavoritesScreen.css";

function FavoritesScreen() {
  const ids = useSelector((state) => state.counter.ids);
  const renderItems = ids.map((item) => (
    <CityCard
      key={item.cityName}
      id={item.id}
      cityName={item.cityName}
      currentWeather={item.currentWeather}
      iconPhrase={item.iconPhrase}
    />
  ));

  return <div className="card">{renderItems}</div>;
}

export default FavoritesScreen;
