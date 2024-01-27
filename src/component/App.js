import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";


export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/detail" element={<Detail/>} />
      </Routes>
    </BrowserRouter>
  )
}
