import React, { Component } from 'react'
// import * as toDoApi from '../../api/toDoApi.js'
import toDoApi from '../../api/axiosConfig.js'
import styled from 'styled-components'

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  background: #343744;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 7px;
`

const Content = styled.div`
  padding: 9px;
  width: 100%;
  display: flex;
  align-items: center;
  color: ${props => (props.done ? '#1fd84d' : 'auto')};
  text-decoration: ${props => (props.done ? 'line-through' : 'auto')}
`

const DeleteButton = styled.button`
  background: inherit;
  border: 0px;
  font-size: 1.2em;
  width: 80px;
  height: 32px;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
`

class ToDoItem extends Component {
  static defaultProps = {
    done: false
  }

  state = {
    done: this.props.done
  }

  toggleDone = () => {
    toDoApi
      .put(`${this.props.id}`, { done: !this.state.done })
      .then(response => {
        this.setState({ done: !this.state.done })
      })
      .catch(error => {
        console.log('toggleDone', error)
      })
  }

  delete = () => {
    if (window.confirm('Delete ?') === true) {
      this.props.deleteToDo(this.props.id)
    }
  }

  render () {
    const { text } = this.props
    return (
      <Item>
        <Content done={this.state.done} onClick={this.toggleDone}>{text}</Content>
        <DeleteButton onClick={this.delete}>🗑</DeleteButton>
      </Item>
    )
  }
}

export default ToDoItem
