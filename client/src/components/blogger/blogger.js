import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentBlogger, deleteAccount} from '../../actions/bloggerActions';
import Loading from '../shared/loading';
import {Link} from 'react-router-dom';
import BloggerDetails from './bloggerDetails.js';




class BloggerPage extends Component {
    componentDidMount(){
        this.props.getCurrentBlogger();
    }
    onDeleteClick(){

        this.props.deleteAccount();

    }
    render() 
    {
        const {user}=this.props.auth;
        const {blogger, loading}=this.props.blogger;
        let bloggerContent;
        if(blogger==null || loading){
            bloggerContent=<Loading />
        }else{
            if(Object.keys(blogger).length>0){
                bloggerContent=(
                    <div>
                    <h2>Display Profile</h2>
                    <BloggerDetails />
                    <div className="row my-2">
                    <Link to="/blogger/edit" className="col-4 btn btn-dark text-light">Edit Blogger</Link>

                    <Link to="/blogger/education" className="col-3 btn  btn-primary text-light">{(blogger.education.length)?"View Education":"Add Education" }</Link>

                    <Link to="/blogger/experience" className="col-4 btn btn-success text-light">{(blogger.experience.length)?"View Experience":"Add Experience" }</Link>
                   
                    </div>
                    <button onClick={this.onDeleteClick.bind(this)} className=" btn btn-danger form-control">Delete Account</button>
                    </div>
                    
                    
                    )

            }else{
                bloggerContent=(
                    <div>
                    <p className="text-muted">Welcome {user.name}</p>
                    <p>You dont have not filled in details yet</p>
                    <Link to="/blogger/create" className="btn btn-lg btn-secondary">Create</Link>
                    </div>
                )
            }
     
        }
        return (
            <div>
                <div className="dashboard">
                <div className="container">
                <div className="row">
                <div className="col-12">
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
    getCurrentBlogger:PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    blogger:state.blogger,
    auth:state.auth

})
export default connect(mapStateToProps, {getCurrentBlogger, deleteAccount})(BloggerPage);
