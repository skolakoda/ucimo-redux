/* global appState, ReactDOM, Redux */

const {createStore} = Redux
const store = createStore(appState)

let nextTodoId = 0

/* TVORCI AKCIJA */

const setFilter = filter => store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

const dispatchAddTodo = text => store.dispatch({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

const dispatchToggleTodo = id => store.dispatch({
  type: 'TOGGLE_TODO',
  id
})

const filterTodos = (todos, filter) => {
  switch (filter) {
  case 'SHOW_ALL': return todos
  case 'SHOW_COMPLETED': return todos.filter(t => t.completed)
  case 'SHOW_ACTIVE': return todos.filter(t => !t.completed)
  default: return todos
  }
}

const App = ({todos, visibilitiFilter}) => (
  <div>
    <AddTodo onAddClick={text => dispatchAddTodo(text)} />
    <TodoList
      todos={filterTodos(todos, visibilitiFilter)}
      onTodoClick={id => dispatchToggleTodo(id)}
    />
    <Footer />
  </div>
)

/* INIT */

const render = () => ReactDOM.render(
  <App {...store.getState()} />, document.getElementById('root')
)

store.subscribe(render)
render()
