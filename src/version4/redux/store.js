import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit"

const toDos = createSlice({
  name: 'toDosReducer',
  initialState: [],
  reducers: {
    addToDo: (state, action) => {state.push({id: Date.now(), data: action.payload})},
    deleteToDo: (state, action) => state.filter(el=> el.id !== action.payload)
  }
})

const toDos2 = createSlice({
  name: 'toDosReducer2',
  initialState: [],
  reducers: {
    addToDo: (state, action) => {state.push({id: Date.now(), data: action.payload})},
    deleteToDo: (state, action) => state.filter(el=> el.id !== action.payload)
  }
})

const reducer = combineReducers({
  toDos: toDos.reducer,
  toDos2: toDos2.reducer,
});

const store = configureStore({reducer})

export const actionCreator = {
  addToDo: toDos.actions.addToDo,
  deleteToDo: toDos.actions.deleteToDo
}

export default store;