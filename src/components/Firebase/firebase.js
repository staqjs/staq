import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


class Firebase {
  constructor(config) {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: 'https://checkfox.app'
    });

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.user(currentUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            // merge auth and db user
            currentUser = {
              uid: currentUser.uid,
              email: currentUser.email,
              emailVerified: currentUser.emailVerified,
              providerData: currentUser.providerData,
              ...dbUser,
            };

            next(currentUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.collection('users').doc(uid);

  users = () => this.db.collection('users');

  collection = (collectionName) => this.db.collection(collectionName)

  document = (collectionName, documentId) =>
    this.collection(collectionName).doc(documentId)

  collectionForUser = (collectionName, uid) =>
    this.collection(collectionName).where('uid', '==', uid)

  addDocument = (uid, collectionName, document) => this.db.collection(collectionName).add({
    uid,
    ...document
  })

  updateDocument = (uid, collectionName, documentId, updateFields) =>
    this.db.collection(collectionName)
        .doc(documentId)
        .update(updateFields)
}

export default Firebase;
