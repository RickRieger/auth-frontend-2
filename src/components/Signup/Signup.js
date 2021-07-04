import React, { Component } from 'react';
import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from 'validator';
import Axios from '../Utils/Axios';
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
    lastNameError: '',
    usernameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    isButtonDisabled: true,
    firstNameOnFocus: false,
    lastNameOnFocus: false,
    emailOnFocus: false,
    usernameOnFocus: false,
    passwordOnFocus: false,
    onConfirmPasswordOnFocus: false,
  };

  //Below (handleOnChange) is an example showing how setState
  // is an asynchronous function.

  // handleOnChange = (event) => {

  //   this.setState(
  //     {
  //       [event.target.name]: event.target.value,
  //     },

  //     () => {
  //       console.log("Inside setState Callback");
  //       console.log(this.state.firstName);
  //       console.log(event.target.name, ":", event.target.value);
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
      //using the CALLBACK of setState to check which field is being used,
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
        if (event.target.name === 'confirmPassword') {
          // checking to see if passwords match, the statement below
          // says if they don't match.
          if (this.state.password !== this.state.confirmPassword) {
            this.setState({
              confirmPasswordError: 'Password does not match!',
              isButtonDisabled: true,
            });
          } else {
            this.setState({
              confirmPasswordError: '',
            });
          }
        }
      }
    );
  };

  handleConfirmPasswordInput = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: 'Password does not match!',
        isButtonDisabled: true,
      });
    } else {
      this.setState({
        confirmPasswordError: '',
      });
    }
  };

  handlePasswordInput = () => {
    if (this.state.onConfirmPasswordOnFocus) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          confirmPasswordError: 'Password does not match',
          isButtonDisabled: true,
        });
      } else {
        this.setState({
          confirmPasswordError: '',
        });
      }
    }
    if (this.state.password.length === 0) {
      this.setState({
        passwordError: 'Password cannot be empty',
        isButtonDisabled: true,
      });
    } else {
      if (isStrongPassword(this.state.password)) {
        this.setState({
          passwordError: '',
        });
      } else {
        this.setState({
          passwordError:
            'Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimul of 8 charactors long',
          isButtonDisabled: true,
        });
      }
    }
  };

  handleEmailInput = () => {
    if (this.state.email.length === 0) {
      this.setState({
        emailError: 'Email cannot be empty',
        isButtonDisabled: true,
      });
    } else {
      if (isEmail(this.state.email)) {
        this.setState({
          emailError: '',
        });
      } else {
        this.setState({
          emailError: 'Please, enter a valid email!',
          isButtonDisabled: true,
        });
      }
    }
  };

  handleFirstNameAndLastNameInput = (event) => {
    if (this.state[event.target.name].length > 0) {
      if (isAlpha(this.state[event.target.name])) {
        this.setState({
          //bracket notation/dynamic use of code for first and last name reset error
          [`${event.target.name}Error`]: '',
        });
      } else {
        //bracket notation/dynamic use of code set error
        this.setState({
          [`${event.target.name}Error`]: `${event.target.placeholder} can only have alphabet`,
          isButtonDisabled: true,
        });
      }
    } else {
      //bracket notation/dynamic use of code to set other error
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };

  handleUsernameInput = () => {
    if (this.state.username.length === 0) {
      this.setState({
        usernameError: 'Username cannot be empty',
        isButtonDisabled: true,
      });
    } else {
      if (isAlphanumeric(this.state.username)) {
        this.setState({
          usernameError: '',
        });
      } else {
        this.setState({
          usernameError: 'Username can only have alphabet and number',
          isButtonDisabled: true,
        });
      }
    }
  };

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
      let success = await Axios.post('/api/user/sign-up', userInputObj);
      console.log(success);
    } catch (e) {
      console.log(e);
    }
  };

  handleOnBlur = (event) => {
    // console.log(event.target.name);
    // console.log("handle onBlur Triggered");
    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    // The if statement below checks the previous state to prevent an INFINITE LOOP!
    if (prevState.isButtonDisabled === true) {
      if (
        this.state.firstNameOnFocus &&
        this.state.lastNameOnFocus &&
        this.state.emailOnFocus &&
        this.state.usernameOnFocus &&
        this.state.passwordOnFocus &&
        this.state.confirmPasswordOnFocus
      ) {
        if (
          this.state.firstNameError.length === 0 &&
          this.state.lastNameError.length === 0 &&
          this.state.usernameError.length === 0 &&
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0 &&
          this.state.confirmPasswordError.length === 0 &&
          this.state.password === this.state.confirmPassword
        ) {
          this.setState({
            isButtonDisabled: false,
          });
        }
      }
    }
  }

  handleInputOnFocus = (event) => {
    console.log(event.target.name);
    if (!this.state[`${event.target.name}OnFocus`]) {
      console.log('217 i am here');
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
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
                  autoFocus
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
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
                  onFocus={this.handleInputOnFocus}
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
                  onFocus={this.handleInputOnFocus}
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
                  onFocus={this.handleInputOnFocus}
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
                  onFocus={this.handleInputOnFocus}
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
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {confirmPasswordError && confirmPasswordError}
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit" disabled={this.state.isButtonDisabled}>
                Submit
              </button>
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
