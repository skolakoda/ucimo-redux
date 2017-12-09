/* REDUKTORI */

// state se odnosi na pojedini todo
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    return {
      id: action.id,
      text: action.text,
      completed: false
    }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) return state
      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    default:
      return state
  }
}

const visibilitiFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

// kompozitni reduktor

const {combineReducers} = Redux

const todoApp = combineReducers({
  todos,
  visibilitiFilter
})

/* SKLADISTE */

const {createStore} = Redux
const store = createStore(todoApp)

/* KOMPONENTE */

const { Component } = React

const FilterLink = ({
    filter,
    currentFilter,
    children
  }) => {
  if (filter === currentFilter) return <span>{children}</span>

  return <a href="#" onClick={e => {
    e.preventDefault()
    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter
    })
  }} >
    {children}
  </a>
}

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}>
    {text}
  </li>
)

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
  {todos.map(todo =>
    <Todo key={todo.id}
      {...todo}
      onClick={() => onTodoClick(todo.id)}
    />
  )}
  </ul>
)

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      return todos
  }
}

let nextTodoId = 0
class TodoApp extends Component {
  render() {
    const {
      todos,
      visibilitiFilter
    } = this.props
    const visibleTodos = getVisibleTodos(todos, visibilitiFilter)
    return (
      <div>
        <input ref={el => this.input = el} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
          })
          this.input.value = ''
        }}>
          Add Todo
        </button>
        <TodoList
          todos={visibleTodos}
          onTodoClick={id =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
          }
        />
        <p>
          Show:
          {' '}
          <FilterLink
            filter='SHOW_ALL'
            currentFilter={visibilitiFilter}
          >
            All
          </FilterLink>
          {' '}
          <FilterLink
            filter='SHOW_ACTIVE'
            currentFilter={visibilitiFilter}
          >
            Active
          </FilterLink>
          {' '}
          <FilterLink
            filter='SHOW_COMPLETED'
            currentFilter={visibilitiFilter}
          >
            Completed
          </FilterLink>
        </p>
      </div>
    )
  }
}

/* INIT */

const render = () => {
  ReactDOM.render(
    // prosledjuje sva stanja kao svojstva
    <TodoApp {...store.getState()} />,
    document.getElementById('root')
  )
}

store.subscribe(render)
render()
