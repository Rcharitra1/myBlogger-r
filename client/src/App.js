import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import authorizedJwtToken from './utils/authorizedJwtToken';

import jwt_decode from 'jwt-decode';


import {logoutUser, setUser} from './actions/autherizeActions';

import PrivateRoute from './components/shared/PrivateRoute';
import './App.css';
import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Current from './components/shared/current';
import BloggerPage from './components/blogger/blogger';
import { clearBlogger } from './actions/bloggerActions';
import CreateBlogger from './components/BloggerDetails/CreateBlogger';

import EditBlogger from './components/BloggerDetails/EditBlogger';
import CreateExperience from './components/BloggerExtra/Experience'
import CreateEducation from './components/BloggerExtra/Education';
import AllBlogs from './components/Blogs/AllBlogs'

if(localStorage.jwtToken){
  authorizedJwtToken(localStorage.jwtToken);
  const decodeJwt=jwt_decode(localStorage.jwtToken);
  store.dispatch(setUser(decodeJwt));

  const currentTime=Date.now()/1000;
  if(decodeJwt.exp<currentTime){
    store.dispatch(logoutUser());
    store.dispatch(clearBlogger());
    window.location.href='/login';
    localStorage.removeItem('jwtToken');

  }
}

class App extends Component {
  render (){
    return(
      <Provider store = {store}>
      <Router>
      <div className="app">
      <NavBar />
      <Route exact path="/" component={Landing}/>
      <div className="container">
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>

      <Route exact path="/current" component={Current}/>
      <Route exact path="/blogs/all" component={AllBlogs}/>
      <Switch>
      <PrivateRoute exact path="/blogger" component={BloggerPage}/>
      

      
      </Switch>
      <Switch>
      <PrivateRoute exact path="/blogger/create"
      component={CreateBlogger}
      />
      </Switch>

      <Switch>
      <PrivateRoute exact path="/blogger/edit"
      component={EditBlogger}
      />
      </Switch>

      <Switch>
      <PrivateRoute exact path="/blogger/experience"
      component={CreateExperience}
      />
      </Switch>


      <Switch>
      <PrivateRoute exact path="/blogger/education"
      component={CreateEducation}
      />
      </Switch>
      
      </div>
      

      <Footer />
      </div>
      </Router>
      </Provider>

    )
   
    
  };
}

export default App;
