import { createStore } from "redux"
import { createAction, createReducer } from "@reduxjs/toolkit"

const ADD = "ADD"
const DELETE = "DELETE"

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");


/* const reducer = (state=[] , action) => {
  switch (action.type) {
    case addToDo.type:
      return [{id: Date.now(), data: action.payload}, ...state]
    case deleteToDo.type:
      return state.filter(el=> el.id !== action.payload)
    default:
      return state;
  }
} */

const reducer = createReducer([], {
  [addToDo] : (state, action) => [{id: Date.now(), data: action.payload}, ...state],
  [deleteToDo] : (state, action) => state.filter(el=> el.id !== action.payload)
})

const store = createStore(reducer)

// store.subscribe()

export const actionCreator = {
  addToDo,
  deleteToDo
}

export default store;