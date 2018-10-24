import React, { Component } from 'react'
import ToDoItem from '../../components/ToDoItem'
import NewToDoForm from '../../components/NewToDoForm'
import styled from 'styled-components'

const Container = styled.div`
  background: #2b2e39;
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
  padding: 14px;
  border-radius: 14px;
  margin-top: 14px;
`

const Header = styled.h1`
  color: #fff;
`

class ToDoList extends Component {
  static defaultProps = {
    tasks: [
      {text: 'Add new task to list', done: true},
      {text: 'Remove old task from list'}
    ],
    title: 'My list'
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
      <Container>
        <Header>{title}</Header>
        {tasks.map(task => <ToDoItem text={task.text} done={task.done} />)}
        <NewToDoForm
          onSubmit={this.addToDo}
          onChange={this.updateDraft}
          draft={draft}
        />
      </Container>
    )
  }
}

export default ToDoList
