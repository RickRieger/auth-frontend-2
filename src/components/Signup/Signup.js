import React, { Component } from 'react';
import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from 'validator';
import './Signup.css';
//Standard react component using class
export class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstNameError: '',
  };

  // //Below (handleOnChange) is an example showing how setState
  // is an asynchronous function.

  // handleOnChange = (event) => {
  //   this.setState(
  //     {
  //       [event.target.name]: event.target.value,
  //     },

  //     () => {
  //       console.log("Inside setState Callback");
  //       console.log(this.state.firstName);
  //       // console.log(event.target.name, ":", event.target.value);
  //     }

  //   );
  //   //The code below runs first since setState is asynchronous
  //   console.log("the value of this.state.firstName: ", this.state.firstName);

  //   if (this.state.firstName.length === 0) {
  //     console.log("LOL cannot be empty");
  //   }
  // };

  handleOnChange = (event) => {
    //This is a dynamic way of capturing the onChange event
    //So we can set the state dynamically for each input.
    //In order to do this, give each input a "name" that matches
    //it's respective key in state.
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      //using the callback of setState to check which field is being used,
      //then calling respective function to validate that input.
      () => {
        if (
          event.target.name === 'firstName' ||
          event.target.name === 'lastName'
        ) {
          this.handleFirstNameAndLastNameInput(event);
        }
        if (event.target.name === 'email') {
          this.handleEmailInput();
        }
        if (event.target.name === 'username') {
          this.handleUsernameInput();
        }
        if (event.target.name === 'password') {
          this.handlePasswordInput();
        }
      }
    );
  };
  handlePasswordInput = () => {
    if (this.state.password.length === 0) {
      this.setState({
        passwordError: 'Password cannot be empty',
      });
    } else {
      //comes from validator
      if (isStrongPassword(this.state.password)) {
        this.setState({
          //resets the error
          passwordError: '',
        });
      } else {
        this.setState({
          //if password is weak, then inform user...same thing essentially for the other functions
          passwordError:
            'Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimum of 8 characters long',
        });
      }
    }
  };
  handleEmailInput = () => {
    if (this.state.email.length === 0) {
      this.setState({
        emailError: 'Email cannot be empty',
      });
    } else {
      if (isEmail(this.state.email)) {
        this.setState({
          emailError: '',
        });
      } else {
        this.setState({
          emailError: 'Please, enter a valid email!',
        });
      }
    }
  };
  handleFirstNameAndLastNameInput = (event) => {
    if (this.state[event.target.name].length > 0) {
      if (isAlpha(this.state[event.target.name])) {
        this.setState({
          [`${event.target.name}Error`]: '',
        });
      } else {
        this.setState({
          [`${event.target.name}Error`]: `${event.target.placeholder} can only have alphabet`,
        });
      }
    } else {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };
  handleUsernameInput = () => {
    if (this.state.username.length === 0) {
      this.setState({
        usernameError: 'Username cannot be empty',
      });
    } else {
      if (isAlphanumeric(this.state.username)) {
        this.setState({
          usernameError: '',
        });
      } else {
        this.setState({
          usernameError: 'Username can only have alphabet and number',
        });
      }
    }
  };
  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  //"handleOnBlur" function occurs when user leaves an input box,
  //this is the opposite of "onFocus"
  handleOnBlur = (event) => {
    console.log(event.target.name);
    console.log('Handle onBlur Triggered');
    //This dynamically sets the state of all error messages
    if (this.state[event.target.name].length === 0) {
      this.setState({
        //More bracket notation!!!
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
    // if (this.state.firstName.length === 0) {
    //   this.setState({
    //     firstNameError: 'First name cannot be empty',
    //   });
    // }
    // if (this.state.lastName.length === 0) {
    //   this.setState({
    //     lastNameError: 'Last name cannot be empty',
    //   });
    // }
    // if (this.state.email.length === 0) {
    //   this.setState({
    //     emailError: 'Email cannot be empty',
    //   });
    // }
    // if (this.state.username.length === 0) {
    //   this.setState({
    //     usernameError: 'username cannot be empty',
    //   });
    // }
    // if (this.state.password.length === 0) {
    //   this.setState({
    //     passwordError: 'password cannot be empty',
    //   });
    // }
    // if (this.state.confirmPassword.length === 0) {
    //   this.setState({
    //     confirmPasswordError: 'confirmPassword cannot be empty',
    //   });
    // }
  };

  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
    } = this.state;
    return (
      <div className="container">
        <div className="form-text">Sign up</div>
        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="form-group-inline">
              <div className="inline-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  placeholder="First Name"
                  name="firstName"
                  onChange={this.handleOnChange}
                  //autoFocus puts the curser in
                  //input field when page renders
                  autoFocus
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {/* Below is shorthand for - ("if this is true, display this") */}
                  {firstNameError && firstNameError}
                </div>
              </div>
              <div className="inline-container">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  name="lastName"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {lastNameError && lastNameError}
                </div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleOnChange}
                  name="email"
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">{emailError && emailError}</div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Username"
                  onChange={this.handleOnChange}
                  name="username"
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {usernameError && usernameError}
                </div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleOnChange}
                  name="password"
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="text"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={this.handleOnChange}
                  name="confirmPassword"
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {confirmPasswordError && confirmPasswordError}
                </div>
              </div>
            </div>
            <div className="button-container">
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Signup;

//Below is the previous code, before "handleOnChange" was introduced above making things more dynamic.

// import React, { Component } from "react";
// import "./Signup.css";
// export class Signup extends Component {
//   state = {
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   };
//   handleFirstNameOnChange = (event) => {
//     this.setState({
//       firstName: event.target.value,
//     });
//   };
//   handleLastNameOnChange = (event) => {
//     this.setState({
//       lastName: event.target.value,
//     });
//   };
//   handleEmailOnChange = (event) => {
//     this.setState({
//       email: event.target.value,
//     });
//   };
//   handleUsernameOnChange = (event) => {
//     this.setState({
//       username: event.target.value,
//     });
//   };
//   handlePasswordOnChange = (event) => {
//     this.setState({
//       password: event.target.value,
//     });
//   };
//   handleConfirmPasswordOnChange = (event) => {
//     this.setState({
//       confirmPassword: event.target.value,
//     });
//   };
//   handleOnSubmit = (event) => {
//     event.preventDefault();
//     console.log(this.state);
//   };
//   render() {
//     const { firstName, lastName, username, email, password, confirmPassword } =
//       this.state;
//     return (
//       <div className="container">
//         <div className="form-text">Sign up</div>
//         <div className="form-div">
//           <form className="form" onSubmit={this.handleOnSubmit}>
//             <div className="form-group-inline">
//               <div className="inline-container">
//                 <label htmlFor="firstName">First Name</label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   value={firstName}
//                   placeholder="First Name"
//                   onChange={this.handleFirstNameOnChange}
//                 />
//               </div>
//               <div className="inline-container">
//                 <label htmlFor="lastName">Last Name</label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   value={lastName}
//                   placeholder="Last Name"
//                   onChange={this.handleLastNameOnChange}
//                 />
//               </div>
//             </div>
//             <div className="form-group-block">
//               <div className="block-container">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="text"
//                   id="email"
//                   value={email}
//                   placeholder="Email"
//                   onChange={this.handleEmailOnChange}
//                 />
//               </div>
//             </div>
//             <div className="form-group-block">
//               <div className="block-container">
//                 <label htmlFor="username">Username</label>
//                 <input
//                   type="text"
//                   id="username"
//                   value={username}
//                   placeholder="Username"
//                   onChange={this.handleUsernameOnChange}
//                 />
//               </div>
//             </div>
//             <div className="form-group-block">
//               <div className="block-container">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="text"
//                   id="password"
//                   value={password}
//                   placeholder="Password"
//                   onChange={this.handlePasswordOnChange}
//                 />
//               </div>
//             </div>
//             <div className="form-group-block">
//               <div className="block-container">
//                 <label htmlFor="confirmPassword">Confirm Password</label>
//                 <input
//                   type="text"
//                   id="confirmPassword"
//                   value={confirmPassword}
//                   placeholder="Confirn Password"
//                   onChange={this.handleConfirmPasswordOnChange}
//                 />
//               </div>
//             </div>
//             <div className="button-container">
//               <button>Submit</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }
// export default Signup;
