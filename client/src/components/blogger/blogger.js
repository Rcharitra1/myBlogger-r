import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentBlogger} from '../../actions/bloggerActions';
import Loading from '../shared/loading';
import {Link} from 'react-router-dom';



class BloggerPage extends Component {
    componentDidMount(){
        this.props.getCurrentBlogger();
    }
    render() {
        const {user}=this.props.auth;
        const {blogger, loading}=this.props.blogger;
        let bloggerContent;
        if(blogger==null || loading){
            bloggerContent=<Loading />
        }else{
            if(Object.keys(blogger).length>0){
                bloggerContent=<h2>Display Profile</h2>
            }else{
                bloggerContent=(
                    <div>
                    <p className="text-muted">Welcome {user.name}</p>
                    <p>You dont have not filled in details yet</p>
                    <Link to="/create" className="btn btn-lg btn-secondary">Create</Link>
                    </div>
                )
            }
     
        }
        return (
            <div>
                <div className="dashboard">
                <div className="container">
                <div className="row">
                <div className="col-md-12">
                <h1>Blogger Details</h1>
                {bloggerContent}
                </div>
                </div>
                </div>

                </div>
            </div>
        )
    }
}

BloggerPage.propTypes={
    blogger:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    getCurrentBlogger:PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    blogger:state.blogger,
    auth:state.auth

})
export default connect(mapStateToProps, {getCurrentBlogger})(BloggerPage);