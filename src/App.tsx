import styled from "styled-components"
import { motion } from "framer-motion"
import { TodoAdd, TodoList, Filter } from "./components/todos"

const Container = styled(motion.div)`
  margin: 0 auto;
  max-width: 42rem;
  width: 100%;
  display: flex;
  height: 100vh;
  max-height: -webkit-fill-available;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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

  @media (max-width: 480px) {
    & h1 {
      font-size: 1.75em;
    }
    & h2 {
      font-size: 1.3em;
    }

    & h3 {
      font-size: 1.2em;
    }

    & p {
      font-size: 1em;
    }
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
