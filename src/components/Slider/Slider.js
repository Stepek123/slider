import React, {
  useState,
  useEffect,
  useRef,
  Children,
  cloneElement,
    memo
} from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: ${props => props.i * 100}vw;
  height: 100vh;
  display: inline-block;
`;

function Slider({ children }) {
  let index = 0;
  const childrenWithIndex = Children.map(children, child =>
      cloneElement(child, { i: index++ })
  );

  const [isClicking, setIsClicking] = useState(false);
  const [x, setX] = useState(0);
  const [grabX, setGrabX] = useState(0);
  const [shift, setShift] = useState(0);
  const [total, setTotal] = useState(0);
  const ref = useRef();

  useEffect(() => {
    ref.current.style.transform = `translateX(${total}px)`;
    return () => {
      ref.current.style.transform = ``;
    }
  }, [total]);

  function handleDown(clientX) {
    ref.current.style.transition = ``;
    setIsClicking(true);
    setX(clientX);
    setGrabX(clientX);
  }

  function handleMove(clientX) {
    if (isClicking) {
      setX(clientX);
      setTotal(t => t - shift + x - grabX);
      setShift(x - grabX);
    }
  }

  function handleUp() {
    ref.current.style.transition = `.2s all ease`;
    if (Math.abs(shift) >= window.innerWidth / 3.5) {
      if (shift > 0 && total > 0) setTotal(0);
      else if (total < (-index + 1) * window.innerWidth)
        setTotal((-index + 1) * window.innerWidth);
      else if (shift > 0) setTotal(t => t - shift + window.innerWidth);
      else setTotal(t => t - shift - window.innerWidth);
    } else {
      setTotal(t => t - shift);
    }
    setIsClicking(false);
    setShift(0);
  }

  return (
    <Container
      i={index}
      ref={ref}
      onMouseMove={e => handleMove(e.clientX)}
      onTouchMove={e => handleMove(e.changedTouches[0].pageX)}
      onMouseDown={e => handleDown(e.clientX)}
      onTouchStart={e => handleDown(e.changedTouches[0].pageX)}
      onMouseUp={e => handleUp(e.clientX)}
      onTouchEnd={e => handleUp(e.changedTouches[0].pageX)}
    >
      {childrenWithIndex}
    </Container>
  );
}

export default memo(Slider);
