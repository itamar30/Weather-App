import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ferrenhitToCelsius = (fahrenheit) => {
  const fTemp = fahrenheit;
  const fToCel = ((fTemp - 32) * 5) / 9;
  return Math.round(fToCel);
};

const NewCard = ({
  maxDegrees,
  minDegrees,
  day,
  isFerenheigt,
  title,
  icon,
  bgColorIndex,
}) => {
  const bgColorsArr = ["#b3e5fc", "#c5e1a5", "#f1f8e9", "#81d4fa", "#dcedc8"];
  return (
    <Box
      sx={{
        float: "left",
      }}
    >
      <Card
        variant="outlined"
        style={{ backgroundColor: bgColorsArr[bgColorIndex] }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {isFerenheigt && <p>Max {maxDegrees} F</p>}
            {!isFerenheigt && <p>Max {ferrenhitToCelsius(maxDegrees)} C</p>}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography variant="body2">{title}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {day}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {isFerenheigt && <p>Min {minDegrees} F</p>}
            {!isFerenheigt && <p>Min {ferrenhitToCelsius(minDegrees)} C</p>}
          </Typography>
          <img src={require(`../icons/${icon}.png`)} alt="fe" />
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
};

export default NewCard;
