import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {deleteEdu} from '../../actions/bloggerActions';

class DisplayEducation extends Component {
    
    onClick(id)
    {
        if(window.confirm('The educational record would be deleted, pls confirm?'))
        {
      
            this.props.deleteEdu(id);
        }
    }
    render() {
        const education=[...this.props.education];
        const edu=education.map((edu, index) =>(
            <tr key={edu._id}>
            <td>{index+1}</td>
            <td>{edu.degree}</td>
            <td>{edu.institution}</td>
           <td>{edu.description}</td>
            <td>{edu.finished ? new Date(edu.finished).toISOString().slice(0,10) : "Current"}</td>
            <td>
                <button className="btn btn-danger" onClick={this.onClick.bind(this, edu._id)}><i className="fas fa-trash"></i></button>
            </td>
            </tr>
        ))
        return (
            <div className="my-2">
                <h2>Education(s)</h2>
                <table className="table table-sm bg-info my-2 rounded" >
                
                <thead>
                     <tr>
                        <th>#</th>
                        <th>Degree</th>
                        <th>Institution</th>
                        <th>Description</th>
                        <th>Finished</th>
                        <th></th>
                        
                    </tr>
                    </thead>
                    <tbody className="text-light">
                    {edu}
                    </tbody>
                    
                    
                </table>
            </div>
        )
    }
}


DisplayEducation.propTypes=
{
    deleteEdu:PropTypes.func.isRequired
}


export default connect(null, {deleteEdu})(DisplayEducation);
