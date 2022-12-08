import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  updateCityName,
} from "../features/counter/counterSlice";

import { useNavigate } from "react-router-dom";

const ferrenhitToCelsius = (fahrenheit) => {
  const fTemp = fahrenheit;
  const fToCel = ((fTemp - 32) * 5) / 9;
  return Math.round(fToCel);
};

export default function CityCard({ id, cityName, currentWeather, iconPhrase }) {
  const ids = useSelector((state) => state.counter.ids);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentWeatherCelsius = ferrenhitToCelsius(parseInt(currentWeather));
  const handleCardClick = () => {
    dispatch(updateCityName(cityName));
    navigate("/MainScreen");
  };
  const isItemFavorite = (id) => {
    let index = ids.indexOf(ids.find((item) => item.id === id));
    return index !== -1 ? true : false;
  };

  const handlFavClick = () => {
    if (isItemFavorite(id)) {
      dispatch(removeFavorite(id));
    } else if (id !== undefined) {
      dispatch(
        addFavorite({
          id: id,
          cityName: cityName,
          currentWeather: currentWeatherCelsius,
          iconPhrase: iconPhrase,
        })
      );
    }
  };

  return (
    <div
      onClick={handleCardClick}
      style={{ width: 200, height: 200, float: "left", margin: 9 }}
    >
      <Card
        sx={{
          marginTop: 0.5,
        }}
        style={{ backgroundColor: "#fffde7" }}
      >
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
          >
            {cityName}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            style={{ textAlign: "center", fontSize: 14 }}
          >
            {!isItemFavorite(id) && <p>{currentWeatherCelsius} C</p>}
            {isItemFavorite(id) && (
              <p>{ids.find((item) => item.id === id).currentWeather} C</p>
            )}
            {iconPhrase}
          </Typography>
          {isItemFavorite(id) && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a
                href="#"
                alt="a"
                style={{ textAlign: "center" }}
                onClick={handlFavClick}
              >
                <FaHeart style={{ color: "red", fontSize: "35px" }} />
              </a>
            </div>
          )}
          {!isItemFavorite(id) && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a
                href="#"
                alt="a"
                style={{ textAlign: "center" }}
                onClick={handlFavClick}
              >
                <FaRegHeart
                  style={{
                    color: "red",
                    fontSize: "35px",
                    alignSelf: "center",
                  }}
                />
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
