import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../shared/loading';
import IconGroup from '../shared/IconGroup';
import {deleteComment, addComment, deleteBlog, deleteSection} from '../../actions/blogActions';

import {withRouter} from 'react-router-dom';

const themes=['primary', 'success','dark'];

let randomTheme=Math.floor(Math.random()*themes.length);
let selectedTheme=themes[randomTheme];
class ViewBlog extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            text:'',
            errors:{}
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.errors)
        {
            this.setState({errors: nextProps.errors})
        }
    }

    onDeleteClick(blogid, commentid)
    {
        this.props.deleteComment(blogid, commentid);
    }

 
    onDeleteSection(sectionId)
    {
        let sectionObj={
            sectionId:sectionId
        };
        this.props.deleteSection(this.props.blog.blog._id, sectionObj);
    }

    onDeleteBlog(id)
    {
        if(window.confirm('Are you sure you want to delete this blog?')){
            this.props.deleteBlog(id, this.props.history);
        }
        
    }


    

    onAddCommentClick(id){
        const newComment=
        {
            text:this.state.text
        }
        

        this.props.addComment(newComment, id);
        this.setState({errors:{}});
        this.setState({text:''})
    }

    onChange(e)
    {
        this.setState({[e.target.name]:e.target.value});
    }
    render() {

        const {blog, loading}=this.props.blog;
        let content="";
        let comments="";
        let addComment="";

        if(blog==null ||  loading)
        {
            content=<Loading/>
        }else
        {
            
            content =(

                
                
                <div className={`card text-white bg-${selectedTheme} mb-3 key=${blog._id}`}>
                <div className="text-center">
                <img src={blog.avatar} className="img-fluid rounded-circle w-25 mt-2" alt={blog.name}/>
                <h2>By {blog.name}</h2>
                <p>Published on {new Date(blog.creationDate).toISOString().slice(0, 10)}</p>
                </div>
                

  <div className="card-header display-4">{blog.heading}</div>
  {blog.section.map(sec => (
    <div className="card-body" key={sec._id}>
    <h5 className="card-title">{sec.subHeading}</h5>
    <p className="card-text">{sec.text}</p>
    <button className="btn btn-danger" onClick={this.onDeleteSection.bind(this, sec._id)}><i className="fas fa-trash"></i></button>
    
  </div>
  ))
  }
  <div className="card-body">
    {(this.props.auth.user.id===blog.user) && <button type="button" onClick={this.onDeleteBlog.bind(this, blog._id)} className="btn btn-danger">Delete</button> }

    
    </div>
  
</div>


    );
    comments=(
        <div>
        {(blog.comment.length!==0)
        && blog.comment.map(x=>(
            <div className="media my-2" key={x._id}>
            <img  src={x.avatar} className="rounded-circle image-fluid mr-2" alt={x.name} style={{height:'50px', width:'50px'}}/>
            <div className="media-body">
              <h5 className="mt-0">{x.name}&nbsp;<small>{new Date(x.commentdate).toISOString().slice(0, 10)}</small> </h5>
              <p>{x.text}</p>
              {(this.props.auth.user.id===x.user) &&
                <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this,blog._id, x._id)}><i className="fa fa-trash"/></button>
            }
            </div>
          </div>
        ))        
    }
        </div>
        
    )

    addComment=(
        <div>
        {this.props.auth.isAuthenticated && 
        <IconGroup 
        icon="fa fa-user"
        type="text"
        value={this.state.text}
        placeholder="enter a comment"
        onChange={this.onChange.bind(this)}
        name="text"
        error={this.state.errors.text}
        />}

        {
            this.props.auth.isAuthenticated
            &&
            <button type="button" className=" mb-3 btn btn-primary" onClick={this.onAddCommentClick.bind(this, blog._id)}>Post</button>
        }

        </div>
    )
        

        }

        return (
            <div  className="container-lg">
            
            <div className="row">
            <div className="mx-auto my-5">
            {content}
            {comments}
            {addComment}
            </div>
            

            </div> 
            </div>
        )
    }
}

ViewBlog.propTypes={
    blog:PropTypes.object,
    auth:PropTypes.object.isRequired,
    deleteComment:PropTypes.func,
    addComment:PropTypes.func,
    errors:PropTypes.object,
    deleteBlog:PropTypes.func,
    deleteSection:PropTypes.func

}


const mapStateToProps= state=>({


    blog:state.blog,
    auth:state.auth,
    errors:state.errors

})


export default connect(mapStateToProps, {deleteComment, addComment, deleteBlog, deleteSection})(withRouter(ViewBlog));
