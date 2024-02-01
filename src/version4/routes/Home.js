import { useState } from "react";
import { actionCreator } from "../redux/store";
import ToDo from "../component/ToDo";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Home () {
  console.log("Home 렌더링")
  const selector = useSelector(state=>state)
  const toDos = selector.toDos
  const dispatch = useDispatch();
  const [data, setData] = useState("")
  
  function onChange(e) {
    setData(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(actionCreator.addToDo(data))
    setData("")
  }
  return (
  <>
    <h1>To Do</h1>
    <form onSubmit={onSubmit}>
      <input type="text" value={data} onChange={onChange} required/>
      <button>Add</button>
    </form>
    <ul>
      {toDos.map((todo)=><ToDo key={todo.id} {...todo}/>)}
    </ul>
  </>
  )
}