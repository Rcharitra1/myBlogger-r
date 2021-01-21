import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../shared/TextFieldGroup';
import {createBlogger} from '../../actions/bloggerActions';
import {withRouter} from 'react-router-dom';


import IconGroup from '../shared/IconGroup';
import SelectGroup from '../shared/SelectGroup';
import TextAreaGroup from '../shared/TextArea';

 class CreateBlogger extends Component {
     constructor(props){
         super(props);
         this.state={
             toggleSocialLinks:false,
             handle:'',
             speciality:'',
             organization:'',
             location:'',
             youtube:'',
             facebook:'',
             twitter:'',
             bio:'',
             errors:{}

         };
         this.onChange=this.onChange.bind(this);
         this.onSubmit=this.onSubmit.bind(this);

     }
     onChange(e){
         this.setState({[e.target.name]:e.target.value})

     }
     componentWillReceiveProps(nextProps){
         if(nextProps.errors){
             this.setState({errors:nextProps.errors})
         }
     }
     onSubmit(e){
         e.preventDefault();
         const bloggerData={
             handle:this.state.handle,
             speciality:this.state.speciality,
             organization:this.state.organization,
             location:this.state.location,
             bio:this.state.bio,
             youtube:this.state.youtube,
             twitter:this.state.twitter,
             facebook:this.state.facebook
         };

         this.props.createBlogger(bloggerData, this.props.history);

     }
    render() {
        const options=[
            { label : 'Select an area of speciality', value:0},
            { label : 'Engineer', value:'Engineer'},
            { label : 'Manager', value:'Manger'},
            { label : 'Environmentalist', value:'Environmentalist'},
            { label : 'Writer', value:'Writer'},
            { label : 'Lawyer', value:'Lawyer'},
            { label : 'Doctor', value:'Doctor'}

        ];
        return (
            <div className="container">
            <div className="row">
            <div className="col-md-8 m-auto">
            <h1 className="text-center">Blogger Details</h1>
            <form onSubmit={this.onSubmit}>
            <TextFieldGroup 
            placeholder="* Handle"
            name="handle"
            value={this.state.handle}
            onChange={this.onChange}
            error={this.state.errors.handle}
            info="A name for your handle"
            />

            <SelectGroup
            options={options}
            onChange={this.onChange}
            name="speciality"
            value={this.state.speciality}
            error={this.state.errors.speciality}
    
            />
            <TextFieldGroup
            placeholder="Organization"
            name="organization"
  
            value={this.state.organization}
            onChange={this.onChange}/>

            <TextFieldGroup
            placeholder="Location"
            name="location"
            value={this.state.location}
            onChange={this.onChange}/>
            <TextAreaGroup
            placeholder="Bio"
            name="bio"
            value={this.state.bio}
            onChange={this.onChange}
            />
           <button className="btn btn-secondary mb-3" type="button" onClick={()=>{
               this.setState(prevState=> ({
                   toggleSocialLinks:!prevState.toggleSocialLinks
               }))
           }}>{this.state.toggleSocialLinks? "Hide social handles": "Display social handles"}</button>
          {(this.state.toggleSocialLinks) && 
        (<IconGroup
            type="url"
            onChange={this.onChange}
            name="facebook"
            text="Facebook"
            icon="fab fa-facebook-f"
            value={this.state.facebook}
            error={this.state.errors.facebook}
            />
            

           
        )

        }
        {(this.state.toggleSocialLinks)&& (
            <IconGroup
            type="url"
            onChange={this.onChange}
            name="twitter"
            text="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            error={this.state.errors.twitter}
            />
        )}

        {(this.state.toggleSocialLinks) && (
            <IconGroup
            type="url"
            onChange={this.onChange}
            name="youtube"
            text="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            error={this.state.errors.youtube}
            />
        )}
        <button type="submit" className="btn btn-primary d-block">Submit</button>
            </form>
            </div>
            </div>
            </div>
        )
    }
}

CreateBlogger.propTypes={
    auth:PropTypes.object.isRequired,
    blogger:PropTypes.object.isRequired,
    errors:PropTypes.object

}

const mapStateToProps = state =>({
    auth:state.auth,
    blogger:state.blogger,
    errors:state.errors
})

export default connect(mapStateToProps, {createBlogger})(withRouter(CreateBlogger))