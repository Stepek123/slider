import React from "react";
import styled from "styled-components";

const InnerSlide = styled.div`
  position:absolute;
  top:0;
  left: ${props => props.i*100}vw;
  display: flex;
  justify-content: center;
  align-items:center;
  background-color: ${({ color }) => color};
  width:100vw;
  height:100vh;
  user-select:none;
  
  img {
    user-select: none;
  }
`;

function Slide({ children, color, i }) {
  return <InnerSlide
      i={i}
      color={color}>
    {children}
  </InnerSlide>;
}

export default Slide;
