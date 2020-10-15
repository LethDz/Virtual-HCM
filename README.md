This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tech Stack

- [Axios][axios] (★ 55k) create HTTP Request from browser.
- [Redux][redux] (★ 47k) state management with middleware redux-logger.
- [React Router][router] (★ 35k) for routing and navigation.

## Project Structure

![Diagram](https://imgur.com/12KJGRo)

## Setup

- Step 1: Install npm. Link: https://nodejs.org/en/download/
- Step 2: Install yarn. Two way to install yarn: 
  + Download: https://classic.yarnpkg.com/latest.msi
  + Install via Chocolatey: ```choco install yarn ```

:warning: Caution: Yarn is for every package installation after. You should not install package via npm.

- Step 3: Pull the code 
- Step 4: ```yarn install ```
- Step 5: ```yarn start ```

## Editor and Utility

- [Visual Studio Code][vc] (recommend) + extensions: 
  (I used these extensions)
![Image](https://i.imgur.com/DAKbByt.png)

- Or you can use others IDE, such as: Webstorm, ...

Caution: Create React App is only supported to debug in Visual Studio Code and WebStorm.

## Let's Start

### For new
```
cp .env.example .env
yarn install
yarn start
```
### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Concept and Model

- This skeleton performs specifically these concept:
 - Using Selector to access state:
    [Idiomatic Redux course on EggHead](https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers) Written by Dan Abromov,
  - For Example:
```javascript
const mapStateToProps = state => ({
userContext: getUserContext(state),
isAuthenticated: isAuthenticated(state)
});
  ```
- The idea is every feature of the program is a node-module with `index.js` to public component and method:
  In `index.js`:
```javascript
// modules/userAuthentication/index.js
import LogoutButton from './LogoutButton';
import UserLoginForm from './UserLoginForm';

export * from './userAuthentication.actions';
export * from './userAuthentication.reducer';
export * from './userAuthentication.selectors';

export {
  LogoutButton,
  UserLoginForm,
};
```
- While in others modules can access in the following way:

```javascript
import {
  login, // Actions
  UserAuthenticationState, // State type
  userAuthentication, // Reducer
  isUserAuthenticated, // Selector
  LogoutButton, // Component
  UserLoginForm,
} from 'src/modules/userAuthentication';
```
`Remember to use absolute path (this project is configured to use absolute path in VSCode)`
- This Model is also applied for common folder, such as `layouts`, `common`, `pages`,..etc..

## Code convention

### Using absolute path to access functions, variables, ...etc

**Good**
```javascript
// in pages/user/home/HomePage.tsx
import { LogoutButton } from 'src/modules/userAuthentication';
```

**Bad**
```javascript
// in pages/user/home/HomePage.tsx
import LogoutButton from '../../../modules/userAuthentication/LogoutButton';
import { LogoutButton } from '../../../modules/userAuthentication';
```

### Using `index.ts` to export public interface, ...etc...
Following [Concept and Model](#Concept-and-Model), Recommend to use index.js in order to export

### Folder `pages` is distributed by routes.js
Folder `pages` is distributed by routes and almost do not have logic code in here.
Logic code must be coded in Folder `modules`. 

### Folder `modules` is distributed by feature

Folder modules is distributed by feature and having separately component, action, reducer, action, selector, constant for each feature.

### Using arrow function

```javascript
const example = (instance) => {
  // your code
  return something;
}
```

- If you do not have any code logic in funtion you can write:

```javascript
const example = (instance) => (
  // your return
);
```

## Available Scripts

In the project directory, you can run:

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
