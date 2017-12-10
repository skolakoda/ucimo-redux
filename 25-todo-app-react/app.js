/* global todoApp */

const {Component} = React
const {createStore} = Redux
const store = createStore(todoApp)

let nextTodoId = 0

/* AKCIJE */

const dispatchFilter = filter => store.dispatch({
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

/* KOMPONENTE */

const Link = ({
    active,
    children,
    onClick
  }) => {
  if (active) return <span>{children}</span>
  return <a href="#" onClick={onClick}>{children}</a>
}

const FilterLink = ({filter, children}) => (
  <Link
    active={filter === store.getState().visibilitiFilter}
    onClick={() => dispatchFilter(filter)}
  >{children}</Link>
)

const Footer = () => (
  <p>
    Show:&nbsp;
    <FilterLink filter='SHOW_ALL'>All</FilterLink>&nbsp;
    <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>&nbsp;
    <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
  </p>
)

const Todo = props => (
  <li
    onClick={props.onClick}
    style={{textDecoration: props.completed ? 'line-through' : 'none'}}
    >
    {props.text}
  </li>
)

const TodoList = props => {
  const lista = props.todos.map(todo =>
    <Todo key={todo.id}
      onClick={() => props.onTodoClick(todo.id)}
      {...todo}
    />
  )
  return <ul>{lista}</ul>
}

const AddTodo = ({onAddClick}) => {
  let input
  return (
    <div>
      <input ref={el => input = el} />
      <button onClick={() => {onAddClick(input.value); input.value = ''}}>
        Add Todo
      </button>
    </div>
  )
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL': return todos
    case 'SHOW_COMPLETED': return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE': return todos.filter(t => !t.completed)
    default: return todos
  }
}

const TodoApp = ({todos, visibilitiFilter}) => (
  <div>
    <AddTodo onAddClick={text => dispatchAddTodo(text)} />
    <TodoList
      todos={getVisibleTodos(todos, visibilitiFilter)}
      onTodoClick={id => dispatchToggleTodo(id)}
    />
    <Footer />
  </div>
)

/* INIT */

const render = () => ReactDOM.render(
  <TodoApp {...store.getState()} />,
  document.getElementById('root')
)

store.subscribe(render)
render()
