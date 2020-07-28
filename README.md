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

1. **Install**

    ```sh
    yarn add staq
    ```

2. **Initialize and configure**

    In your `index.js`, add the following import:

    ```js
    import { initStaq, withStaq } from staq
    ```

    Call `initStaq` and pass in a configuration object specifying the name of your site and your Firebase config object.

    ```js
    initStaq({
      siteTitle: 'Test App',
      landingPageHeader: 'SaaS apps are great',
      landingPageSubheader: 'You should totally subscribe',
      firebaseConfig: {
        // your firebase config
      }
    })
    ```

3. **Also in `index.js`, wrap your app in `withStaq`**
<br><br>
Take the first argument to `ReactDOM.render` and pass it to the `withStaq` function.

    ```jsx
    ReactDOM.render(
      withStaq(<App />),
      document.getElementById('root')
    )
    ```

4. **Use `staq` to install standard SaaS features**
<br><br>
In your `App.js[x]`, import `StaqRoutes` and render them inside your router.

    ```jsx
    import React from 'react'
    import { BrowserRouter as Router } from 'react-router-dom'
    
    import { StaqRoutes } from 'staq'
    
    function App(props) {
      return (
        <Router>
          <StaqRoutes />
        </Router>
      )
    }
    
    export default App
    ```

5. **Test out the routes**

    Run `yarn start` and head to `http://localhost:3000` to see your landing page generated courtesy of `staq`. You should see something like this.
    
    ![landing](project/landing-page.png)
    
    
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
    $ cd /path/to/staq/clone
    $ npm link
    ```
    
5. Link your clone of `staq` to the new React project

    ```
    $ cd /path/to/staq-dev
    $ npm link staq
    ```
    
6. Link the new project's React to your clone of `staq`. (Assuming your clone of `staq` and `staq-dev` are siblings in the file tree.)

   ```
   $ cd /path/to/staq/clone
   $ npm link ../staq-dev/node_modules/react
   ```
   
7. Follow the [Quickstart](https://github.com/staqjs/staq#quickstart) steps to install `staq` to the new `staq-dev` project.

8. In one terminal, start a file watcher in your `staq` clone that will recompile with any changes.

    ```
    $ cd /path/to/staq/clone
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
