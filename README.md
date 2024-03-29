
# Pure Redux

## 프로젝트 설정

<details>
<summary>[ 설정 상세보기 ]</summary>
　

* `yarn 설치`
    ```
    npm i -g yarn
    ```

 * `[yarn] run start`
    ```
    yarn start
    ```

 * `[yarn] redux 설치`
    ```
    yarn add redux
    ```

  *  `순수 HTML & JS - NPM 모듈 참조`   
    순수 html 자바스크립트에서 npm module을 사용하려면 선언한 script에 type을 module로 지정해줘야 하고,
    import문을 통해 모듈을 참조할 경우 해당 디렉토리를 절대 경로로 참조해야 한다.   

      * [ vanila.html ]
          ```html
            <script type="module" src="static/vanila.js" ></script>
          ```
      * [ vanila.js ]
          ```js
          import { createStore } from "/node_modules/redux/dist/redux.mjs"
          ```
</details>

## redux

 - createStore
 - reducer
 - getState
 - dispatch
 - subscribe

## store & reducer
redux의 store는 state를 저장하는 곳이다.
state란 변경될 수 있는 data를 말한다.

redux에는 createStore라는 함수가 존재한다.

여기서 말하는 store란 기본적으로 state data를 넣을 수 있는 장소를 생성한다.
리덕스는 state data를 관리하는데 도와주는 역할을 하기 위해 만들어졌다.


```js
import { createStore } from "/node_modules/redux/dist/redux.mjs"

const countModifier = (state = 0) => {
  return ++state;
}
const countStore = createStore(countModifier)
console.log(countStore.getState())
```
위와같이 createStore()함수를 통해 store를 생성하고 매개변수로 reducer함수를 전달한다.   
`reducer함수는 state와 action을 전달받아 새로운 state를 반환해준다.`    

## action
action은 실행할 기능을 정의하는 객체이다.

action은 아래와 같은 객체 형태이다.
```json
  {type:"ADD"}
  {type:"MINUS"}
```
우리는 전달받은 action에 type속성을 통해 어떤 작업을 할지 확인할 수 있다.

## dispatch
그렇다면 action은 어떻게 전달할 까?

그것은 바로 생성한 store로부터 호출하는 dispatch함수이다.   

```js
import { createStore } from "/node_modules/redux/dist/redux.mjs"

const countModifier = (state = 0, action) => {
  console.log(action.type) // ADD를 출력한다.
  return ++state;
}
const countStore = createStore(countModifier)
countStore.disptch({type:"ADD"})
```

이렇게 전달받은 action의 type속성을 통해 어떤 동작을 할지 정할 수 있게 된다.

```js
import { createStore } from "/node_modules/redux/dist/redux.mjs"

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
countStore.dispatch({type:"ADD"})
countStore.dispatch({type:"ADD"})
countStore.dispatch({type:"ADD"})
countStore.dispatch({type:"MINUS"})
console.log(countStore.getState()) // 3 - 1 이므로 2가 출력된다.
```
즉, dispatch는 action객체의 전달 뿐만 아니라 전달 후 
createStore에 넘긴 reducer를 함께  호출한다.

```js
function createStore(reducer, preloadedState, enhancer) {
  /* 생략 */
  let currentReducer = reducer;
  let currentState = preloadedState;
  let isDispatching = false;
  function ensureCanMutateNextListeners() {}
  function getState() {}
  function subscribe(listener) {}
  function dispatch(action) {
    /* 생략 */
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    /* 생략 */
  }
```
위와 같이 disptch는 createStore의 소속이며, dispatch가 호출 되면 전달받은 reducer함수를 action객체를 전달하여 실행한다.


## subscribe
store에 변화를 감지하여 매개변수로 전달받은 함수를 호출한다.

```js
import { createStore } from "/node_modules/redux/dist/redux.mjs"

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
countStore.subscribe(()=>{
  console.log("변경됨!")
})
countStore.dispatch({type:"ADD"})
countStore.dispatch({type:"ADD"})
countStore.dispatch({type:"ADD"})
countStore.dispatch({type:"MINUS"})
console.log(countStore.getState()) // 3 - 1 이므로 2가 출력된다.
```

여기서 감지되는 변화 대상은 state를 말한다.

## + TIP) js 값 비교시 자주 사용되는 상수는 const변수에 저장한다.

