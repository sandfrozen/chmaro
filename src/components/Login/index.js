import React, { Component } from 'react'
import { SubmitButton } from '../ToDoEditForm/theme'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    processing: false,
    currentUser: null,
    finished: false
  }

  fbLogin = () => {
    this.setState({ processing: true })
    window.FB.getLoginStatus(response => {
      console.log(response)
      if (response.status !== 'connected') {
        window.FB.login()
      } else {
        window.FB.api('/me', user => {
          sessionStorage.setItem('currentUser', user)
          console.log(user)
          this.setState({
            finished: true,
            processing: false,
            currentUser: user
          })
        })
      }
    })
  }

  render () {
    const { finished, currentUser, processing } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (finished === true) {
      return <Redirect to={from} />
    }
    return (
      <div>
        {currentUser
          ? <div>Hello, {currentUser.name}!</div>
          : <p>You must login to view page {from.pathname}</p>}
        {processing
          ? <div>Authenticating...</div>
          : <SubmitButton onClick={this.fbLogin}>
              Facebook login
            </SubmitButton>}
      </div>
    )
  }
}

export default Login
