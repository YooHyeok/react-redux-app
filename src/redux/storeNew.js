import { configureStore, createAction, createReducer } from "@reduxjs/toolkit"

const ADD = "ADD"
const DELETE = "DELETE"

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");


const reducer = createReducer([], (builder) => {
  builder
  .addCase(addToDo,(state, action) => {state.push({id: Date.now(), data: action.payload})})
  .addCase(deleteToDo,(state, action) => state.filter(el=> el.id !== action.payload))
  }
)

const store = configureStore({reducer})

// store.subscribe()

export const actionCreator = {
  addToDo,
  deleteToDo
}

export default store;