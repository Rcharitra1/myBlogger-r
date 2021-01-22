import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentBlogger, deleteAccount} from '../../actions/bloggerActions';
import Loading from '../shared/loading';
import {Link} from 'react-router-dom';
import BloggerDetails from './bloggerDetails.js';
import DisplayExperience from '../BloggerExtra/DisplayExperience';
import DisplayEducation from '../BloggerExtra/DisplayEducation';




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
                    <BloggerDetails />

                    {(blogger.experience.length!==0)? <DisplayExperience experience={blogger.experience}/>: ""}


                    {(blogger.education.length!==0)? <DisplayEducation education={blogger.education}/>:""}
                   
                    <div className="d-flex justify-content-space-between my-2">
                    <Link to="/blogger/edit" className="btn btn-dark text-light ">Edit Blogger</Link>

                    <Link to="/blogger/education" className="btn  btn-primary text-light">Add Education</Link>

                    <Link to="/blogger/experience" className="btn btn-success text-light">Add Experience</Link>
                   
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
