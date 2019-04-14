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
  width: 100%;
  height: 100%;
  margin: 0;
  padding:0;

  * {
    box-sizing: border-box;
  }
`;

const DummyParent = styled.div`
  width:100%;
  height:100%;
  overflow:hidden;
`;

function Slider({ children, className }) {
  let index = 0;
  const childrenWithIndex = Children.map(children, child => cloneElement(child, { i: index++ }));

  const [sliderWidth, setSliderWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [x, setX] = useState(0);
  const [grabX, setGrabX] = useState(0);
  const [shift, setShift] = useState(0);
  const [total, setTotal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setSliderWidth(parseInt(getComputedStyle(ref.current.parentNode.parentNode).width));
  }, [ref]);

  useEffect(() => {
    ref.current.style.transform = `translateX(${total}px)`;
    return () => {
      ref.current.style.transform = ``;
    }
  }, [total]);

  useEffect(() => {
    function handler(ev) {
      if(ev.key === "ArrowLeft") nextSlide();
      else if(ev.key === "ArrowRight") previousSlide();
    }
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    }
  }, [previousSlide, nextSlide]);

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

  function nextSlide() {
    if (currentSlide === 0) {
      setTotal(0);
      setCurrentSlide(0);
    } else {
      setTotal(t => t - shift + sliderWidth);
      setCurrentSlide(s => s+1);
    }
  }

  function previousSlide() {
    if (currentSlide === -index + 1) {
      setTotal(0);
      setCurrentSlide(0);
    } else {
      setTotal(t => t - shift - sliderWidth);
      setCurrentSlide(s => s-1);
    }
  }

  function handleUp() {
    ref.current.style.transition = `.3s all ease-in-out`;
    if (Math.abs(shift) >= sliderWidth / 3.5) {
      if (shift > 0 && total > 0) {
        setTotal(0);
        setCurrentSlide(0);
      }
      else if (total < (-index + 1) * sliderWidth) {
        setTotal((-index + 1) * sliderWidth);
        setCurrentSlide(index-1);
      }
      else if (shift > 0) nextSlide();
      else previousSlide();
    } else {
      setTotal(t => t - shift);
    }
    setIsClicking(false);
    setShift(0);
  }

  return (
      <DummyParent>
        <Container
            className={className}
            i={index}
            ref={ref}
            onMouseMove={e => handleMove(e.clientX)}
            onTouchMove={e => handleMove(e.changedTouches[0].pageX)}
            onMouseDown={e => handleDown(e.clientX)}
            onTouchStart={e => handleDown(e.changedTouches[0].pageX)}
            onMouseUp={() => handleUp()}
            onTouchEnd={() => handleUp()}
        >
          {childrenWithIndex}
        </Container>
      </DummyParent>

  );
}



export default memo(Slider);
