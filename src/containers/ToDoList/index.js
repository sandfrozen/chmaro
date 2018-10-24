import React, { Component } from 'react'
import ToDoItem from '../../components/ToDoItem'
import NewToDoForm from '../../components/NewToDoForm'

class ToDoList extends Component {
  static defaultProps = {
    tasks: [
      {text: 'Add new task to list', done: true},
      {text: 'Remove old task from list'}
    ],
    title: 'My default title'
  }
  state = {
    tasks: this.props.tasks,
    draft: ''
  }

  updateDraft = event => {
    this.setState({ draft: event.target.value })
  }

  addToDo = () => {
    const { tasks, draft } = this.state
    if (draft === '') return
    const list = tasks
    list.push({ text: draft, done: false })
    this.setState({ tasks: list, draft: '' })
  }

  render () {
    const { title } = this.props
    const { tasks, draft } = this.state
    return (
      <div>
        <h1>{title}</h1>
        {tasks.map(task => <ToDoItem text={task.text} done={task.done} />)}
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
