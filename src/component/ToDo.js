import { connect } from "react-redux"
import { actionCreator } from "../redux/store"

function ToDo({data, id, deleteToDo}) {
  console.log("ToDo렌더링")
  function onClick() {
    deleteToDo(id);
  }
  return (
    <li>
      {data} <button id={id} onClick={onClick}>X</button>
    </li>
  )
}

function mapDisptatchProps(dispatch, ownProps) {
  return {
    deleteToDo: (id) => dispatch(actionCreator.deleteToDo(id))
  }
}

export default connect(null, mapDisptatchProps) (ToDo)