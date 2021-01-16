import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/autherizeActions';

class Register extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:{}
        };

        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount(){
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/current');
      }
    }


    componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({errors: nextProps.errors})
      }
    }
    onChange(e){
       
     
        this.setState({[e.target.name]:e.target.value});

    }

    onSubmit(e){
        e.preventDefault();
        const newUser={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
      ;
    }
    render() {
        return ( 
            <div>
            <section className="container my-3">
            <h1 className="large text-dark display-2">Register</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign up for your mBlogger account</p>
            <form className="form" onSubmit={this.onSubmit}>
              <div className="form-group">
                <input type="text" placeholder="Name" name="name" value={this.state.name}   onChange={this.onChange}/>
                {(this.state.errors.name)&& <p className="text-danger">{this.state.errors.name}</p>}
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={this.state.email}
                onChange={this.onChange}
                />
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
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  minLength="6"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                {(this.state.errors.password2)&& <p className="text-danger">{this.state.errors.password2}</p>}
              </div>
              <input type="submit" className="btn btn-primary form-control col-sm-2" value="Register" />
            </form>
            <p className="my-1">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </section>  
            </div>
        )
    }
}


Register.propTypes = {
  registerUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
  auth:state.auth,
  errors:state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Register))
