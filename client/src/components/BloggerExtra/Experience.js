import React, { Component } from 'react';
import TextAreaGroup from '../shared/TextArea';
import TextFieldGroup from '../shared/TextFieldGroup';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addExperience} from '../../actions/bloggerActions';

class CreateExperience extends Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            company:'',
            location:'',
            to:'',
            current:false,
            from:'',
            description:'',
            errors:{},
            disabled:false
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
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e)
    {
        e.preventDefault();
        
        const newExp = 
        {
            title : this.state.title,
            company : this.state.company,
            location: this.state.location,
            current : this.state.current,
            from:this.state.from,
            to:this.state.to,
            description:this.state.description

        };

        this.props.addExperience(newExp, this.props.history)
    }
    onClick(e)
    {
        
        this.setState({
            disabled: !this.state.disabled, 
            current: !this.state.current
        })
    }

    render() {

        
        
        return (
            <div className="container">
            <div className="row">
            <div className="col-md-8 mx-auto">
            
            
            <h1>Experience</h1>
            <form onSubmit={this.onSubmit}>
            <TextFieldGroup
            name="title"
            value={this.state.title}
            type="text"
            onChange={this.onChange}
            placeholder="* Title"
            error={this.state.errors.title}
            />
            <TextFieldGroup
            name="company"
            value={this.state.company}
            onChange={this.onChange}
            placeholder="Company"
            />

            <TextFieldGroup
            name="location"
            value={this.state.location}
            onChange={this.onChange}
            placeholder="Location"
            />

            <TextFieldGroup
            name="from"
            value={this.state.from}
            onChange={this.onChange}
            info="* from date"
            error={this.state.errors.from}
            type="date"
            />

            <TextFieldGroup
            name ="to"
            value={this.state.to}
            onChange={this.onChange}
            type="date"
            info="to date"
            disabled={this.state.disabled ? 'disabled': ''}
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

            <TextAreaGroup
            name="description"
            value ={this.state.description}
            
            onChange={this.onChange}
            placeholder="Describe your job"
            />
           
            
           

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


CreateExperience.prototypes={
    errors:PropTypes.object,
    blogger:PropTypes.object.isRequired,
    addExperience:PropTypes.func.isRequired
    
}


const mapStateToProps = state =>({
    blogger: state.blogger,
    errors:state.errors
})

export default connect(mapStateToProps, {addExperience})(withRouter(CreateExperience));
