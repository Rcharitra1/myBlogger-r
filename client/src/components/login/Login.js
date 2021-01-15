import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/autherizeActions';

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
   componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/current');
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
              <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" 
                value={this.state.email}
                onChange={this.onChange}/>
                {(this.state.errors.email)&& <p className="text-danger">{this.state.errors.email}</p>}
               
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  value={this.state.password}
                onChange={this.onChange}
                />

                {(this.state.errors.password)&& <p className="text-danger">{this.state.errors.password}</p>}
              </div>
  
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


