import React from 'react'
import _ from 'lodash'

import { withFirebase } from '../Firebase'

const AuthContext = React.createContext(null)

export const withAuth = (Component) => (props) => (
  <AuthContext.Consumer>
    {(auth) => <Component {...props} auth={auth} />}
  </AuthContext.Consumer>
)

class AuthProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: JSON.parse(localStorage.getItem('currentUser')),
      onLogoutCallback: () => {
        console.log('logging out')
      }
    }
  }

  componentDidMount() {
    this.listener = this.props.firebase.onAuthUserListener(
      (currentUser) => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        this.setState({ currentUser })
      },
      () => {
        localStorage.removeItem('currentUser')
        this.setState({ currentUser: null })
        this.state.onLogoutCallback()
      }
    )
  }

  componentWillUnmount() {
    this.listener()
  }

  reload = () => {
    this.setState({
      currentUser: JSON.parse(localStorage.getItem('currentUser'))
    })
  }

  update = (newFields) => {
    const { firebase } = this.props

    firebase
      .user(this.state.currentUser.uid)
      .update(newFields)
      .then(() => {
        const currentUser = {
          ...this.state.currentUser,
          ...newFields
        }
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        this.setState({ currentUser })
      })
  }

  onLogout = (newCallbackOnLogout) => {
    this.setState({
      onLogoutCallback: newCallbackOnLogout
    })
  }

  render() {
    const { children } = this.props
    const { currentUser } = this.state

    return (
      <AuthContext.Provider
        value={{
          currentUser,
          reload: this.reload,
          onLogout: this.onLogout,
          update: this.update,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }
}

export default withFirebase(AuthProvider)
