import React from 'react'
import AuthUserContext from './context'
import { withFirebase } from '../Firebase'

console.log(withFirebase)

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
        onLogoutCallback: () => { console.log('logging out') }
      }
    }

    reload = () => {
      this.setState({
        currentUser: JSON.parse(localStorage.getItem('currentUser'))
      })
    }

    onLogout = (newCallbackOnLogout) => {
      this.setState({
        onLogoutCallback: newCallbackOnLogout
      })
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        currentUser => {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.setState({ currentUser });
        },
        () => {
          localStorage.removeItem('currentUser');
          this.setState({ currentUser: null });
          this.state.onLogoutCallback()
        },
      );
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      return (
        <AuthUserContext.Provider value={{
                                    currentUser: this.state.currentUser,
                                    reload: this.reload,
                                    onLogout: this.onLogout
                                  }}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(WithAuthentication)
}

export default withAuthentication
