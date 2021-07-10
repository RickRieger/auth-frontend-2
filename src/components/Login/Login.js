import React, { Component } from "react";
import { isEmpty, isEmail } from "validator";
import { toast } from "react-toastify";
import Axios from "../Utils/Axios";
import "./Login.css";
export class Login extends Component {
  state = {
    email: "",
    emailError: "",
    emailOnFocus: false,
    password: "",
    passwordError: "",
    passwordOnFocus: false,
    submitButtonDisabled: true,
  };
  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (event.target.name === "email") {
          if (isEmpty(this.state.email)) {
            this.setState({
              emailError: "Email cannot be empty",
              submitButtonDisabled: true,
            });
          } else {
            if (isEmail(this.state.email)) {
              this.setState({
                emailError: "",
                submitButtonDisabled: false
              });
            } else {
              this.setState({
                emailError: "Please enter a valid email",
                submitButtonDisabled: true,
              });
            }
          }
        }
        if (event.target.name === "password") {
          if (isEmpty(this.state.password)) {
            this.setState({
              passwordError: "Password cannot be empty",
              submitButtonDisabled: true,
            });
          } else {
            this.setState({
              passwordError: "",
              submitButtonDisabled: false
            });
          }
        }
      }
    );
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.submitButtonDisabled === true) {
      if (this.state.emailOnFocus && this.state.passwordOnFocus && isEmail(this.state.email)) {
        if (
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0
        ) {
          this.setState({
            submitButtonDisabled: false,
          });
        } else {
          this.setState({
            submitButtonDisabled: true,
          });
        }
        
      }
    }
  }
  handleInputOnFocus = (event) => {
    if (this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };
  handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      let result = await Axios.post("/api/user/login", {
        email: this.state.email,
        password: this.state.password,
      });
      console.log(result);
      toast.success("Login success!");
    } catch (e) {
      //console.log(e.response.data.payload);
      toast.error(e.response.data.payload);
    }
  };
  render() {
    const { email, emailError, password, passwordError, submitButtonDisabled } =
      this.state;
    return (
      <div className="container">
        <div className="form-text">Sign up</div>
        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleOnChange}
                  onFocus={this.handleInputOnFocus}
                  autoFocus
                />
                <div className="errorMessage">{emailError && emailError}</div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onFocus={this.handleInputOnFocus}
                  onChange={this.handleOnChange}
                />
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit" disabled={submitButtonDisabled}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;