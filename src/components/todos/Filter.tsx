import { motion } from "framer-motion"
import { nanoid } from "nanoid"
import { useState } from "react"
import styled from "styled-components"
import { useTodos } from "../store"

const Container = styled.div`
  width: 100%;
  height: 5rem;
  background: white;
  color: black;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  border-radius: 1.25rem 1.25rem 0 0;
  border: 1px solid #aaa;
  box-shadow: 0rem 0.25rem 0.25rem #aaa;
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
  position: relative;
  bottom: 0;
`

const Button = styled(motion.button)`
  height: 2.5em;
  width: 2.5em;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 100%;
`

const btnList: { title: string; filter: string }[] = [
  {
    title: "🏠",
    filter: "",
  },
  {
    title: "☑️",
    filter: "active",
  },
  {
    title: "✅",
    filter: "completed",
  },
]

const Filter: React.FC = () => {
  const [listFilter, setListFilter] = useState("")
  const setFilter = useTodos((s) => s.setFilter)

  const handleSetFilter = (newFilter: string) => {
    setListFilter(() => {
      setFilter(newFilter)
      return newFilter
    })
  }

  return (
    <Container>
      {btnList.map(({ title, filter }) => {
        return (
          <Button
            onClick={() => handleSetFilter(filter)}
            key={filter}
            type="button"
          >
            {listFilter === filter ? <ActiveCircle /> : null}
            {title}
          </Button>
        )
      })}
    </Container>
  )
}

export default Filter

const Circle = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: transparent;
  border: 1px solid #00f;
  border-radius: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const circleId = nanoid()

const ActiveCircle = () => {
  return <Circle layoutId={circleId} />
}
