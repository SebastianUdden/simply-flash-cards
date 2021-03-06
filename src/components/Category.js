import React from "react"
import styled from "styled-components"
import { Card } from "./Card"
import RandomCards from "./randomCards/RandomCards"

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`
const Category = styled.h2`
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  background-color: #222;
  padding: 1rem;
  color: #eee;
  :hover {
    cursor: pointer;
  }
`

export default ({ title, cards, mode, onSelect, selected }) => (
  <>
    {title && (
      <Category onClick={() => onSelect(selected ? "" : title)}>
        <span>{title}</span>
        <span>{selected ? <>&times;</> : <>&#x2193;</>}</span>
      </Category>
    )}
    {mode === "Test" && selected && <RandomCards mode={mode} cards={cards} />}
    {mode === "Multi-choice" && selected && (
      <RandomCards mode={mode} cards={cards} />
    )}
    {mode === "Text" && selected && <RandomCards mode={mode} cards={cards} />}
    {(mode === "Study" || mode === "Memorize") && selected && (
      <Cards>
        {cards.length
          ? cards.map(card => (
              <Card {...card} isTest={mode === "Memorize"} lvl={1} />
            ))
          : "This list is empty..."}
      </Cards>
    )}
  </>
)
