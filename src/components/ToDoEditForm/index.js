import React, { Component } from 'react'
import toDoApi from '../../api/axiosConfig.js'
import { Formik } from 'formik'
import { SubmitButton, TextInput, Label, Select, ErrorMsg } from './theme.js'
import { withRouter } from 'react-router-dom'
import * as _ from 'ramda'

class ToDoEditForm extends Component {
  state = {
    toDoItem: null,
    fetched: false,
    disabled: false
  }

  componentDidMount () {
    this.getToDo()
  }

  itemId = () => this.props.match.params.itemId

  getToDo = () => {
    toDoApi
      .get(this.itemId())
      .then(response => response.data)
      .then(toDoItem => {
        this.setState({ toDoItem, fetched: true })
      })
      .catch(error => {
        console.log('getToDo', error)
      })
  }

  updateToDo = values => {
    const { id, content, done } = values
    toDoApi
      .put(`${id}`, { content, done })
      .then(response => {
        this.props.history.push('/')
      })
      .catch(error => {
        console.log('toggleDone', error)
      })
  }
  render () {
    return (
      <div>
        Edit form for {this.itemId()}
        {this.state.fetched
          ? <Formik
            initialValues={{ ...this.state.toDoItem }}
            onSubmit={async values => {
              await this.updateToDo(values)
            }}
            validate={values => {
              let errors = {}
              if (!values.content) {
                errors.content = 'Required'
              } else if (values.content.length < 3) {
                errors.content = 'Too short. Minimum 3 charcters.'
              } else if (values.content.includes('ass')) {
                errors.content = 'Mind your mind.'
              }
              if (_.isEmpty(errors)) {
                this.setState({ disabled: false })
              } else {
                this.setState({ disabled: true })
              }
              return errors
            }}
            render={({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                  <Label>
                    Content *
                    <ErrorMsg>{errors.content}</ErrorMsg>
                    <TextInput
                      name='content'
                      onChange={handleChange}
                      value={values.content}
                      autoComplete='off'
                    />
                  </Label>

                  <Label>
                    <Select
                      name='priority'
                      onChange={handleChange}
                      value={values.priority}
                    >
                      <option value='low'>Low</option>
                      <option value='high'>High</option>
                      <option value='urgent'>Urgent</option>
                    </Select>
                  </Label>

                  <Label>
                    Done?
                    <input
                      type='checkbox'
                      name='done'
                      value={values.done}
                      checked={values.done}
                      onChange={handleChange}
                    />
                  </Label>

                  <br />
                  <SubmitButton type='submit' disabled={this.state.disabled}>
                    Update
                  </SubmitButton>
                </form>
              )}
            />
          : <div>Loading...</div>}
      </div>
    )
  }
}

export default withRouter(ToDoEditForm)
