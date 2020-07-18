import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyD4AruMj-wSu7P97KjHptyS6IsZYWuuuwA',
  authDomain: 'checklist-3b164.firebaseapp.com',
  databaseURL: 'https://checklist-3b164.firebaseio.com',
  projectId: 'checklist-3b164',
  storageBucket: 'checklist-3b164.appspot.com',
  messagingSenderId: '854528730477',
  appId: '1:854528730477:web:7fbe6aece7fa32b105e664',
  measurementId: 'G-81Q0NDVDKF',
}
class Firebase {
  constructor() {
    app.initializeApp(config)

    this.auth = app.auth()
    this.db = app.firestore()
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () => this.auth.currentUser.sendEmailVerification({
    url: 'https://checkfox.app',
  });

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) => this.auth.onAuthStateChanged((currentUser) => {
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
            ...dbUser,
          }

          next(user)
        })
    } else {
      fallback()
    }
  });

  // *** User API ***

  user = (uid) => this.db.collection('users').doc(uid);

  users = () => this.db.collection('users');

  collection = (collectionName) => this.db.collection(collectionName)

  collectionForUser = (collectionName, uid) => this.collection(collectionName).where('uid', '==', uid)

  document = (collectionName, documentId) => this.collection(collectionName).doc(documentId)

  addDocument = (uid, collectionName, document) => this.db.collection(collectionName).add({
    uid,
    ...document,
  })

  updateDocument = (uid, collectionName, documentId, updateFields) => {
    return this.db
      .collection(collectionName)
      .doc(documentId)
      .update(updateFields)
  }
}

export default Firebase
