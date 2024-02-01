import { configureStore, createSlice } from "@reduxjs/toolkit"

const toDos = createSlice({
  name: 'toDosReducer',
  initialState: [],
  reducers: {
    addToDo: (state, action) => {state.push({id: Date.now(), data: action.payload})},
    deleteToDo: (state, action) => state.filter(el=> el.id !== action.payload)
  }
})

const store = configureStore({reducer: toDos.reducer})

export const actionCreator = {
  addToDo: toDos.actions.addToDo,
  deleteToDo: toDos.actions.deleteToDo
}

export default store;