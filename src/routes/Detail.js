import { connect } from "react-redux"
import { useParams } from "react-router-dom"


function mapStateProps(state, ownProps) {
  return {state}
}
export default connect(mapStateProps) (function Detail ({state}) {
  const {id} = useParams()
  const toDo = state.find(todo=> todo.id === parseInt(id))
  return (
    <>
      <h1>{toDo?.data}</h1>
      <h5>Created at: {toDo?.id}</h5>
    </>
  )
})