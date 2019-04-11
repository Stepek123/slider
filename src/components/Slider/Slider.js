import React, {useState, useEffect, useRef, Children, cloneElement} from "react";
import styled from "styled-components";

const Container = styled.div`
  position:relative;
  width: 400vw;
  height: 100vh;
  display: inline-block;
`;

export default function Slider({ children }) {
  let number = 0;
  const mapped = Children.map(children, (child) => cloneElement(child, {i: number++}));

  const [isClicking, setIsClicking] = useState(false);
  const [x, setX] = useState(0);
  const [grabX, setGrabX] = useState(0);
  const [shift, setShift] = useState(0);
  const [total, setTotal] = useState(0);
  const ref = useRef();

  useEffect(() => {
    ref.current.style.transform = `translateX(${total}px)`;
  }, [total]);

  function handleDown(clientX) {
    ref.current.style.transition = ``;
    setIsClicking(true);
    setX(clientX);
    setGrabX(clientX);
  }

  function handleMove(clientX) {
    if(isClicking) {
      setX(clientX);
      setTotal(t => t - shift + x - grabX);
      setShift(x - grabX);
    }
  }

  function handleUp(clientX) {
    ref.current.style.transition = `.5s all ease`;
    if(Math.abs(shift) >= window.innerWidth/3.5){
      if(shift>0) setTotal(t => t - shift + window.innerWidth);
      else setTotal(t => t - shift - window.innerWidth);
    } else {
      if(shift>0) setTotal(t => t - shift);
      else setTotal(t => t - shift);
    }
    setIsClicking(false);
    setShift(0);
  }

  return <Container
      ref={ref}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.changedTouches[0].pageX)}
      onMouseDown={(e) =>handleDown(e.clientX)}
      onTouchStart={(e) =>handleDown(e.changedTouches[0].pageX)}
      onMouseUp={(e) =>handleUp(e.clientX)}
      onTouchEnd={(e) =>handleUp(e.changedTouches[0].pageX)}>
    {mapped}
  </Container>;
}
