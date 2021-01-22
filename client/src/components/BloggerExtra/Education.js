import React, { Component } from 'react';
import TextAreaGroup from '../shared/TextArea';
import TextFieldGroup from '../shared/TextFieldGroup';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addEducation} from '../../actions/bloggerActions';

class CreateEducation extends Component {
    constructor(props)
    {
        super(props);
        this.state= 
        {
            institution:'',
            degree:'',
            description:'',
            finished:'',
            current:false,
            disabled:false,
            errors:{}
        }
        this.onChange=this.onChange.bind(this);
        this.onClick=this.onClick.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

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
    onSubmit(e)
    {
        e.preventDefault();
        const newEdu=
        {
            institution: this.state.institution,
            description:this.state.description,
            finished:this.state.finished,
            current:this.state.current,
            degree:this.state.degree
        };
        
        this.props.addEducation(newEdu, this.props.history)
    }

    onClick(e)
    {
        this.setState(
            {
                disabled:!this.state.disabled,
                current:!this.state.current
            })

    }
    render() {

        return (
            <div className="container">
            <div className="row">
            <div className="col-md-8 mx-auto">
            <h1>Education</h1>
            <form onSubmit={this.onSubmit}>
            <TextFieldGroup
            value={this.state.institution}
            onChange={this.onChange}
            type="text"
            name="institution"
            placeholder="* Institution/College/University"
            error={this.state.errors.institution}
            />
            <TextFieldGroup
            value={this.state.degree}
            type="text"
            name="degree"
            error={this.state.errors.degree}
            placeholder="* Degree"
            onChange={this.onChange}
            />
            <TextAreaGroup
            placeholder="Describe your education"
            value={this.state.description}
            name="description"
            error={this.state.errors.description}
            onChange={this.onChange}
            />
            
            <TextFieldGroup
            type="date"
            name="finished"
            value={this.state.finished}
            onChange={this.onChange}
            info="Finished Date"
            disabled={this.state.disabled? "disabled":""}
            />
            <div className="d-block d-flex justify-content-flex-start align-items-baseline">
            <input name="current" 
            onChange={this.onClick}
            className="d-block mb-3 mr-1"
            checked={this.state.current}
            type="checkbox"
            />
            <label>Current ?</label>
            </div>

            <Link to="/blogger" className="btn btn-danger col-2">Cancel
            </Link>

            <button type="submit" className="btn btn-success">Submit</button>
            </form>
            
            </div>
            </div>
                
            </div>
        )
    }
}


CreateEducation.prototypes={
    errors:PropTypes.object,
    blogger:PropTypes.object.isRequired,
    addEducation:PropTypes.func.isRequired
}
const mapStateToProps = state =>({
    blogger:state.blogger,
    errors:state.errors
})


export default connect(mapStateToProps, {addEducation})(withRouter(CreateEducation))




