import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../shared/TextFieldGroup';
import IconGroup from '../shared/IconGroup';



class BloggerDetails extends Component {
     render(){
         const {blogger}=this.props.blogger;
         let SocialHandles;
         if(blogger.socialHandles){
             SocialHandles=
             (<div>
                {(blogger.socialHandles.facebook) && 
                    <IconGroup
                    value={blogger.socialHandles.facebook}
                    icon="fa fa-facebook"
                    disabled="disabled"
                    type="text"
                  
                    />}
                {(blogger.socialHandles.twitter) && 
                    <IconGroup
                    value={blogger.socialHandles.twitter}
                    icon="fa fa-twitter"
                    disabled="disabled"
                    type="text"
                   
                    />}
                {(blogger.socialHandles.youtube) && 
                    <IconGroup
                    value={blogger.socialHandles.youtube}
                    icon="fa fa-youtube"
                    disabled="disabled"
                    type="text"
                 
                    />}
                
             </div>)
         }else{
             SocialHandles="";
         }
        return (
            <div>
            <div className="card text-white bg-info text-center">
            <h5 className="card-header">{`Handle : ${blogger.handle}`}</h5>
            <div className="card-body">
             <TextFieldGroup
             value={`Bio: ${blogger.bio}`}
             disabled="disabled"
             />

             <TextFieldGroup
             value={`Speciality: ${blogger.speciality}`}
             
             name="speciality"
             disabled="disabled"
             />
             <TextFieldGroup
             value={`Organization: ${blogger.organization}`}
             disabled="disabled"
             name={blogger.organization}/>

             <TextFieldGroup
             value={`Location: ${blogger.location}`}
             disabled="disabled"
             name={blogger.location}
             />

             <TextFieldGroup
             value={`Joining Date: ${new Date(blogger.joiningdate).toISOString().slice(0, 10)}`}

             d   disabled="disabled"
             name={blogger.joiningdate}
             />
             
             {SocialHandles}
         
            </div>
          </div>
            </div>
        )
     }
    
}


BloggerDetails.propTypes={
    auth: PropTypes.object.isRequired,
    blogger:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth:state.auth,
    blogger: state.blogger 
})

export default connect(mapStateToProps)(BloggerDetails);
