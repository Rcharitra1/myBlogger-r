import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../shared/loading';


class ViewBlog extends Component {

    render() {

        const {blog, loading}=this.props.blog;
        let content="";

        if(blog==null ||  loading)
        {
            content=<Loading/>
        }else
        {
            content =<h1>Hi</h1>
        }

        return (
            <div>
                <h1>A Blog</h1>
                {content}
            </div>
        )
    }
}

ViewBlog.propTypes={
    blog:PropTypes.object.isRequired
}


const mapStateToProps= state=>({


    blog:state.blog

})


export default connect(mapStateToProps)(ViewBlog);
