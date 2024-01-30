import { connect } from "react-redux"
import { actionCreator } from "../redux/store"

function ToDo({data, deleteToDo}) {
  console.log("ToDo렌더링")
  function onClick() {
    deleteToDo();
  }
  return (
    <li>
      {data} <button onClick={onClick}>X</button>
    </li>
  )
}

function mapDisptatchProps(dispatch, ownProps) {
  return {
    deleteToDo: () => dispatch(actionCreator.deleteToDo(ownProps.id))
  }
}

export default connect(null, mapDisptatchProps) (ToDo)