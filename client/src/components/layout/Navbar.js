import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
       <div>
             
<nav className="navbar fixed-top navbar-expand-sm bg-success navbar-dark">

<Link className="navbar-brand" to="/">mBlogger</Link>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="main_nav">

<ul className="navbar-nav">
  <li className="nav-item active"> <Link className="nav-link" to="/Bloggers">Bloggers</Link> </li>

 
</ul>

<ul className="navbar-nav ml-auto">
  <li className="nav-item active"><Link className="nav-link" to="/login">Login</Link></li>
  <li className="nav-item active"><Link class="nav-link" to="/register">Register</Link></li>
  

</ul>

</div> 
</nav>

       </div>   


        )
    }
}

export default NavBar;

