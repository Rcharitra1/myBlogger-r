import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/autherizeActions';


import {clearBlogger} from '../../actions/bloggerActions';

class NavBar extends Component {
    onLogoutClick(e){
      e.preventDefault();
      this.props.clearBlogger();
      this.props.logoutUser();
      
    }
    render() {
      const {isAuthenticated, user}=this.props.auth;
      const authLinks = 
      (
        <ul className="navbar-nav ml-auto">
  <li className="nav-item active"><a href=" " className="nav-link" onClick={this.onLogoutClick.bind(this)}>
  <img src={user.avatar} style={{width:'25px', marginRight:'5px'}} className="rounded circle" alt={user.name} title="Gravatar" />
  Logout
  </a>
  </li>

  

</ul>
      )
      const guestUserLinks=(
        <ul className="navbar-nav ml-auto">
  <li className="nav-item active"><Link className="nav-link" to="/login">Login</Link></li>
  <li className="nav-item active"><Link className="nav-link" to="/register">Register</Link></li>
  

</ul>
      )
        return (
       <div>
             
<nav className="navbar fixed-top navbar-expand-sm bg-success navbar-dark">

<Link className="navbar-brand" to="/">mBlogger</Link>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="main_nav">

<ul className="navbar-nav">
  <li className="nav-item active"> <Link className="nav-link" to="/Bloggers">Checkout Blogs</Link> </li>

 
</ul>

{isAuthenticated ? authLinks : guestUserLinks}

</div> 
</nav>

       </div>   


        )
    }
}

NavBar.propTypes={
  logoutUser:PropTypes.func.isRequired,
  clearBlogger:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
  auth:state.auth
})

export default connect(mapStateToProps, {logoutUser, clearBlogger} )(NavBar);

