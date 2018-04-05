import React from 'react'
import { ActionCreators } from 'redux-undo'
import { connect } from 'react-redux'

const UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <p>
    <button onClick={onUndo} disabled={!canUndo}>Undo</button>
    <button onClick={onRedo} disabled={!canRedo}>Redo</button>
  </p>
)

const mapStateToProps = state => ({
  canUndo: state.todos.past.length > 0,
  canRedo: state.todos.future.length > 0
})

const mapDispatchToProps = ({
  onUndo: ActionCreators.undo,
  onRedo: ActionCreators.redo
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo)
