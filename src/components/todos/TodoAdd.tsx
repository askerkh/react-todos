import { motion } from "framer-motion"
import styled from "styled-components"
import { useTodos } from "../store"
import { useEffect, useRef } from "react"

const Container = styled(motion.div)`
  width: 80%;
  height: 3rem;
`

const Input = styled(motion.input)`
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  font-size: 1.8rem;
  color: black;
  outline: none;
  border-radius: 0.75rem;
  border: 1px solid;
  box-shadow: 0rem 0.25rem 0.25rem #aaa;

  &::placeholder {
    color: #ccc;
    font-size: 1em;
  }
`

const TodoAdd: React.FC = () => {
  const addTodo = useTodos((state) => state.add)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current || !inputRef.current.value.trim()) return

    const text = inputRef.current.value.trim()

    if (e.key === "Enter") {
      addTodo(text)
      inputRef.current.value = ""
    }
  }

  return (
    <Container
      initial={{ opacity: 0, y: -30, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "3rem" }}
      transition={{ duration: 0.3 }}
    >
      <Input
        initial={{ borderColor: "#ccc" }}
        whileFocus={{ borderColor: "#000" }}
        ref={inputRef}
        type="text"
        placeholder="Type title here..."
        onKeyPress={handleSubmit}
      />
    </Container>
  )
}

export default TodoAdd
