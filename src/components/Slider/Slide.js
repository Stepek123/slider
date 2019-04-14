import React from "react";
import styled from "styled-components";

const InnerSlide = styled.div`
  position:absolute;
  top:0;
  left: ${({i}) => i*100}%;
  display: flex;
  justify-content: center;
  align-items:center;
  background-color: ${({ color }) => color};
  width:100%;
  height:100%;
  user-select:none;
  
  img:hover {
    cursor: none;
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
