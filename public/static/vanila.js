import { createStore } from "/node_modules/redux/dist/redux.mjs"

const add = document.getElementById("add")
const minus = document.getElementById("minus")
const number = document.querySelector("span")


const countModifier = (count = 0, action) => {
  if(action.type === "ADD") {
    return ++count;
  } 
  if(action.type === "MINUS") {
    return --count;
  }
  return count;
}

const countStore = createStore(countModifier);

const updateText = (count) => {
  number.innerText = count;
}
updateText(countStore.getState());

const handleAdd = () => {
  // updateText(++count);
  countStore.dispatch({type:"ADD"})
  updateText(countStore.getState());
}
const handleMinus = () => {
  // updateText(--count);
  countStore.dispatch({type:"MINUS"})
  updateText(countStore.getState());
}

add.addEventListener("click", handleAdd)
minus.addEventListener("click", handleMinus)