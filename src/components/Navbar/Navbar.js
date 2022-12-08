import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";
import { useSpring, animated } from "react-spring";
import LottiAnimation from "../LottiAnimation";

const sppringAnimation = () => {
  const styles = useSpring({
    loop: true,
    to: [
      { opacity: 1, color: "purple" },
      { opacity: 0, color: "rgb(14,26,19)" },
    ],
    from: { opacity: 0, color: "red" },
  });

  return (
    <animated.div style={styles}>
      welcome to abra home assignment from Itamar Berti
    </animated.div>
  );
};

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="../MainScreen">MainScreen</NavLink>
          <NavLink to="../FavoritesScreen">FavoritesScreen</NavLink>
          <LottiAnimation
            animationData={require("../../animations/sun.json")}
            height={120}
            width={120}
          />
          <div style={{ margin: 10 }}>{sppringAnimation()}</div>
          <LottiAnimation
            animationData={require("../../animations/sun2.json")}
            height={90}
            width={90}
          />
          <LottiAnimation
            animationData={require("../../animations/weather.json")}
            height={120}
            width={120}
          />
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
