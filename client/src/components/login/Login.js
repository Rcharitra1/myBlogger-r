import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/autherizeActions';
import TextFieldGroup from '../shared/TextFieldGroup';

import {Link} from 'react-router-dom';
class Login extends Component {
   constructor(){
     super()
     this.state={
       email:'',
       password:'',
       errors:{}

     };
     this.onChange=this.onChange.bind(this);
     this.onSubmit=this.onSubmit.bind(this);

   }
   componentDidMount(){
     if(this.props.auth.isAuthenticated){
       console.log(this.props);
       this.props.history.push('/blogger');
     }
   }
   componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/blogger');
    }
    if(nextProps.errors){
      this.setState({errors:nextProps.errors})
    }
  }
   
   onChange(e){
     this.setState({[e.target.name]: e.target.value})
   }
   
   onSubmit(e){
     e.preventDefault();
     const existingUser={
       email:this.state.email,
       password:this.state.password
     };
     this.props.loginUser(existingUser);
   }
    render() {
        return (
            <div>
            <section className="container my-3">
            <h1 className="large text-dark display-2">Login</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into an existing account</p>
            <form className="form" onSubmit={this.onSubmit}>

            <TextFieldGroup
            placeholder="Email Address"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={this.state.errors.email}
            />


            <TextFieldGroup
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={this.state.errors.password}
            />
          
              
  
              <input type="submit" className="btn btn-primary form-control col-sm-2" value="Login" />
            </form>
            <p className="my-1">
              Dont have an account? <Link to="/register">Register</Link>
            </p>
          </section>  
            </div>
        )
    }
}


Login.propTypes = {
  loginUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
  
}

const mapStateToProps = (state)=>({
  auth:state.auth,
  errors:state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);


