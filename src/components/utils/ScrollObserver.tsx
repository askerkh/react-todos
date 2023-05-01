import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react"

interface ScrollContext {
  ScrollY: number
}

export const ScrollContext = createContext<ScrollContext>({
  ScrollY: 0,
})

const ScrollObserver: FC<PropsWithChildren> = ({ children }) => {
  const [ScrollY, setScrollY] = useState(0)

  const UpdateScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    document.addEventListener("scroll", () => {
      UpdateScroll()
    })

    return document.removeEventListener("scroll", UpdateScroll)
  }, [UpdateScroll])

  return (
    <ScrollContext.Provider value={{ ScrollY }}>
      {children}
    </ScrollContext.Provider>
  )
}

export default ScrollObserver
