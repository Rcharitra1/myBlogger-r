import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createBlog} from '../../actions/blogActions';
import { withRouter} from 'react-router-dom';




class CreateBlog extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            heading:'',
            section:'',
            text:'',
            errors:{}
        }
        this.onChange=this.onChange.bind(this);
        this.onCreateClick=this.onCreateClick.bind(this);
    }
    componentWillReceiveProps(nextProps)
    {
        if(nextProps.errors)
        {
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(e)
    {
        this.setState({[e.target.name]:e.target.value});
    }

    onCreateClick(e)
    {
        e.preventDefault();
        console.log(this.state.heading)
        const blogObj={
            heading:this.state.heading
        }   
        this.props.createBlog(blogObj, this.props.history);
    }

    render() {
      
       
        return (
            <div className="container-lg">
            <div className="row">
            <div className="col-md-6">
            <h1>Create Blog</h1>
            <div class="input-group mb-3">
            <input type="text" className="form-control" placeholder="Add heading" 
            value={this.state.heading}
            onChange={this.onChange}
            name="heading"
            />
            <div class="input-group-append">
              <button className="btn btn-primary" type="submit" onClick={this.onCreateClick} ><i className="fa fa-plus"></i> &nbsp;Add</button>
            </div>
            {this.state.errors.heading && <p className="text-danger">{this.state.errors.heading}</p>}
            </div>
            </div>
            
            </div>
            </div>
        )
    }
}


CreateBlog.propTypes={
    createBlog:PropTypes.func,
    blog : PropTypes.object,
    errors :PropTypes.object
}


const mapStateToProps = state =>
({
    auth:state.auth,
    blog:state.blog,
    errors:state.errors
})

export default connect(mapStateToProps, {createBlog})(withRouter(CreateBlog))