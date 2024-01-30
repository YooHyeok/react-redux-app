import { connect } from "react-redux"
import { useParams } from "react-router-dom"


function mapStateProps(state, ownProps) {
  console.log(ownProps)
  console.log(state)
  return {state}
}
export default connect(mapStateProps) (function Detail ({state}) {
  const {id} = useParams()
  console.log(state.find(todo=>todo.id === parseInt(id)))
  return <h1>{state.find(todo=> todo.id === parseInt(id)).data}</h1>
})