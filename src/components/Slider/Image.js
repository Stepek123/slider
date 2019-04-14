import React from "react";
import styled from "styled-components";

const FakeImage = styled.div`
    width:100%;
    height:100%;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
`;

export default function Image({src, alt}) {
    return (
        <FakeImage src={src} aria-label={alt}/>
    )
}