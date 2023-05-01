import styled from "styled-components"
import TodoItem from "./TodoItem"
import { useTodos } from "../store"
import { AnimatePresence, Reorder } from "framer-motion"
import { useMemo } from "react"

const Container = styled(Reorder.Group)`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  height: max-content;
  padding: 0 1rem;
  flex-grow: 1;
  width: 100%;
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
  const [todos, filter, setTodos] = useTodos((s) => [
    s.todos,
    s.filter,
    s.setTodos,
  ])

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "completed":
        return todos.filter((t) => t.completed)
      case "active":
        return todos.filter((t) => !t.completed)
      default:
        return todos
    }
  }, [todos, filter])

  return (
    <Container onReorder={setTodos} axis="y" values={todos}>
      <AnimatePresence initial={false} mode="sync">
        {filteredTodos.map((t) => {
          return <TodoItem key={t.id} todo={t} />
        })}
      </AnimatePresence>
    </Container>
  )
}

export default TodoList
