/* global store */

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
