import React from 'react'
import AuthUserContext from './context'
import { withFirebase } from '../Firebase'

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
        onLogoutCallback: () => { },
      }
    }

    componentDidMount() {
      const { firebase } = this.props
      const { onLogoutCallback } = this.state

      this.listener = firebase.onAuthUserListener(
        (currentUser) => {
          localStorage.setItem('currentUser', JSON.stringify(currentUser))
          this.setState({ currentUser })
        },
        () => {
          localStorage.removeItem('currentUser')
          this.setState({ currentUser: null })
          onLogoutCallback()
        },
      )
    }

    componentWillUnmount() {
      this.listener()
    }

    onLogout = (newCallbackOnLogout) => {
      this.setState({
        onLogoutCallback: newCallbackOnLogout,
      })
    }

    reload = () => {
      this.setState({
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
      })
    }

    render() {
      const { currentUser } = this.state

      return (
        <AuthUserContext.Provider value={{
          currentUser,
          reload: this.reload,
          onLogout: this.onLogout,
        }}
        >
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(WithAuthentication)
}

export default withAuthentication
