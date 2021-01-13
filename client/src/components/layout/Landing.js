import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div className="landing">
            <section className="text-center">
            <div class="container">
              <h1 class="jumbotron-heading display-3">mBlogger</h1>
              <p class="lead text-black-75">A comprehensive blogging website, view blogs/bloggers and create blogs</p>
              <p>
                <Link to="/login" class="btn btn-primary my-2">Login</Link>
                <Link to="/register" class="btn btn-secondary my-2">Register</Link>
              </p>
            </div>
          </section>
            </div>
        )
    }
}

export default Landing;
