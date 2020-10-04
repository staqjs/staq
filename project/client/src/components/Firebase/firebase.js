import app from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

class Firebase {
  constructor(config) {
    app.initializeApp(config)

    this.auth = app.auth()
    this.db = app.firestore()
    this.analytics = app.analytics()
    this.functions = app.functions()

    if (window.location.host.includes('localhost')) {
      this.functions.useFunctionsEmulator('http://localhost:5001')
    }
  }

  logEvent = (eventName, eventParams) => {
    this.analytics.logEvent(eventName, eventParams)
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password)

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: 'https://checkfox.app'
    })

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        this.user(currentUser.uid)
          .get()
          .then((snapshot) => {
            const dbUser = snapshot.data()

            // merge auth and db user
            const user = {
              uid: currentUser.uid,
              email: currentUser.email,
              emailVerified: currentUser.emailVerified,
              providerData: currentUser.providerData,
              ...dbUser
            }

            next(user)
          })
      } else {
        fallback()
      }
    })

  // *** User API ***

  user = (uid) => this.db.collection('users').doc(uid)

  users = () => this.db.collection('users')

  collection = (collectionName) => this.db.collection(collectionName)

  collectionForUser = (collectionName, uid) =>
    this.collection(collectionName).where('uid', '==', uid)

  document = (collectionName, documentId) =>
    this.collection(collectionName).doc(documentId)

  addDocumentForUser = (uid, collectionName, document) =>
    this.db.collection(collectionName).add({
      uid,
      ...document
    })

  updateDocument = (collectionName, documentId, updateFields) => {
    return this.db
      .collection(collectionName)
      .doc(documentId)
      .update(updateFields)
  }
}

export default Firebase
