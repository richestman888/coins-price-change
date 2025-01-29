import Home from "./Home"
import Login2 from "./pages/Login2"
import Register2 from "./pages/Register2"
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register2 />}></Route>
          <Route path="/login" element={<Login2 />}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App