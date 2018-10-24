import React, { Component } from 'react'
import ToDoItem from '../../components/ToDoItem'
import NewToDoForm from '../../components/NewToDoForm'
import styled from 'styled-components'
// import axios from 'axios'

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

const DestroyButton = styled.button`
  border-radius: 10px;
  background: red;
  padding: 5px;
  color: #fff;
  margin-bottom: 10px;
`

class ToDoList extends Component {
  componentDidMount () {
    // axios.get('https://localhost:5001/api/todo').then(response => {
    //   this.setState({
    //     tasks: response.data
    //   })
    // })
    fetch('https://localhost:5001/api/todo')
      .then(response => response.json())
      .then(json =>
        this.setState({
          tasks: json
        })
      )
  }

  static defaultProps = {
    tasks: [
      { id: 0, content: 'Aaaaaaaaa', done: true },
      { id: 1, content: 'Bbbbbbbbb' }
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
    list.push({ content: draft, done: false })
    this.setState({ tasks: list, draft: '' })
  }

  removeAll = () => {
    this.setState({ tasks: [] })
  }

  render () {
    const { title } = this.props
    const { tasks, draft } = this.state
    return (
      <Container>
        <Header>{title}</Header>
        <DestroyButton onClick={this.removeAll}>Remove all</DestroyButton>
        {tasks.map(task => (
          <ToDoItem
            id={task.id}
            key={task.id}
            text={task.content}
            done={task.done}
          />
        ))}
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
