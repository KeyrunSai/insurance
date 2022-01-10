import React from "react";
import "../styling/Main.css";

function Main(props) {

  console.log(props);
  return (
    <div className="Mask Main-div">
      {props.loginEmail ? (window.location = '/quote') : (window.location = '/login')};
    </div>
  );
}

export default Main;