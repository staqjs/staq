import _ from 'lodash'

class Auth {
  constructor(firebase) {
    this.firebase = firebase

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.onLogoutCallback = () => {}

    this.initListener()
  }

  initListener() {
    this.listener = this.firebase.onAuthUserListener(
      (currentUser) => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        this.currentUser = currentUser
      },
      () => {
        localStorage.removeItem('currentUser')
        this.currentUser = null
        this.onLogoutCallback()
      }
    )
  }

  onLogout = (newCallbackOnLogout) => {
    this.onLogoutCallback = newCallbackOnLogout
  }

  reload = () => {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  update = (newFields) => {
    this
      .firebase.user(this.currentUser.uid)
      .update(newFields)
      .then(() => {
        const currentUser = _.merge({}, this.currentUser, newFields)
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        this.currentUser = currentUser
      })
  }
}

export default Auth
