import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createSection} from '../../actions/blogActions';
import PropTypes from 'prop-types';
import TextFieldGroup from '../shared/TextFieldGroup';
import TextAreaGroup from '../shared/TextArea';
import Loading from '../shared/loading';

 class CreateSection extends Component {
     constructor(props)
     {
         super(props);
         this.state = 
         {
             subHeading:'',
             text:'',
             errors:{}
         }
         this.onChange=this.onChange.bind(this);
     }

     onChange(e)
     {
         this.setState({[e.target.name]:e.target.value})
     }
    render() {

        const {blog, loading} = this.state;
        let heading ="";
        if(blog==null || loading)
        {
            heading=<Loading/>
            console.log(blog)

        }
        else
        {
            heading = blog.heading;
        }
        return (
            <div className="container">
            <div className="row">
            <h1>{heading}</h1>
            </div>
            <TextFieldGroup
            name='subHeading'
            type ='text'
            placeholder='Add a section heading'
            value ={this.state.heading}
            errors={this.state.errors.subHeading}
            onChange={this.onChange}
            />

            <TextAreaGroup
            name ="text"
            type="text"
            placeholder="Add text content"
            value={this.state.subHeading}
            errors={this.state.errors.text}
            onChange={this.onChange}
            />


                
            </div>
        )
    }
}

CreateSection.propTypes ={
    blog:PropTypes.object.isRequired,
    createSection:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    blog:state.blog,
    auth:state.auth
})

export default connect(mapStateToProps, {createSection})(CreateSection)


