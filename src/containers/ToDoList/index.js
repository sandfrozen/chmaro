import React, { useState, useReducer, useEffect } from 'react'
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

const initialState = {
  todos: {},
  todoIds: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.todo.id]: action.todo
        },
        todoIds: [...state.todoIds, action.todo.id]
      }
    default:
      return state
  }
}

const ToDoList = () => {
  const [draft, setDraft] = useState('')
  const [store, dispatch] = useReducer(reducer, initialState)

  useEffect(async () => {
    const todos = await toDoApi
      .get()
      .then(response => response.data)
      .then(tasks => {
        return tasks
      })
      .catch(error => {
        console.log('getAllToDo', error)
      })
    todos.map(todo =>
      dispatch({
        type: 'ADD_TODO',
        todo: todo
      })
    )
  }, [])

  const addToDo = async () => {
    const todo = await toDoApi
      .post('', { content: draft, priority: 'low' })
      .then(response => response.data)
      .then(task => {
        if (task.id !== null) {
          return task
        }
      })
      .catch(error => {
        console.log('addToDo', error)
      })
    dispatch({
      type: 'ADD_TODO',
      todo: todo
    })
    setDraft('')
  }

  console.log(store)

  return (
    <div>
      <Header>My stuff</Header>
      {store.todoIds.map(id => (
        <ToDoItem
          id={id}
          key={id}
          text={store.todos[id].content}
          done={store.todos[id].done}
          priority={store.todos[id].priority}
        />
      ))}
      <NewToDoForm
        onSubmit={addToDo}
        onChange={event => {
          setDraft(event.target.value)
        }}
        draft={draft}
      />
    </div>
  )
}

// class ToDoList extends Component {
//   static defaultProps = {
//     tasks: [],
//     title: 'My list'
//   }
//   state = {
//     tasks: this.props.tasks,
//     draft: ''
//   }

//   componentDidMount = () => {
//     this.getAllToDo()
//   }

//   updateDraft = event => {
//     this.setState({ draft: event.target.value })
//   }

//   getAllToDo = () => {
//     toDoApi
//       .get()
//       .then(response => response.data)
//       .then(tasks => {
//         this.setState({ tasks })
//       })
//       .catch(error => {
//         console.log('getAllToDo', error)
//       })
//   }

//   addToDo = () => {
//     const { tasks, draft } = this.state
//     const prio = 'low'
//     if (draft === '') return
//     toDoApi
//       .post('', { content: draft, priority: prio })
//       .then(response => response.data)
//       .then(task => {
//         if (task.id !== null) {
//           tasks.push({
//             id: task.id,
//             content: draft,
//             priority: prio,
//             done: false
//           })
//           this.setState({ tasks, draft: '' })
//         }
//       })
//       .catch(error => {
//         console.log('addToDo', error)
//       })
//   }

//   deleteAll = () => {
//     toDoApi
//       .delete('deleteall')
//       .then(response => {
//         this.setState({ tasks: [] })
//       })
//       .catch(error => {
//         console.log('deleteAll', error)
//       })
//   }

//   deleteToDo = id => {
//     let { tasks } = this.state
//     toDoApi
//       .delete(`${id}`)
//       .then(response => {
//         const index = R.findIndex(R.propEq('id', id))(tasks)
//         tasks = R.remove(index, 1, tasks)
//         this.setState({ tasks })
//       })
//       .catch(error => {
//         console.log('deleteAll', error)
//       })
//   }

//   render () {
//     const { title } = this.props
//     const { tasks, draft } = this.state

//     return (
//       <div>
//         <Header>{title}</Header>
//         <DeleteAllButton onClick={this.deleteAll}>Delete all</DeleteAllButton>
//         {tasks.map(task => (
//           <ToDoItem
//             id={task.id}
//             key={task.id}
//             text={task.content}
//             done={task.done}
//             priority={task.priority}
//             deleteToDo={this.deleteToDo}
//           />
//         ))}
//         <NewToDoForm
//           onSubmit={this.addToDo}
//           onChange={this.updateDraft}
//           draft={draft}
//         />
//       </div>
//     )
//   }
// }

export default ToDoList
