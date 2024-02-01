import { configureStore, createAction, createReducer, createSlice } from "@reduxjs/toolkit"

/* 
const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const reducer = createReducer([], (builder) => {
  builder
  .addCase(addToDo,(state, action) => {state.push({id: Date.now(), data: action.payload})})
  .addCase(deleteToDo,(state, action) => state.filter(el=> el.id !== action.payload))
  }
) 

const store = configureStore({reducer})

export const actionCreator = {
  addToDo,
  deleteToDo
}
*/

const toDos = createSlice({
  name: 'toDosReducer',
  initialState: [],
  reducers: {
    addToDo: (state, action) => {state.push({id: Date.now(), data: action.payload})},
    deleteToDo: (state, action) => state.filter(el=> el.id !== action.payload)
  }
})
console.log(toDos)

const store = configureStore({reducer: toDos.reducer})

export const actionCreator = {
  addToDo: toDos.actions.addToDo,
  deleteToDo: toDos.actions.deleteToDo
}

export default store;