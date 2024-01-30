import { connect } from "react-redux"
import { actionCreator } from "../redux/storeNew"
import { Link } from "react-router-dom";

function ToDo({data, id, deleteToDo}) {
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

function mapDispatchToProps(dispatch, ownProps) {
  return {
    deleteToDo: () => dispatch(actionCreator.deleteToDo(ownProps.id))
  }
}

export default connect(null, mapDispatchToProps) (ToDo)