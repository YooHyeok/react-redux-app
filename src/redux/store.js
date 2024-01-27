import { createStore } from "redux"

const reducer = (state , action) => {
  console.log(action)
}
const store = createStore(reducer)

export default store;