```js
const constable = (data) => {

  switch (data) {
    case "A": console.log("A출력")
      break;
    case "B" : console.log("B출력")
  }
}

constable("Aa")
```
위와 같이 코드를 작성하면 오류가 발생하지 않는다.
A를 입력해야하는데 실수로 소문자 a가 함께 말려들어갔다.

만약 이것을 상수화 한다면 컴파일 시점에서 오류를 확인할 수 있다.

```js
const A = "A";
const B = "B";
const constable = (data) => {

  switch (data) {
    case "A": console.log("A출력")
      break;
    case "B" : console.log("B출력")
  }
}

constable(A)
constable(Aa) //오류 발생
constable(B)
constable(Bb) //오류 발생
```

## never mutate state
기본적으로 redux의 state는 react와 마찬가지로 read-only이다.
따라서 수정시 state값을 mutate 하지 않는다.
이는 redux는 주로 react에서 사용하기 때문이다.

mutation이란 아래의 코드형태로 데이터를 변경시키는 것이다.
```js
const friends = ["dal", "hae", "nick", "hyeok"]
friends.push("yoo")
friends.remove("nick")
```
기존 배열등의 오브젝트에 추가/삭제 하여 수정 하는방식이다.

상태를 수정하는것이 아닌 새로운 Objects를 리턴하여 상태를 변경한다.

```js
let friends = ["dal", "hae", "nick", "hyeok"]
friends = [...friends, "yoo"]
friends = friends.filter((f)=> {return f !== "nick" })
```

단, CDN을 사용하는 pure한 js에서는 추가/삭제에 대한 컬렉션의 함수로 수정해도 무관하다.

# REACT REDUX

* ### `[yarn] react-redux 설치`

    ```text/plain
    > yarn add react-redux
    ```
## store와 component간 연결 (Provider, connect, mapStateToProps)


### Provider
먼저 Provider를 통해 store객체를 전역으로 공급한다.
```js
import React from 'react';
import ReactDOM from "react-dom/client"
import App from "./component/App"
import { Provider } from 'react-redux';
import store from './redux/store';
ReactDOM 
      .createRoot(document.getElementById('root'))
      .render(
            <Provider store={store}>
                  <App/>
            </Provider>
      )
```

### connect & mapStateToProps
connect함수는 컴포넌트로 전달하는 props에 특정 속성 추가될 수 있도록 허용해준다.
매개변수로 콜백 함수를 받는데, 구현할 함수는 mapStateToProps라고 부른다.
구현할 mapStateToProps는 매개변수로 redux store로부터 state와 기존 props를 가져오고
return을 통해 현재 컴포넌트의 props에 특정 속성을 넣을 수 있다.
getState()를 통해  state를 가져오는것이라고 생각할 수 있다.

```js
import { connect } from "react-redux";



function Home (props) {
  console.log(props) //{sexy:true, dispatch: f}
  
  return "HOME"
}

export default connect((state, ownProps)=>{  
  console.log(state, ownProps)
  return {sexy:true}
}) (Home);

```

### connect & mapDisptatchProps

connect의 두번째 매개변수로는 mapDispatchToProps함수를 구현한 콜백함수를 넘긴다.
이 함수는 sotre로 부터 dispatch와 고유한 props를 제공받는다.
mapStateToProps와 마찬가지로 return을 통해 현재 컴포넌트에게 전달할 props에 속성을 추가할 수 있다.

```js
function Home ({dispatch}) {
  
  console.log(dispatch) //mapDispatchToProps에서 반환한 함수가 출력됨

  return "HOME"
}
export default connect(mapStateToProps, (dispatch, ownProps) => {
  return {
    dispatch
  }
}) (Home);
```
위와 같이 Provider된 store로부터 받아온 dispatch 함수 자체를 객체로 감싸 반환하면, 해당 함수를 props로 재전달받아 컴포넌트에서 호출할 수 있게 된다.

# Redux-ToolKit
더 적은 양의 Redux코드를 짤 수 있도록 도와준다.

* ### `@reduxjs/toolkit`

    ```
    > npm install @reduxjs/toolkit
    ```
    ```
    > yarn add @reduxjs/toolkit
    ```

