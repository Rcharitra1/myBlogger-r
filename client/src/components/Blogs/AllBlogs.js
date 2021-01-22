import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getBlogs} from '../../actions/blogActions';
import Loading from '../shared/loading';

class AllBlogs extends Component {

   
    componentDidMount()
    {
        this.props.getBlogs();
    }
    render() {

        const blog='';
        const loading="";
        let content;
        if(blog==null || loading){
            content=<Loading />
        }else
        {
            content=<h2>Got Blogs</h2>
        }
        return (
            <div>
                <h1>All Blogs</h1>
                {content}
            </div>
        )
    }
}

AllBlogs.propTypes = 
{
    getBlogs:PropTypes.func.isRequired,
    blog:PropTypes.array.isRequired
    
};

const mapStateToProps = state =>({
    blog:state.blog

})

export default connect(mapStateToProps, {getBlogs})(AllBlogs);