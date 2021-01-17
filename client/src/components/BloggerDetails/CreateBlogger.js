import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../shared/TextFieldGroup';

 class CreateBlogger extends Component {
     constructor(props){
         super(props);
         this.state={
             toggleSocialLinks:false,
             handle:'',
             organization:'',
             location:'',
             youtube:'',
             facebook:'',
             twitter:'',
             bio:'',
             errors:{}

         }
     }
    render() {
        return (
            <div className="container">
            <div className="row">
            <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Fill out blogger details</h1>
            <small className="d-block pb-3">* = required</small>
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

export default connect(null)(CreateBlogger)