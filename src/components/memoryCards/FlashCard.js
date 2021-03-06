import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { defaultShadow } from "../../constants/boxShadow"
import { primaryColor } from "../../constants/color"

const Common = styled.div`
  position: absolute;
  top: 0;
  padding: 0;
  width: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  box-shadow: ${defaultShadow};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  :hover {
    cursor: pointer;
  }
`

const Inner = styled.div`
  position: relative;
  text-align: center;
  transition: transform 0.4s;
  transform-style: preserve-3d;
  border: none;
  ${p => p.showBack && `transform: rotateY(180deg);`}
  ${Common}:active {
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22);
  }
`

const FlashCard = styled.div`
  width: 100%;
  background-color: transparent;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
  margin-bottom: ${p => p.marginBottom};
`

const Front = styled(Common)`
  background-color: #cdddfd;
  color: black;
`
const Back = styled(Common)`
  background-color: ${primaryColor};
  color: white;
  transform: rotateY(180deg);
`

const Hidden = styled.div`
  padding: 0.5rem;
  width: 100%;
  visibility: hidden;
`

export default ({ id, front, back, onFlip, toggleMargin, single }) => {
  const [showBack, setShowBack] = useState(false)
  const [marginBottom, setMarginBottom] = useState(5)

  useEffect(() => {
    if (single) return
    const height = document.getElementById(id).offsetHeight
    setMarginBottom(height / 8)
  }, [id, single, onFlip, toggleMargin])

  return (
    <FlashCard
      id={id}
      onClick={e => {
        e.stopPropagation()
        setShowBack(!showBack)
        if (single) return
        onFlip()
      }}
      marginBottom={marginBottom + "px"}
    >
      <Inner showBack={showBack}>
        <Hidden>{showBack ? back : front}</Hidden>
        <Front>{front}</Front>
        <Back>{back}</Back>
      </Inner>
    </FlashCard>
  )
}
