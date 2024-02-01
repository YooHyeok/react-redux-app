import { createStore } from "redux"

const ADD = "ADD"
const DELETE = "DELETE"

const addToDo = (data) => {
  console.log(data)
  return {
    type: ADD,
    data
  }
}

const deleteToDo = (id) => {
  console.log(id)
  return {
    type: DELETE,
    id: parseInt(id)
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

export const actionCreator = {
  addToDo,
  deleteToDo
}

export default store;