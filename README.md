# staq

Staq is a Javascript library for creating Software-as-a-Service (SaaS) businesses.

The `staq` package contains a set of React components that implement standard SaaS features including:

- User accounts
- Landing page
- Pricing page
- Subscription management (via Stripe [Customer Portal](https://stripe.com/docs/billing/subscriptions/customer-portal))

The package also ships with a set of NodeJS functions to be used with Google [Firebase](https://firebase.google.com/) to implement the backend logic necessary for features like subscription billing with Stripe.

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


## License

MIT © [mroll](https://github.com/mroll)
