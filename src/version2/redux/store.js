import {createAction, createReducer, createStore } from "@reduxjs/toolkit"

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

/* 더이상 지원하지 않는다. */
/* const reducer = createReducer([], {
  [addToDo] : (state, action) => [{id: Date.now(), data: action.payload}, ...state],
  [deleteToDo] : (state, action) => state.filter(el=> el.id !== action.payload)
}) */

const reducer = createReducer([], (builder) => {
  builder
  .addCase(addToDo,(state, action) => [{id: Date.now(), data: action.payload}, ...state])
  .addCase(deleteToDo,(state, action) => state.filter(el=> el.id !== action.payload))
  }
)
const store = createStore(reducer)

export const actionCreator = {
  addToDo,
  deleteToDo
}

export default store;