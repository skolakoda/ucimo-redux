/* global store, setFilter */

const Link = ({ active, children, onClick }) => (
  active
    ? <span>{children}</span>
    : <a href="#" onClick={onClick}>{children}</a>
)

const FilterLink = ({ filter, children }) => (
  <Link
    active={filter === store.getState().filter}
    onClick={() => setFilter(filter)}
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

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{textDecoration: completed ? 'line-through' : 'none'}}
  >
    {text}
  </li>
)

const TodoList = ({ todos, onTodoClick }) => {
  const lista = todos.map(todo =>
    <Todo key={todo.id} onClick={() => onTodoClick(todo.id)} {...todo} />
  )
  return <ul>{lista}</ul>
}

const AddTodo = ({onAddClick}) => {
  let input
  return (
    <div>
      <input ref={el => input = el} />
      <button onClick={() => {onAddClick(input.value)}}>
        Add Todo
      </button>
    </div>
  )
}
