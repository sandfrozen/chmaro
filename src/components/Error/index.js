import React, { Component } from 'react'
import styled from 'styled-components'

const Message = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${props => (props.type === 'ok' ? 'rgb(86, 128, 68)' : 'rgba(255, 169, 5, 0.56)') || 'rgba(255, 169, 5, 0.56)'};
  border-radius: 10px;
  color: black;
  padding: 4px;
  border: 2px solid dark;
  margin-bottom: 7px;
`

class ErrorComponent extends Component {
  state = {
    id: this.props.id,
    counter: 2
  }

  // componentDidMount () {
  //   const intervalId = setInterval(this.countdown, 1000)
  //   this.setState({ intervalId })
  // }

  // countdown = () => {
  //   this.setState({ counter: this.state.counter - 1 })
  // }

  // componentWillMount () {
  //   clearInterval(this.state.intervalId)
  // }

  hideMe = () => {
    this.props.hide(this.state.id)
  }

  render () {
    const { message, type } = this.props
    const { counter } = this.state
      return (
        <Message onClick={this.hideMe} type={type}>
          {message}
        </Message>
      )
  }
}

export default ErrorComponent
