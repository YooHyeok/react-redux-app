const add = document.getElementById("add")
const minus = document.getElementById("minus")
const number = document.querySelector("span")

let count = 0;
const updateText = (count) => {
  number.innerText = count;
}
updateText(count);

const handleAdd = () => {
  console.log("add")
  updateText(++count);
}
const handleMinus = () => {
  console.log("minus")
  updateText(--count);
}

add.addEventListener("click", handleAdd)
minus.addEventListener("click", handleMinus)