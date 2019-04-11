import React from "react";
import "./App.css";
import Some from "./components/Some";
import { Slider, Slide } from "./components/Slider";

function App() {
  return (
    <Slider>
      <Slide color={"deepskyblue"}>
        <p>To jest pierwszy slajd</p>
      </Slide>

      <Slide color={"yellow"}>
        <Some />
      </Slide>

      <Slide>
        <img
          draggable={false}
          src="https://randomuser.me/api/portraits/men/14.jpg"
          alt="random"
        />
      </Slide>

      <Slide>
        <img
          src="https://randomuser.me/api/portraits/men/16.jpg"
          alt="random"
        />
      </Slide>
    </Slider>
  );
}

export default App;
