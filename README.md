# Rebuild of the fullstack-auth
* in the terminal, once inside the directory, type the following; 
```
npx create-react-app auth-frontend
```
same as-
```
npx create-react-app my-app
cd my-app
npm start
```
## Install the backend in command line for later
```
express auth-backend --view=ejs
```

## Back to the front end

* npm run start in front end
* delete svg, webVitals, setupTests, App.test.js, in index.js delete webVitals stuff at bottom and top, simplify app.js to bare-bones leaving css import, in app.css-delete all , 
* reset css
```
https://meyerweb.com/eric/tools/css/reset/

```
```
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```
* this reset may be better?
```
https://stackoverflow.com/questions/11578819/css-reset-what-exactly-does-it-do
```

* In the src folder, add a "_base.css" file, then import the "_base.css" in the "index.js "file.
* In the src folder, create a "components" folder. Inside "components", create a "Signup" folder with "Signup.js" and "Signup.css" inside.  Css, and Jsx code provided by Pak.

* Type 'rce' in the new files (React.createElement).
* Import the Signup.css in Signup.
* Import the Signup component to App.js file, getting rid of "div" inside of the return block, leaving empty carrots.
* Using emmet, we can type less code.  For example, look below;
```
div.form-text{Sign-up}

<div className="Form-text">Sign-up</div>
```
* Checkout emmet shortcuts to learn more!
* Install validator.
```
npm i validator
```
* Bring in methods/functions from validator in the "Signup.js" file buy typing the following code at the top.

```
import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from "validator";

```
## Work on form validation

* Work on building up the form component, and setting state to catch the inputs by the user on the client side. (Pak provided the code)
The names in the state must match the names given to the elements inside of the form so we can set the state dynamically. 

* Make sure to put "event.preventDefault();" inside of handleOnSubmit so the page does not refresh.  

* Now build all the validations, check for everything, to include disabling the submit button...too much logic to write line by line here in the readMe, just refer to the code. 

## Routes

```
npm i react-router-dom
```
* In the components folder, make another folder called Nav. (Nav.js, and Nav.css inside)
* Make a folder called Home.(Home.js inside)
* Make a folder called Login.(Login.js, and Login.css inside)
* Type 'rce' in all new js files, hit enter.
* Bring in react-router-dom in the App.js file.
```
import { BrowserRouter as Router, Route } from 'react-router-dom';
```
* Replace 'App' in the carrots with 'Router' and instantiate the routes for 'sign-up' and 'home'.
```
    <Router>
    <>
    <Route path="/sign-up" component={Signup} />
    <Route path="/" component={Home} />
    </>
    </Router>
```
* Add code to Nav.js, Nav.css and bring in Nav to App.js.
* Add style to show active links in Nav.js

## Backend

* Copy and paste the back-end api project we completed from weeks prior to this projects folder, replacing the empty backend Express app created.  

* make sure the port number in server.js is 8080
## Frontend

* Time to make a call to the back end!

```
npm i axios
```

* Create an axios instance.  In components folder, create a folder named "Utils". In Utils, create a file named "Axios.js" in the Axios.js, bring in axios.  

```
import axios from "axios"

```

* The whole Axios.js file looks like this;

```
import axios from "axios";
const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "DELPOY CLOUD ADDRESS",
  timeout: 50000,
});
export default Axios;
```

* In the signUp.js, make the handleOnSubmit function async with a try and catch block.  

```
  handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      let userInputObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      };
      let success = await Axios.post("/api/user/sign-up", userInputObj);
      console.log(success);
    } catch (e) {
      console.log(e);
    }
  };
```

## Production Error and Development Error

* In production errors, show lee to user on the client side.  In Development, you want as much info as possible

## Handling MongoDB errors
* Starting to understand how to use scripts.
* In the backend, app.js, log the following;
```
console.log(process.env.NODE_ENV)  
``` 
* Because our app does not understand our node environment is undefined, we have to fix it in our package JSON. Go to package JSON and type the following;
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "NODE_ENV=development nodemon server.js",
    "build:prod": "NODE_ENV=production nodemon server.js"
  },

```
* Afterwards, run "npm run start" in the terminal for the backend. "Development will show." Then quit, and type "npm run build:prod".  Prod = Production.  In prod, the post and get requests do not show b/c "Morgan" is not running. 

* We are no longer using nodemon, because it will not understand the environment variable.  For now on, we use "npm run start" in the back end.

* Less gets logged in production, things get compressed and run faster.  Google CI/CD.  -Jenkins, Gitlab, etc. In software engineering, CI/CD or CICD is the combined practices of continuous integration and either continuous delivery or continuous deployment. CI/CD bridges the gaps between development and operation activities and teams by enforcing automation in building, testing and deployment of applications. Wikipedia

* These steps prepare us for deployment from the get-go. 
* In user controller, we can uncomment the following code in createdUser/userController that catches the error;

```
    // console.log(e);
    // console.log(e.message);
    // res.status(500).json({ message: "error", error: e });

