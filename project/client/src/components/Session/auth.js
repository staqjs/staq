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
        console.log(this.currentUser)
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
}

export default Auth
