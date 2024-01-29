import { useState } from "react";
import store from "../redux/store";
import { connect } from "react-redux";

function Home ({toDos}) {
  const [text, setText] = useState("")

  function onChange(e) {
    setText(e.target.value)
  }
  function onSubmit(e) {
    e.preventDefault();
    store.dispatch({type:"ADD"})
    setText("")
  }

  return (
  <>
    <h1>To Do</h1>
    <form onSubmit={onSubmit}>
      <input type="text" value={text} onChange={onChange}/>
      <button>Add</button>
    </form>
    <ul>{JSON.stringify(toDos)}</ul>
  </>
  )
}

function mapStateProps(state, dispatch) {
  console.log(state)
  return {toDos: state.id}
}

export default connect(mapStateProps) (Home);