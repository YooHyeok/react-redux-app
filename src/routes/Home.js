import { useState } from "react";
import { connect } from "react-redux";
import { actionCreator } from "../redux/storeNew";
import ToDo from "../component/ToDo";

function Home ({toDos, addToDo}) {
  console.log("Home 렌더링")
  const [data, setData] = useState("")

  function onChange(e) {
    setData(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault();
    addToDo(data)
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

function mapStateToProps(state, ownProps) {
  return {toDos: state}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addToDo: (data) => dispatch(actionCreator.addToDo(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);