
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Component } from 'react';
import {Link} from 'react-router-dom';

class Current extends Component {
    render(){
        const {user} = this.props.auth;
        return (
            <div>
            <section className="container my-3">
            <h1 className="large text-dark display-2">User Page</h1>
            <form className="form align-items-center">
            <div className="form-group">
                <img 
                src={user.avatar} className="rounded circle w-50" alt={user.id}  />
   
              </div>
              <div className="form-group">
                <input 
                value={user.id} readOnly className="form-control col-md-6"/>
   
              </div>
              <div className="form-group">
                <input 
                value={user.name} readOnly className="form-control col-md-6"/>
   
              </div>
              </form>
  
            <p className="my-1">
              Go to blogger details <Link to="/blogger">Blogger</Link>
            </p>
          </section>  
            </div>
        )
    }
    
}


Current.propTypes={
    auth: PropTypes.object.isRequired,
    user:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth,
    user:state.user
});
export default connect(mapStateToProps, {})(Current);




