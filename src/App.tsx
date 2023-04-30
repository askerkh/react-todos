import styled from "styled-components"
import { motion } from "framer-motion"
import TodoAdd from "./components/todos/TodoAdd"
import TodoList from "./components/todos/TodoList"
import Filter from "./components/todos/Filter"

const Container = styled(motion.div)`
  margin: 0 auto;
  max-width: 42rem
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  color: white;
  font-size: 1.6rem;
  & h1 {
    font-size: 2.5em;
  }
  & h2 {
    font-size: 1.75em;
  }

  & h3 {
    font-size: 1.3em;
  }

  & p {
    font-size: 1.2em;
  }
`

const App = () => {
  return (
    <Container>
      <h1>Todos</h1>
      <TodoAdd />
      <TodoList />
      <Filter />
    </Container>
  )
}

export default App
