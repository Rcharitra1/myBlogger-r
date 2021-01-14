import React, { Component } from 'react';
import {Link} from 'react-router-dom';

 export default class Login extends Component {
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
   onChange(e){
     this.setState({[e.target.name]: e.target.value})
   }

   onSubmit(e){
     e.preventDefault();
     const existingUser={
       email:this.state.email,
       password:this.state.password
     };
     console.log(existingUser);
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


