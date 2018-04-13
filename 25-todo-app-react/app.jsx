/* global store, ReactDOM, dispatchAddTodo, dispatchToggleTodo */

const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
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
  <App {...store.getState()} />,
  document.getElementById('root')
)

store.subscribe(render)
render()
