import styled from "styled-components"
import TodoItem from "./TodoItem"
import { useTodos } from "../store"
import { AnimatePresence } from "framer-motion"
import { useMemo } from "react"

const Container = styled.ul`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  padding: 0 1rem;
  width: 100%;
  height: 100%;
  display: flex;
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
    font-size: 1em;
  }
`

const TodoList = () => {
  const [todos, filter] = useTodos((s) => [s.todos, s.filter])

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed)
      case "completed":
        return todos.filter((t) => t.completed)
      default:
        return todos
    }
  }, [filter, todos])

  return (
    <Container>
      <AnimatePresence mode="sync">
        {filteredTodos.map((t) => {
          return <TodoItem key={t.id} {...t} />
        })}
      </AnimatePresence>
    </Container>
  )
}

export default TodoList
