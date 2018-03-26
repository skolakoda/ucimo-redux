import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList.jsx'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
  case 'SHOW_COMPLETED':
    return todos.filter(t => t.completed)
  case 'SHOW_ACTIVE':
    return todos.filter(t => !t.completed)
  case 'SHOW_ALL':
  default:
    return todos
  }
}

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos.present, state.visibilityFilter)
})

const mapDispatchToProps = ({
  onTodoClick: toggleTodo
})

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
