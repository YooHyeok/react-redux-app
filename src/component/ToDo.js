import { connect } from "react-redux"
import { actionCreator } from "../redux/store"
import { Link } from "react-router-dom";

function ToDo({data, id, deleteToDo}) {
  console.log("ToDo렌더링")
  function onClick() {
    deleteToDo();
  }
  return (
    <li>
      <Link to={`/${id}`}>
        {data} <button onClick={onClick}>X</button>
      </Link>
    </li>
  )
}

function mapDisptatchProps(dispatch, ownProps) {
  return {
    deleteToDo: () => dispatch(actionCreator.deleteToDo(ownProps.id))
  }
}

export default connect(null, mapDisptatchProps) (ToDo)