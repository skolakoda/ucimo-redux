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

const Link = ({
    active,
    children,
    onClick
  }) => {
  if (active) return <span>{children}</span>

  return <a href="#" onClick={e => {
    e.preventDefault()
    onClick()
  }} >
    {children}
  </a>
}

class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const props = this.props
    const state = store.getState()

    return (
      <Link
        active={props.filter === state.visibilitiFilter}
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    )
  }
}

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
    >
      All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE'
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED'
    >
      Completed
    </FilterLink>
  </p>
)

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

const AddTodo = ({onAddClick}) => {
  let input
  return (
    <div>
    <input ref={el => input = el} />
      <button onClick={() => {
        onAddClick(input.value)
        input.value = ''
      }}>
        Add Todo
      </button>
    </div>
  )
}

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
const TodoApp = ({
  todos,
  visibilitiFilter
}) => (
  <div>
    <AddTodo onAddClick={text =>
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text
        })
      }
    />
    <TodoList
      todos={getVisibleTodos(todos, visibilitiFilter)}
      onTodoClick={id =>
        store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })
      }
    />
    <Footer />
  </div>
)

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
