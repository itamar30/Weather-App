import "./MainScreen.css";
import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@material-ui/core";
import SwitchLabels from "./components/SwitchLabels";
import { FaSearchLocation } from "react-icons/fa";
import GridItem from "./components/GridItem";
import NewCard from "./components/NewCard";
import CityCard from "./components/CityCard";
import { useSelector } from "react-redux";

function MainScreen() {
  const cityName = useSelector((state) => state.counter.cityName);
  const apiKey = "7UDxsN63GyG3bdWXtaE9nUytYtlvAg0T";
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [currentcityByLocation, setCurrentcityByLocation] = useState("");
  const [cityForeCast, setcityForeCast] = useState([]);
  const [isSwitchOn, setisSwitchOn] = useState(false);
  const [isSearchSucceed, setIsSearchSucceed] = useState(false);
  const [bgColor, setBgcolor] = useState(true);
  const [isAutoCompleteClicked, setisAutoCompleteClicked] = useState(true);
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [searchWasClicked, setsearchWasClicked] = useState(false);
  const [isFirstTimeUserEnter, setIsfirstTimeUSerEnter] = useState(true);
  const d = new Date();

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(searchbyGeoLocation);
    }
  };

  const getCity = async (city) => {
    const base =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${apiKey}&q=${city}`;
    const respone = await fetch(base + query);
    const data = await respone.json();
    setCity(data[0].EnglishName);
    return data[0];
  };

  const getCityFiveDaysForecast = async (cityKey) => {
    const base = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
    const query = `${cityKey}?apikey=${apiKey}`;
    const respone = await fetch(base + query);
    const data = await respone.json();
    setcityForeCast(data.DailyForecasts);
    return data.DailyForecasts;
  };

  const searchbyGeoLocation = async (position) => {
    const base =
      "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
    const query = `?apikey=${apiKey}&q=${position.coords.latitude},${position.coords.longitude}`;
    const respone = await fetch(base + query);
    const data = await respone.json();
    setCurrentcityByLocation(data.LocalizedName);
    getCity(data.LocalizedName)
      .then((data) => {
        setcityForeCast(data.DailyForecasts);
        setIsSearchSucceed(false);

        return getCityFiveDaysForecast(data.Key);
      })
      .catch((err) => {});
  };

  const handleClick = () => {
    getCity(search)
      .then((data) => {
        setIsSearchSucceed(true);
        setcityForeCast(data.DailyForecasts);
        return getCityFiveDaysForecast(data.Key);
      })
      .catch((err) => {
        setIsSearchSucceed(false);
      });
  };

  const afterCardWasClicked = () => {
    getCity(cityName)
      .then((data) => {
        setIsSearchSucceed(true);
        setIsfirstTimeUSerEnter(false);
        setcityForeCast(data.DailyForecasts);
        return getCityFiveDaysForecast(data.Key);
      })
      .catch((err) => {});
  };

  const renderItems =
    cityForeCast !== undefined
      ? cityForeCast.map((item, index) => (
          <NewCard
            key={Math.random()}
            day={weekday[(d.getDay() + index) % 7]}
            maxDegrees={cityForeCast[index].Temperature.Maximum.Value}
            title={cityForeCast[index].Day.IconPhrase}
            isFerenheigt={isSwitchOn}
            minDegrees={cityForeCast[index].Temperature.Minimum.Value}
            icon={cityForeCast[index].Day.Icon.toString()}
            bgColorIndex={index % 5}
          />
        ))
      : null;

  const autoComplete = async (event) => {
    const base =
      "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
    const query = `?apikey=${apiKey}&q=${search}&language=en-us`;
    const respone = await fetch(base + query);
    const data = await respone.json();
    setAutoCompleteData(data);
    return data;
  };

  const getAutoComplete = () => {
    autoComplete()
      .then((data) => {
        return data;
      })
      .catch((err) => {});
  };

  const handleSwitchDegreesUnit = () => {
    setisSwitchOn((prev) => !prev);
  };
  const handleModeChange = () => {
    setBgcolor((prev) => !prev);
  };
  return (
    <div
      className="container"
      style={{
        backgroundColor: bgColor ? "#D0F0C0" : "#ACBAAD",
        color: bgColor ? "black" : "white",
      }}
    >
      {isSearchSucceed ? (
        <>
          <div>
            <div className="searchContainer">
              <TextField
                id="outlined-name"
                label="serach city.."
                variant="outlined"
                onChange={(e) => {
                  setSearch(e.target.value);
                  getAutoComplete();
                  setsearchWasClicked(true);
                }}
                value={search}
                style={{
                  color: bgColor ? "black" : "white",
                }}
              />
              <span
                onClick={handleClick}
                className="searchIcon"
                style={{ marginLeft: 10 }}
              >
                <FaSearchLocation style={{ fontSize: "30px", marginTop: 8 }} />
              </span>
            </div>
            <div className="autoComplete">
              <div className="firstAutoComp">
                {autoCompleteData !== null &&
                  searchWasClicked &&
                  autoCompleteData.map((item, index) => (
                    <div
                      className="singleSearchres"
                      key={index}
                      onClick={() => {
                        setSearch(item.LocalizedName);
                        setsearchWasClicked(false);
                      }}
                    >
                      {item.LocalizedName}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Grid container>
            <Grid item xs={6}>
              <GridItem></GridItem>
            </Grid>
            <Grid item xs={6}>
              <GridItem></GridItem>
            </Grid>
          </Grid>
          <div> {renderItems}</div>
          {cityForeCast !== undefined && (
            <CityCard
              id={city}
              cityName={city}
              currentWeather={cityForeCast[0].Temperature.Maximum.Value}
              iconPhrase={cityForeCast[0].Day.IconPhrase}
            />
          )}
          <div className="switchesContaier">
            <SwitchLabels label="Celsius" onChange={handleSwitchDegreesUnit} />
            <SwitchLabels label="Light Mode" onChange={handleModeChange} />
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              float: "left",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <TextField
                className="input"
                id="outlined-basic"
                label="serach city.."
                variant="outlined"
                onChange={(e) => {
                  setSearch(e.target.value);
                  getAutoComplete();
                }}
                value={search}
              />
            </div>

            <div onClick={handleClick} style={{ marginLeft: 10 }}>
              <FaSearchLocation style={{ fontSize: "30px" }} />
            </div>
            {afterCardWasClicked()}
            {isSearchSucceed && <div>{renderItems}</div>}
          </div>
          <div className="autoComplete">
            {autoCompleteData !== null && isAutoCompleteClicked ? (
              <div className="serachResContainer">
                {autoCompleteData.map((item) => (
                  <div
                    className="singleSearchres"
                    key={Math.random()}
                    onClick={() => {
                      document.getElementById("outlined-basic").value =
                        item.LocalizedName;
                      setSearch(item.LocalizedName);
                      setisAutoCompleteClicked(false);
                    }}
                  >
                    {item.LocalizedName}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          {cityForeCast !== undefined &&
            !isSearchSucceed &&
            isFirstTimeUserEnter && (
              <div className="defaultLocationCard">
                <CityCard
                  id={currentcityByLocation}
                  cityName={currentcityByLocation}
                  currentWeather="70"
                  iconPhrase="current location Click me for forecast details"
                />
              </div>
            )}
        </>
      )}
    </div>
  );
}

export default MainScreen;
