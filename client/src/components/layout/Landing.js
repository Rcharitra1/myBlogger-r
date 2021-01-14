import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Landing extends Component {
    render() {
        return (
            <div className="landing">
            <section className="text-center">
            <div className="container">
              <h1 className="jumbotron-heading display-3">mBlogger</h1>
              <p className="lead text-black-75">A comprehensive blogging website, view blogs/bloggers and create blogs</p>
              <p>
                <Link to="/login" className="btn btn-primary my-2">Login</Link>
                <Link to="/register" className="btn btn-secondary my-2">Register</Link>
              </p>
            </div>
          </section>
            </div>
        )
    }
}

export default Landing;
