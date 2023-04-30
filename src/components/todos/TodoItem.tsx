import { motion } from "framer-motion"
import styled from "styled-components"
import { ITodo, useTodos } from "../store"
import { useEffect, useRef, useState } from "react"

const Input = styled.input`
  font-size: 1.2em;
  width: 100%;
  border: none;
  outline: none;
  padding: 0 0.25em;
  margin: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  margin-right: 0.25rem;
`

const LineThrough = styled(motion.span)`
  position: absolute;
  width: 0;
  height: 3px;
  background: #000;
  top: 52.5%;
  left: 0%;
`
const Separator = styled.div`
  width: 1px;
  height: 75%;
  background: #aaa;
`

const RightContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-right: 0.5rem;
  align-items: center;
  height: 100%;
`

const Buttons = styled.div`
  display: flex;
  width: max-content;
  gap: 0.5rem;

  & .pencil {
    transform: scale(-1, 1);
  }
`

const Button = styled(motion.button)`
  cursor: pointer;
  font-size: 1em;
  width: 2.25em;
  height: 2.25em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0.75em;
  box-shadow: 0rem 0.25rem 0.25rem #eee;
`

const Title = styled(motion.p)`
  word-break: break-all;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  position: relative;
  color: #000;
`

const Li = styled(motion.li)`
  font-size: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: between;
  align-items: center;
  width: 100%;
  height: max-content;
  max-height: 100%;
  background: white;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 1.25rem;
  border: 1px solid #aaa;
  box-shadow: 0rem 0.25rem 0.25rem #aaa;

  @media (min-width: 480px) {
    font-size: 1.2rem;
  }

  @media (min-width: 481px) {
    font-size: 1.5rem;
  }
`

const TodoItem: React.FC<ITodo> = ({ id, title, completed, icon }) => {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [deleteTodo, toggleTodo, editTodo] = useTodos((state) => [
    state.delete,
    state.toggle,
    state.edit,
  ])

  useEffect(() => {
    if (inputRef.current && isEditing) inputRef.current.value = title
  }, [isEditing, title])

  const handleEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current?.value.trim()) {
      editTodo(inputRef.current.value, id)
      setIsEditing(false)
    }
  }

  return (
    <Li
      animate={{ x: [-200, 0], opacity: [0, 1] }}
      exit={{ x: 200, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {icon}

      <Separator />

      <RightContent>
        {isEditing ? (
          <Input ref={inputRef} onKeyPress={handleEdit} />
        ) : (
          <Title
            initial={{ color: "#000" }}
            animate={completed ? { color: "#bbb" } : {}}
            onClick={() => toggleTodo(id)}
            transition={{ duration: 0.1 }}
          >
            <LineThrough
              animate={{
                width: completed ? "100%" : 0,
              }}
            />
            {title}
          </Title>
        )}

        <Buttons>
          <Button
            onClick={() => {
              setIsEditing(true)
              setTimeout(() => {
                inputRef.current?.focus()
              }, 4)
            }}
            animate={{ display: isEditing ? "none" : "block", opacity: [0, 1] }}
            whileTap={{ scale: 1.1 }}
            transition={{ duration: 0.05 }}
            type="button"
          >
            <span className="pencil">✏️</span>
          </Button>

          <Button
            onClick={
              isEditing ? () => setIsEditing(false) : () => deleteTodo(id)
            }
            whileTap={{ scale: 1.1 }}
            transition={{ duration: 0.05 }}
            type="button"
          >
            <span>❌</span>
          </Button>
        </Buttons>
      </RightContent>
    </Li>
  )
}

export default TodoItem
