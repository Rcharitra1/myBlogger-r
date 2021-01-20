import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
                    disabled={true}
                    />}
                {(blogger.socialHandles.twitter) && 
                    <IconGroup
                    value={blogger.socialHandles.twitter}
                    icon="fa fa-twitter"
                    disabled={true}
                    />}
                {(blogger.socialHandles.youtube) && 
                    <IconGroup
                    value={blogger.socialHandles.youtube}
                    icon="fa fa-youtube"
                    disabled={true}
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
             disabled={true}
             />

             <TextFieldGroup
             value={`Speciality: ${blogger.speciality}`}
             disabled={true}
             />
             <TextFieldGroup
             value={`Organization: ${blogger.organization}`}
             disabled={true}/>

             <TextFieldGroup
             value={`Location: ${blogger.location}`}
             disabled={true}
             />

             <TextFieldGroup
             value={`Joining Date: ${new Date(blogger.joiningdate).toISOString().slice(0, 10)}`}

             disabled={true}
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
