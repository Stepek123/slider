import React, {useState} from "react";
import Some from "./components/Some";
import { Slider, Slide, Image } from "./components/Slider";

function App() {
  const [users] = useState(["Mateusz", "Patrycja"]);
  return (
      <div style={{
        width: "800px",
        height: "50vh",
        border:"3px solid black",
      }
      }>
        <Slider>
          <Slide color={"deepskyblue"}>
            <p>To jest pierwszy slajd</p>
          </Slide>

          <Slide color={"yellow"}>
            <Some />
          </Slide>

          <Slide color={"green"}>
            <Image
                src="https://randomuser.me/api/portraits/men/14.jpg"
                alt="random"
            />
          </Slide>

          <Slide>
            <Image
                src="https://i.pinimg.com/originals/c6/22/46/c62246425d2c45d07ff2ad24ecd620cc.jpg"
                alt="random"
            />
          </Slide>

          {users.map(user => (<Slide>{user}</Slide>))}
        </Slider>
      </div>

  );
}

export default App;
