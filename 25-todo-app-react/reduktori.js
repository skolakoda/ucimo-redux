/* global Redux */
const {combineReducers} = Redux

const addTodo = action => {
  return {
    id: action.id,
    text: action.text,
    completed: false
  }
}

const toggleTodo = (todo, action) => {
  if (todo.id !== action.id) return todo
  return {
    ...todo,
    completed: !todo.completed
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
  case 'ADD_TODO':
    return [
      ...state,
      addTodo(action)
    ]
  case 'TOGGLE_TODO':
    return state.map(t => toggleTodo(t, action))
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

/* KOMPOZITNI REDUKTOR */

const appState = combineReducers({
  todos,
  visibilitiFilter
})
