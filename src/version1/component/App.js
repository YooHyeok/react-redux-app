import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";
import { Provider } from "react-redux";
import store from "../redux/store";


export default function App () {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:id" element={<Detail/>} />
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}
