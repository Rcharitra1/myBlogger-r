import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createSection, viewBlog, deleteSection, deleteBlog} from '../../actions/blogActions';
import PropTypes from 'prop-types';
import TextFieldGroup from '../shared/TextFieldGroup';
import TextAreaGroup from '../shared/TextArea';
import Loading from '../shared/loading';
import {withRouter} from 'react-router-dom';


 class CreateSection extends Component {
     constructor(props)
     {
         super(props);
         this.state = 
         {
             subHeading:'',
             paratext:'',
             errors:{}
         }

     }

     onSave(id)
     {

         this.props.viewBlog(id, this.props.history);
     }

     onChange(e)
     {
         this.setState({[e.target.name]:e.target.value})
     }

     onDeleteSection(id)
     {
         let sectionObj= {
             sectionId: id
         }
         this.props.deleteSection(this.props.blog.blog._id, sectionObj);
     }

     onDeleteBlog(id)
     {
         if(window.confirm('Are you sure you want to delete the entire blog'))
         {
         this.props.deleteBlog(id, this.props.history)
         }
     }
     onCreateSection(id)
     {
         let sectionObj=
         {
             subHeading: this.state.subHeading,
             text : this.state.paratext
         }

         this.props.createSection(sectionObj, id);
     }
    render() {

        const {blog, loading} = this.props.blog;
        let heading ="";
        let section ="";
        let displaySection="";
        if(blog==null || loading)
        {
            heading=<Loading/>

        }
        else
        {
            heading = blog.heading;

            section=
                (
            <div>
            <TextFieldGroup
            name="subHeading"
            type ='text'
            placeholder='Add a section heading'
            value ={this.state.subHeading}
            errors={this.state.errors.subHeading}
            onChange={this.onChange.bind(this)}
            />

            <TextAreaGroup
            name ="paratext"
            type="text"
            placeholder="Add text content"
            value={this.state.text}
            errors={this.state.errors.text}
            onChange={this.onChange.bind(this)}
            />
            <div className="d-flex justify-context-between">
            <button type="button" className="btn btn-success" onClick={this.onSave.bind(this, blog._id)}>Save</button>
            <button type="button" className="btn btn-dark" onClick={this.onCreateSection.bind(this,blog._id)}>Create Section</button>
            </div>
            
            </div>
                )


            
            if(blog.section.length!==0)
            {
                let existingSection = [...blog.section];


                
                displaySection=(
                
                <div>
                {
                existingSection.map(x => (
                    <div className="p-2 my-1 rounded bg bg-info" key={x._id}>
                        <h2 className="text-white">{x.subHeading}</h2>
                        <p className="text-white">{x.text}</p>
                        <button className="btn btn-danger" type="button" onClick={this.onDeleteSection.bind(this, x._id)}
                        ><i className="fas fa-trash"></i></button>
                    </div>
                ))

                }
             
                </div>
                )
            
            }
        }
        return (
            <div className="container-lg">
            <div className="row">
            <div className="mx-auto my-2">
            <h1 className="display-4">{heading}</h1>
            {displaySection}
            {section}
            <button type="button" onClick={this.onDeleteBlog.bind(this, this.props.blog.blog._id)} className="btn btn-danger mt-2"><i className="fas fa-trash"></i> Delete Blog</button>
            </div>
            </div>
   


                
            </div>
        )
    }
}

CreateSection.propTypes ={
    blog:PropTypes.object.isRequired,
    createSection:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    viewBlog:PropTypes.func.isRequired,
    deleteSection:PropTypes.func,
    deleteBlog:PropTypes.func

}

const mapStateToProps = state =>({
    blog:state.blog,
    auth:state.auth
})

export default connect(mapStateToProps, {createSection, viewBlog, deleteSection, deleteBlog})(withRouter(CreateSection))


