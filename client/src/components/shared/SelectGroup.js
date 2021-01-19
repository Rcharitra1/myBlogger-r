import React from 'react';
import classname from 'classnames';
import PropTypes from 'prop-types';

const SelectGroup=(
    {
        name, 
        value,
        error,
        info,
        onChange,
        options
    })=>{
        const selectOptions = options.map(option=>(<option key={option.label} value={option.value}>{option.label}</option>))
    return (
        <div className="form-group">
                <select  
                value={value}
                className={classname("form-control form-control-lg", {"is-invalid":error})}
                name={name}
                onChange={onChange}
                >
                {selectOptions}
                </select>
                {info && <small className="form-text text-muted">{info}</small>}
              {error && (<div className="invalid-feedback">{error}</div>)}
              </div>
    )
}



SelectGroup.propTypes={
    name:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    info:PropTypes.string,
    error:PropTypes.string,
    onChange:PropTypes.func.isRequired,
    options:PropTypes.array.isRequired
}



export default SelectGroup;