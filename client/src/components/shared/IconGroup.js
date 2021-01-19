import React from 'react';
import classname from 'classnames';
import PropTypes from 'prop-types';

const IconGroup=(
    {
        name, 
        placeholder,
        value,
        error,
        info,
        onChange,
        disabled,
        icon,
        type
    })=>{
    return (
        <div className="input-group mb-3">
        <div className="input-group-prepend">
        <span className="input-group-text">
        <i className={icon}/>
        </span>
        </div>
                <input  placeholder={placeholder} 
                value={value}
                type={type}
                className={classname("form-control form-control-lg", {"is-invalid":error})}
                name={name}
                onChange={onChange}
                disabled={disabled}/>
              {error && (<div className="invalid-feedback">{error}</div>)}
              </div>
    )
}



IconGroup.propTypes={
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
    info:PropTypes.string,
    error:PropTypes.string,
    icon:PropTypes.string,
    type:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    disabled:PropTypes.string
}



export default IconGroup;