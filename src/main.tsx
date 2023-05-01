import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import ScrollObserver from "./components/utils/ScrollObserver.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ScrollObserver>
      <App />
    </ScrollObserver>
  </React.StrictMode>,
)
