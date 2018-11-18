import React, { Component } from 'react'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'

class Navbar extends Component {
  render () {
    return (
      <CurrentUserConsumer>
        {({ user, logout }) => (
          <div>
            {user
              ? <div>Hello, {user.name} <button onClick={logout}>logout</button></div>
              : <div>Please login</div>}
          </div>
        )}
      </CurrentUserConsumer>
    )
  }
}

export default Navbar
