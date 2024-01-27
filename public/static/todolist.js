import { createStore } from "/node_modules/redux/dist/redux.mjs"

const form = document.querySelector("form");
const input = document.querySelector("input")
const ul = document.querySelector("ul")

const ADD_TODO="ADD_TODO"
const DEL_TODO="DEL_TODO"

const addToDo = toDo => {
  return {type:ADD_TODO, data:toDo}
}
const deleteToDo = id => {
  return {id: id, type:DEL_TODO}
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{id: Date.now(), data:action.data}, ...state]
      case DEL_TODO:
      return state.filter(el=>el.id != action.id)
    default:
      return state;
  }
}
const store = createStore(reducer)

store.subscribe(()=>{console.log(store.getState())})

const dispatchDeleteToDo = e => {
  console.log(e.target.parentNode.id)
  store.dispatch(deleteToDo(e.target.parentNode))
}

const paintToDos = () => {
  const toDos = store.getState()
  ul.innerHTML = ""
  console.log(toDos)
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const delBtn = document.createElement("button")
    delBtn.innerText="DEL"
    delBtn.addEventListener("click", dispatchDeleteToDo)
    li.id = toDo.id;
    li.innerText = toDo.data;
    li.appendChild(delBtn)
    ul.appendChild(li);
  });
}


store.subscribe(paintToDos)

const dispatchAddToDo = toDo => {
  store.dispatch(addToDo(toDo))
}

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo)
}



form.addEventListener("submit", onSubmit);