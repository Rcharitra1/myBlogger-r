import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {deleteExp} from '../../actions/bloggerActions';

class DisplayExperience extends Component {
    
    onClick(id)
    {
        if(window.confirm('The work experience record would be deleted, pls confirm?'))
        {
      
            this.props.deleteExp(id);
        }
    }
    render() {
        const experience=[...this.props.experience];
        const exp=experience.map((exp, index) =>(
            <tr key={exp._id}>
            <td>{index+1}</td>
            <td>{exp.title}, {exp.company}</td>
            <td>{exp.description}</td>
            <td>{new Date(exp.from).toISOString().slice(0,10)}</td>
            <td>{exp.to ? new Date(exp.to).toISOString().slice(0,10) : "Current"}</td>
            <td>
                <button className="btn btn-danger" onClick={this.onClick.bind(this, exp._id)}>Delete</button>
            </td>
            </tr>
        ))
        return (
            <div className="my-2">
                <h2>Experience(s)</h2>
                <table className="table table-sm bg-info my-2 rounded" >
                
                <thead>
                     <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>From</th>
                        <th>To</th>
                        <th></th>
                        
                    </tr>
                    </thead>
                    <tbody className="text-light">
                    {exp}
                    </tbody>
                    
                    
                </table>
            </div>
        )
    }
}


DisplayExperience.propTypes=
{
    deleteExp:PropTypes.func.isRequired
}


export default connect(null, {deleteExp})(DisplayExperience);
