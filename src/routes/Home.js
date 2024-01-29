import { useState } from "react";
import { connect } from "react-redux";
import { actionCreator } from "../redux/store";

function Home ({toDos, addToDo}) {
  
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
      <input type="text" value={data} onChange={onChange}/>
      <button>Add</button>
    </form>
    <ul>{JSON.stringify(toDos)}</ul>
  </>
  )
}

function mapStateProps(state, ownProps) {
  return {toDos: state}
}

function mapDisptatchProps(dispatch, ownProps) {
  return {
    addToDo: (data) => dispatch(actionCreator.addToDo(data)),
    deleteToDo: (data) => dispatch(actionCreator.deleteToDo(data))
  }
}

export default connect(mapStateProps, mapDisptatchProps) (Home);