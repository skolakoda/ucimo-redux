import React from 'react'
import Footer from './Footer.jsx'
import AddTodo from '../containers/AddTodo.jsx'
import VisibleTodoList from '../containers/VisibleTodoList.jsx'
import UndoRedo from '../containers/UndoRedo.jsx'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <UndoRedo />
  </div>
)

export default App
