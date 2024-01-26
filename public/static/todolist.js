import { createStore } from "/node_modules/redux/dist/redux.mjs"

const form = document.querySelector("form");
const input = document.querySelector("input")
const ul = document.querySelector("ul")

const ADD_TODO="ADD_TODO"
const DEL_TODO="DEL_TODO"

const paintToDos = () => {
  const toDos = store.getState()
  ul.innerHTML = ""
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    li.innerText = toDo.data;
    ul.appendChild(li);
  });
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, {id: Date.now(), data:action.data}]
      case DEL_TODO:
      state.remove(action.data)
      return state
    default:
      return state;
  }
}
const store = createStore(reducer)
store.subscribe(paintToDos)

const addToDo = toDo => {
  store.dispatch({type:ADD_TODO, data:toDo})
}

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  addToDo(toDo)
}


form.addEventListener("submit", onSubmit);