## createAction
createAction()를 기본적으로 선언할 때 type과 prepareAction을 매개변수로 받는다.   
해당 함수의 내부에는 actionCreator(args)함수가 있고, 매개변수 args는 payload값을 전달받는다.   
actionCreator()는 최종적으로 createAction()에서 받은 type과 payload를 지닌 action객체 {type, payload}를 생성한다. 
createAction은 최종 반환시 {type,payload} 속성을 가진 객체를 반환하는 actionCreator해당 함수를 반환한다.

dispatch에서 actionCreator 함수 콜백으로 전달하면 reducer에서는 actionCreator함수의 return값을 action으로 받게된다.

따라서 reducer에서는 action에 접근하여 type과 payload를 제공받을 수 있다.

```js
function createAction(type, prepareAction) {
  function actionCreator(...args) {
    if (prepareAction) {
      let prepared = prepareAction(...args);
      if (!prepared) {
        throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(0) : "prepareAction did not return an object");
      }
      return {
        type,
        payload: prepared.payload,
        ..."meta" in prepared && {
          meta: prepared.meta
        },
        ..."error" in prepared && {
          error: prepared.error
        }
      };
    }
    return {
      type,
      payload: args[0]
    };
  }
  actionCreator.toString = () => `${type}`;
  actionCreator.type = type;
  actionCreator.match = (action) => isAction(action) && action.type === type;
  return actionCreator;
}
```

정리하자면 아래와 같다.

```js
const reducer = (state, action) {
  console.log(state)
  console.log(action) // {type:일일일, payload:111} 출력
  console.log(action.type) //일일일 출력
  console.log(action.payload) //111 출력
}
const store = createStore(reducer)
const actionCreator = createAction(type) //매개변수 type에 일일일
store.dispatch(actionCreator(payload)) //매개변수 payload에 111
```

## createReducer - v1

첫번째 arg는 initialState이다.    
두번째 arg는 actionHandlers이다.   
initialState는 state의 초기값을 지정해주면 되고,
actionHandlers은 선언한 createAction함수를 key로 두고 value에 작동할 reducer함수를 지정한다.    

이때 key에 들어오는 값은 createAction함수명이다.    
key를 [대괄호] 형태로 함수명을 지정해줬는데 이는 js의 computed property name 이라는 문법을 나타낸다.  
이는 객체의 속성명을 동적으로 생성할 수 있게 해주는 문법이다.   
지정해주는 함수가 반환하는 값에 따라 동적으로 key값이 지정된다.

dispacth()에 어떤 createAction함수가 매개값으로 호출됬는지 Object형태로 파악하도록 함수의 이름으로 등록해준것같다.

```
{[object Object]: f}
```
```
{
  [object Object]: f
}
```

콘솔에서는 위와같이 출력된다.   
해당 object형태의 key인지 내부적으로 비교하여 매핑되는 메소드를 실행시켜주는 원리인것 같다.


``` js
import { createAction, createReducer } from "@reduxjs/toolkit"

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const reducer = createReducer([], {
  [addToDo] : (state, action) => [{id: Date.now(), data: action.payload}, ...state],
  [deleteToDo] : (state, action) => state.filter(el=> el.id !== action.payload)
  }
)
const store = createStore(reducer)

```

## createReducer - v2

v2부터는 아래와 같은 문법으로 지정해 줘야 한다.

``` js
import { createAction, createReducer } from "@reduxjs/toolkit"

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const reducer = createReducer([], (builder) => {
  builder
  .addCase(addToDo,(state, action) => [{id: Date.now(), data: action.payload}, ...state])
  .addCase(deleteToDo,(state, action) => state.filter(el=> el.id !== action.payload))
  }
)
const store = createStore(reducer)

```

## immer - mutate update
redux toolkit은 immer 아래에서 작동된다.
redux툴킷이 mutate한 state 변경사항이 있는것을 자동으로 확인한다.
즉, state가 mutate한 수정이 발생할 경우 immer에 의해서 mutation하지 않은 수정으로 변경해준다.

```js
const reducer = createReducer([], (builder) => {
  builder
  .addCase(addToDo,(state, action) => {
    state.push({id: Date.now(), data: action.payload})
}

)
  .addCase(deleteToDo,(state, action) => state.filter(el=> el.id !== action.payload))
  }
)
```
위 코드를 보면 addTo라는 case는 return하지 않는다.

즉, state에 대한 mutate 작업이 있다면 return하지않고,
mutate하지않은 reducer 함수는 수정한 이후의 state를 return해야한다.

