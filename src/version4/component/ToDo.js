import { actionCreator } from "../redux/store"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function ToDo({data, id}) {

  const dispatch = useDispatch();

  function onClick() {
    dispatch(actionCreator.deleteToDo(id));
  }
  return (
    <li>
      <Link to={`/${id}`}>
        {data}
      </Link>
      <button onClick={onClick}>X</button>
    </li>
  )
}
