import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/login/Login';
import Register from './components/register/Register';



class App extends Component {
  render (){
    return(
      <Router>
      <div className="app">
      <NavBar />
      <Route exact path="/" component={Landing}/>
      <div class="container">
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      </div>
      

      <Footer />
      </div>
      </Router>

    )
   
    
  };
}

export default App;
