import React, { Component } from 'react'
import ToDoItem from '../../components/ToDoItem'
import NewToDoForm from '../../components/NewToDoForm'
import styled from 'styled-components'
import toDoApi from '../../api/axiosConfig.js'
import * as R from 'ramda'

const Header = styled.h1`
  color: #fff;
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
    tasks: [
      { id: 0, content: 'If you see this text', done: true },
      { id: 1, content: 'You don\'t have internet connection' },
      { id: 2, content: 'Or database is failed' }
    ],
    title: 'My list'
  }
  state = {
    tasks: this.props.tasks,
    draft: ''
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
      })
      .catch(error => {
        console.log('getAllToDo', error)
      })
  }

  addToDo = () => {
    const { tasks, draft } = this.state
    if (draft === '') return
    toDoApi
      .post('', { content: draft })
      .then(response => response.data)
      .then(task => {
        if (task.id !== null) {
          tasks.push({ id: task.id, content: draft, done: false })
          this.setState({ tasks, draft: '' })
        }
      })
      .catch(error => {
        console.log('addToDo', error)
      })
  }

  deleteAll = () => {
    toDoApi
      .delete('deleteall')
      .then(response => {
        this.setState({ tasks: [] })
      })
      .catch(error => {
        console.log('deleteAll', error)
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
      })
      .catch(error => {
        console.log('deleteAll', error)
      })
  }

  render () {
    const { title } = this.props
    const { tasks, draft } = this.state
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
            deleteToDo={this.deleteToDo}
          />
        ))}
        <NewToDoForm
          onSubmit={this.addToDo}
          onChange={this.updateDraft}
          draft={draft}
        />
      </div>
    )
  }
}

export default ToDoList
