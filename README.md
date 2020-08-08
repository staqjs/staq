# staq

Staq is a Javascript library for creating Software-as-a-Service (SaaS) businesses.


[Live Demo](https://staq-live-demo.web.app/)


The `staq` package contains a set of [React](https://reactjs.org/) components that implement standard SaaS features including:

- User accounts
- Landing page
- Pricing page
- Subscription management (via Stripe [Customer Portal](https://stripe.com/docs/billing/subscriptions/customer-portal))

The package also ships with a set of NodeJS functions to be used with Google [Firebase](https://firebase.google.com/) to implement the backend logic necessary for features like subscription billing with [Stripe](https://stripe.com/).

# Quickstart

Staq comes in two parts, a client side and a server side library. This guide
will show you how to create a basic SaaS app from scratch using Staq for both
sides.

**Note:** If you don't have a Stripe account or don't want to enable payments,
you can skip the `payments` configuration in `index.js` and the entire
**Server** section.

## Client

1. First let's create a React project with `create-react-app`.

    ```sh
    npx create-react-app staq-quickstart && cd staq-quickstart
    ```
    
2. Then let's install dependencies. We need the Staq client side library,
   Firebase, and React Router.
   
   ```sh
   yarn add @staqjs/client firebase react-router-dom
   ```
   
3. To install Staq into our app, we need to add some code to two files. The
   first is `index.js`, where we configure the library and wrap our app in a
   Staq function call. This is what the updated `index.js` should look like.
   
   ```jsx
   // src/index.js

   import React from 'react';
   import ReactDOM from 'react-dom';
   import './index.css';
   import App from './App';
   import * as serviceWorker from './serviceWorker';
   import { initStaq, withStaq } from '@staqjs/client'

   initStaq({
     siteTitle: 'Staq Live Demo',
     landingPageHeader: 'SaaS apps are great',
     landingPageSubheader: 'You should totally subscribe',
     firebaseConfig: {
       // your firebase config
     },
     payments: true // skip if not using Stripe yet
   })

   ReactDOM.render(
     withStaq(
       <React.StrictMode>
         <App />
       </React.StrictMode>
     ),
     document.getElementById('root')
   );

   // If you want your app to work offline and load faster, you can change
   // unregister() to register() below. Note this comes with some pitfalls.
   // Learn more about service workers: https://bit.ly/CRA-PWA
   serviceWorker.unregister();
   ```
   \
   The other file we need to update is `App.js`. This is where we use Staq to
   render basic routes like landing page, sign in page, sign out page, etc.
   
   Remove the markup in that file, and replace it with a `Router` and a Staq
   component. Here's what the updated file should look like.

   ```jsx
   import React from 'react';
   import logo from './logo.svg';
   import './App.css';
   import { Router } from 'react-router-dom'
   import { StaqRoutes } from '@staqjs/client'
   
   function App() {
     return (
       <Router>
         <StaqRoutes />
       </Router>
     );
   }
   
   export default App;

   ```

4. That's it! On the client side anyway. Start up your app with `yarn start` and
   check out the pages at `/signup`, `/signin`.


## Server

1. If you don't have the Firebase CLI yet, follow [this
   guide](https://firebase.google.com/docs/cli) and install it.
   
2. Initialize Firebase in the `staq-quickstart` project.

    ```sh
    firebase init
    ```

3. Install the Staq server side library.

    ```sh
    yarn add @staqjs/server
    ```

4. Add Staq server code to `functions/index.js` to support everything needed for
   subscription payments with Stripe. Replace what's in the file with the
   following.
   
   ```js
   const { initStaq, createStripeCustomerPortalSession, stripeCustomer } = require('@staqjs/server')

   initStaq({
     gcpProjectNumber: // your Google Cloud project number
     stripeTrialPriceId: // the ID of the default Stripe Price users will be subscribed to
     useTrial: false, // whether or not user should be started on a trial
   })

   exports.stripeCustomer = stripeCustomer
   exports.createStripeCustomerPortalSession = createStripeCustomerPortalSession
   ```
   
5. Deploy your Firebase functions.

    ```sh
    firebase deploy --only functions
    ```

6. That's it! With this server configuration, a Stripe Customer and Subscription
   will be created for each user on signup, and users will be able to manage
   their billing with the [Stripe Customer
   portal](https://stripe.com/docs/billing/subscriptions/customer-portal).
   

    
    
# Contributor Guide

Here's how to set `staq` up locally to hack on it.

1. Clone the repo.

    ```
    $ git clone git@github.com/staqjs/staq
    ```
    
2. Create a fresh React project. Let's call it `staq-dev`.

    ```
    $ npx create-react-app staq-dev
    ```
    
3. Create a fresh Firebase project. [Here](https://github.com/staqjs/staq#create-a-firebase-project) are some more details.

4. Register your clone of `staq` with `npm link`

    ```
    $ cd /path/to/staq/clone/project/client
    $ npm link
    ```
    
5. Link your clone of `staq` to the new React project

    ```
    $ cd /path/to/staq-dev
    $ npm link staq
    ```
    
6. Link the new project's React to your clone of `staq`. (Assuming your clone of `staq` and `staq-dev` are siblings in the file tree.)

   ```
   $ cd /path/to/staq/clone/project/client
   $ npm link ../../../staq-dev/node_modules/react
   ```
   
7. Follow the [Quickstart](https://github.com/staqjs/staq#quickstart) steps to install `staq` to the new `staq-dev` project.

8. In one terminal, start a file watcher in your `staq` clone that will recompile with any changes.

    ```
    $ cd /path/to/staq/clone/project/client
    $ yarn start
    ```
    
9. In another terminal, start up `staq-dev`.

    ```
    $ cd /path/to/staq-dev
    $ yarn start
    ```
    
## Create a Firebase Project

1. Head over to the [Firebase Console](https://console.firebase.google.com/).

2. Click **Add Project**

3. Follow the steps to create the project.

4. On the left side bar of the project dashboard, click **Authentication**.

5. On the **Authentication** page, go to the **Sign-in Method** tab and enable **Email/Password** sign-in.

6. On the left side bar, click **Database**. Create a Firestore database.

7. All done!
   


## License

MIT © [mroll](https://github.com/mroll)