```

* When we try to make a new user that already exists, the mongoDB sends an error. We can see the error in the console after the un-commented code above. 

## There's database error, and there's operational error.
### How do we differentiate the two???

### Back End

* In Utils folders, create two files. "ErrorMessageHandlerClass.js" and "errorController.js".  "Class" was included in the name of the first said folder just to be explicit. 

* In "ErrorMessageHandlerClass.js", add the following;

```
class ErrorMessageHandlerClass extends Error {
  constructor(message, statusCode) {
    super(message, statusCode);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}
module.exports = ErrorMessageHandlerClass;
```
* Bring in ErrorMessageHandlerClass in the app.js;

```
const ErrorMessageHandlerClass = require("./routes/utils/ErrorMessageHandlerClass");
```
* Add the following in app.js near bottom;

```
app.all("*", function (req, res, next) {
  next(
    new ErrorMessageHandlerClass(
      `Cannot find ${req.originalUrl} on this server! Check your URL`,
      404
    )
  );
});


```

* We have to handle the Error object. 
* The following code goes in errorController(backend);
```
const ErrorMessageHandlerClass = require("./ErrorMessageHandlerClass");
function dispatchErrorDevelopment(error, req, res) {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(error.statusCode).json({
      status: error.status,
      error: error,
      message: error.message,
      stack: error.stack,
    });
  }
}

function dispatchErrorProduction(error, req, res) {
  if (req.originalUrl.startsWith("/api")) {
    if (error.isOperational) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }
    return res.status(error.statusCode).json({
      status: "Error",
      message:
        "Something went wrong Please contact support 123-999-8888 or email us at xxx@mail.com",
    });
  }
}


//solution 1
function handleMongoDBDuplicate(err) {
  let errorMessageDuplicateKey = Object.keys(err.keyValue)[0];
  let errorMessageDuplicateValue = Object.values(err.keyValue)[0];
  console.log(errorMessageDuplicateKey);
  console.log(errorMessageDuplicateValue);
  //we have parse some data in here
  let message = `${errorMessageDuplicateKey} - ${errorMessageDuplicateValue} is taken please choose another one`;
  return new ErrorMessageHandlerClass(message, 400);
}


// //solution 2
// function handleMongoDBDuplicate(err) {
//   //'E11000 duplicate key error collection: backend-api.users index: email_1 dup key: { email: "hamster@mail.com" }'
//   //' email: "hamster@mail.com" '
//   //' email  hamster@gmail.com '
//   //email hamster@gmail.com
//   //[email, hamster@gmail.com]
//   let errorMessage = err.message;
//   let findOpeningBracket = errorMessage.match(/{/).index;
//   let findClosingBracket = errorMessage.match(/}/).index;
//   let foundDuplicateValueString = errorMessage.slice(
//     findOpeningBracket + 1,
//     findClosingBracket
//   );
//   let newErrorString = foundDuplicateValueString.replace(/:|\"/g, "");
//   let trimmedNewErrorString = newErrorString.trim();
//   let errorStringArray = trimmedNewErrorString.split(" ");
//   let message = `${errorStringArray[0]} - ${errorStringArray[1]} is taken please choose another one`;
//   return new ErrorMessageHandlerClass(message, 400);
// }

module.exports = (err, req, res, next) => {
  // console.log(err);
  // console.log(err.message);
  // console.log("2");
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // console.log("3");
  // console.log(err);
  let error = { ...err };
  // console.log("4");
  error.message = err.message;
  // console.log("5");
  // console.log(error);
  // console.log(error.message);
  // console.log("6");
  console.log(error);
  if (error.code === 11000 || error.code === 11001) {
    error = handleMongoDBDuplicate(error);
  }
  // console.log("7");
  // console.log(error);
  if (process.env.NODE_ENV === "development") {
    dispatchErrorDevelopment(error, req, res);
  } else {
    dispatchErrorProduction(error, req, res);
  }
};


```

* Next, go to app.js(backend)And bring in the errorController. Then type the following at the bottom of app.js;

```
app.use(errorController);

```
* In video lesson "L- Auth-backend-development/production, Error Handling, React Toastify " @ 2:13, Pak walks thru logic of message handling in the backend.  It all starts in userController with async function "signup" with a duplicate email.  
* 
L- Auth-backend-development/production, Error Handling, React Toastify
afternoon class.


































# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