## configureStore와 redux devtools

### configureStore
middleware를 지원하여 개발자에게 조금 더 편리한 기능을 제공해준다.

```js
import { configureStore, createReducer } from "@reduxjs/toolkit"

const reducer = createReducer(()=>{})
const store = configureStore({reducer})
```
### redux devtools

configureStore에 등록된 state값과 변동내역을 실시간으로 확인할 수 있고, history를 직접 관리할 수 있으며 dispatch를 직접 제어할 수도 있다.

`https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ko`

## createSlice

reducer뿐만 아니라 actions도 생성해준다.
매개변수로 name, initialState, reducers들을 세팅해준다.
```js
const toDos = createSlice({
  name: 'toDosReducer',
  initialState: [],
  reducers: {
    addToDo: (state, action) => {state.push({id: Date.now(), data: action.payload})},
    deleteToDo: (state, action) => state.filter(el=> el.id !== action.payload)
  }
})
```
console로 해당 slice를 찍어보면 아래와 같다.

```json
{
  name: 'toDosReducer',
  actions: {addToDo:ff, deleteToDo: f},
  reducer: f reducer(state, action),
  /*... 나머지 생략 ...*/
}
```

reducers에 등록된 reducer를 configureStore에 등록할때는 reducers가 아닌 reducer로 접근한다    
action 그 자체로 함수를 가져올 때는 actions를 통해 접근한다.

```js
export const actionCreator = {
  addToDo: toDos.actions.addToDo,
  deleteToDo: toDos.actions.deleteToDo
}
```

최종적으로 redux devtools에서 확인하게되면
action의 이름은 slice에 등록한 name/함수명 으로 확인할 수 있다.

# 추가 팁 combineReducers와 useSelector, useDispatch

## combineReducers
2개 이상의 reducer를 사용해야 하는 경우에는 combineReducers를 사용한다.

```js
const allReducer = combineReducers({
//관리할 리듀서를 입력한다.
toDos: toDos.reducer,
toDos2: toDos2.reducer
})
const store = configureStore({reducer: allReducer});
```

아래와 같이 예제를 작성해본다.
```js
const toDos = createSlice({
  name: 'toDosReducer',
  initialState: [],
  reducers: {
    /* 생략 */
    },
});

const toDos2 = createSlice({
  name: 'toDosReducer2',
  initialState: [],
  reducers: {
    /* 생략 */
    },
});

// combineReducers 함수를 사용하여 리듀서를 합친다.
const reducer = combineReducers({
  toDos: toDos.reducer,
  toDos2: toDos2.reducer,
});
const store = configureStore({reducer})

export const toDosActionCreator = {
  addToDo: toDos.actions.addToDo,
  deleteToDo: toDos.actions.deleteToDo
}
export const toDos2ActionCreator = {
  addToDo: toDos2.actions.addToDo,
  deleteToDo: toDos2.actions.deleteToDo
}


```

컴포넌트의 mapStateProps, mapDispatchProps
```js
function mapStateToProps(state, ownProps) {
  // return {toDos: state.toDos} state.
  return {
    toDos: state.toDos,
    toDos2: state.toDos2,
  }
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    addToDo: (data) => dispatch(toDosActionCreator.addToDo(data))
    addToDo2: (data) => dispatch(toDos2ActionCreator.addToDo(data))
  }
}
```


## useSelector
useSelector는 mapStateToPros를 대신할 수 있다.
데이터가 배열인 경우에는 map으로 꺼낼 때 useSelector로 꺼내온 데이터를 변수로 지정하고 콘솔찍어보면 combineReducers에서 적어놓은 리듀서 이름으로 배열이 만들어져있을것이다.
const selector = useSelector(state => state)로 빼왔으면
selector.리듀서이름으로 접근한다.

```js
export default function Home() {
  
  const selector = useSelector(state=>state)
  const toDos = selector.toDos

}
```

## useSelector
useDispatch는 mapDispatchToProps를 대신할 수 있다.


```js
import { actionCreator } from "../redux/store"
export default function Home() {
  
  const selector = useSelector(state=>state)
  const toDos = selector.toDos

  return (
    {toDos.map(el-> el)}
  )

  const dispatch = useDispatch()
  dispatch(actionCreator.addToDo(data)) //dispatch(/* action */)

}
```