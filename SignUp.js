import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {FormErrors} from './FormErrors' // Error function
import { Redirect } from 'react-router-dom'

import './SignUp.scss';

class SignUp extends Component {
/////////
constructor (props) {       // Declearing constructors 
    super(props);
    this.state = {
        userName: '',
      email: '',
      password: '',
      referralCode: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      redirect: false   

    }
  }

  handleUserInput = (e) => {        // binding email/ password eith its value 
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) }); // validation function
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/signIn' />
    }
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i); //RE for email validation
        fieldValidationErrors.email = emailValid ? '' : ' is invalid'; //error 
        break;
      case 'password':
        passwordValid = value.length >= 6;      //setting password min length to 6
        fieldValidationErrors.password = passwordValid ? '': ' is too short'; //error
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
    
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid}); // setting state of formvalidation
   
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }
////////
  render(){
    return <div className="signin-container">
                <div >
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" id="userName" placeholder="Uername"></input>
                        </div>
                        <div className="form-group">
                        <input type="password" className="form-control" name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleUserInput}  />                      
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                        <input type="email" required className="form-control" name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleUserInput}  />
                        </div>
                        <div className="form-group">
                            <input type="text" class="form-control" id="referralCode" placeholder="Referral code"></input>
                        </div>
                        <div >
                        {this.renderRedirect()}
                            <button type="submit" name="signIn" class=" btn btn-info signup-btn" disabled={!this.state.formValid} onClick={this.setRedirect}>Sign Up</button>  
                        </div>
                    </form>
                </div>
                <div class="signup-options-container">
                    <NavLink to="/signIn" className="signup-link" >Sign In</NavLink>
                    <NavLink to="/forgotpassword" className="forgot-password-link">Forgot</NavLink>

                </div>
            </div>
  }
}

export default SignUp;
