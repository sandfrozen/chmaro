import React, { Component } from 'react'
import ToDoItem from '../../components/ToDoItem'
import NewToDoForm from '../../components/NewToDoForm'
import styled from 'styled-components'
import toDoApi from '../../api/axiosConfig.js'
import * as R from 'ramda'
import ErrorComponent from '../../components/Error/index.js'

const Header = styled.h1`
  color: #fff;
`

const ErrorsContainer = styled.div`
  margin-top: 18px;
`

const DeleteAllButton = styled.button`
  border-radius: 10px;
  background: red;
  padding: 5px;
  color: #fff;
  margin-bottom: 10px;
`

class ToDoList extends Component {
  static defaultProps = {
    tasks: [],
    title: 'My list'
  }
  state = {
    tasks: this.props.tasks,
    draft: '',
    errors: []
  }

  componentDidMount = () => {
    this.getAllToDo()
  }

  updateDraft = event => {
    this.setState({ draft: event.target.value })
  }

  getAllToDo = () => {
    toDoApi
      .get()
      .then(response => response.data)
      .then(tasks => {
        this.setState({ tasks })
        // this.addError('Todos fetched', 'ok')
      })
      .catch(error => {
        console.log('getAllToDo', error)
        // this.addError('Can not fetch todos: ' + error, 'error')
      })
  }

  addToDo = () => {
    const { tasks, draft } = this.state
    const prio = 'low'
    if (draft === '') return
    toDoApi
      .post('', { content: draft, priority: prio })
      .then(response => response.data)
      .then(task => {
        if (task.id !== null) {
          tasks.push({
            id: task.id,
            content: draft,
            priority: prio,
            done: false
          })
          this.setState({ tasks, draft: '' })
          this.addError('Todo added', 'ok')
        }
      })
      .catch(error => {
        console.log('addToDo', error)
        this.addError('Can not add todo: ' + error)
      })
  }

  addError = (message, type) => {
    const errors = this.state.errors
    const last = R.takeLast(1, errors)[0]
    const id = (last !== undefined ? last.id : 0) + 1
    errors.push({ id: id, message, type })

    this.setState({ errors })
  }

  deleteAll = () => {
    toDoApi
      .delete('deleteall')
      .then(response => {
        this.setState({ tasks: [] })
        this.addError('All todos deleted', 'ok')
      })
      .catch(error => {
        console.log('deleteAll', error)
        this.addError('Can not delete all todos: ' + error, 'error')
      })
  }

  deleteToDo = id => {
    let { tasks } = this.state
    toDoApi
      .delete(`${id}`)
      .then(response => {
        const index = R.findIndex(R.propEq('id', id))(tasks)
        tasks = R.remove(index, 1, tasks)
        this.setState({ tasks })
        this.addError('Todo deleted', 'ok')
      })
      .catch(error => {
        console.log('deleteAll', error)
        this.addError('Can not delete todo: ' + error)
      })
  }

  hideError = id => {
    let errors = this.state.errors
    const index = R.findIndex(R.propEq('id', id))(errors)
    errors = R.remove(index, 1, errors)
    this.setState({ errors })
  }

  render () {
    const { title } = this.props
    const { tasks, draft, errors } = this.state
    const errorsView = errors.map(error => (
      <ErrorComponent
        key={error.id}
        id={error.id}
        hide={this.hideError}
        message={error.message}
        type={error.type}
      />
    ))
    return (
      <div>
        <Header>{title}</Header>
        <DeleteAllButton onClick={this.deleteAll}>Delete all</DeleteAllButton>
        {tasks.map(task => (
          <ToDoItem
            id={task.id}
            key={task.id}
            text={task.content}
            done={task.done}
            priority={task.priority}
            deleteToDo={this.deleteToDo}
          />
        ))}
        <NewToDoForm
          onSubmit={this.addToDo}
          onChange={this.updateDraft}
          draft={draft}
        />
        <ErrorsContainer>
          {errorsView}
        </ErrorsContainer>
      </div>
    )
  }
}

export default ToDoList
