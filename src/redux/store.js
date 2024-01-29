import { createStore } from "redux"

const ADD = "ADD"
const DELETE = "DELETE"

export const addToDo = (data) => {
  return {
    type: ADD,
    data
  }
}
export const deleteToDo = (id) => {
  return {
    type: DELETE,
    id
  }
}


const reducer = (state=[] , action) => {
  switch (action.type) {
    case ADD:
      return [{id: Date.now(), data: action.data}, ...state]
    case DELETE:
      return state.filter(el=> el.id !== action.id)
    default:
      return state;
  }
}
const store = createStore(reducer)

// store.subscribe()

export default store;