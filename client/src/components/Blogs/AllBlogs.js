import React, { Component } from 'react';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getBlogs, viewBlog} from '../../actions/blogActions';
import Loading from '../shared/loading';
import {withRouter} from 'react-router-dom';


class AllBlogs extends Component {

   
    componentDidMount()
    {
        this.props.getBlogs();
    }


    onClick(id)
    {
        this.props.viewBlog(id, this.props.history)
    }
    render() {

        const {blog}=this.props.blog;
        const loading="";
        let content;
        
        if(blog==null || loading){
            content=<Loading />
        }else
        {
            const blogs=[...blog];;
            content = blogs.map(m=>(
           
                <div className="col-md-6 my-2" key={m._id}>
                <div className="card" style={{height:'300px'}} >
                <div className="card-header">
                 By {m.name}
                </div>
                <div className="card-body">
                  {m.section.map(s=>(
                      <div key={s._id} className="text-truncate">
                    <h5 className="card-title">{s.heading}</h5>
                    <p className="card-text">{s.text}</p>
                    </div>
                  ))}
                  <button className="btn btn-primary mt-2" onClick={this.onClick.bind(this, m._id)}>Details</button>
                </div>
              </div>
              </div>
           
            ))
        }
        return (
            <div className="container">
            <h1>All Blogs</h1>
            <div className="row">
              
                {content}
            </div>
            </div>
            
        )
    }
}

AllBlogs.propTypes = 
{
    getBlogs:PropTypes.func.isRequired,
    blog:PropTypes.object.isRequired,
    viewBlog:PropTypes.func.isRequired
    
};

const mapStateToProps = state =>({
    blog:state.blog

})




export default connect(mapStateToProps, {getBlogs, viewBlog})(withRouter(AllBlogs));