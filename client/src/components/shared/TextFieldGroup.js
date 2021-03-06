import React from 'react';
import classname from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup=(
    {
        name, 
        placeholder,
        value,
        label,
        error,
        type, 
        info,
        onChange,
        disabled
    })=>{
    return (
        <div className="form-group">
                <input type={type} placeholder={placeholder} 
                value={value}
                className={classname("form-control form-control-lg", {"is-invalid":error})}
                name={name}
                onChange={onChange}
                disabled={disabled}/>
                {info && <small className="form-text text-muted">{info}</small>}
              {error && (<div className="invalid-feedback">{error}</div>)}
              </div>
    )
}



TextFieldGroup.propTypes={
    name:PropTypes.string,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
    info:PropTypes.string,
    error:PropTypes.string,
    type:PropTypes.string.isRequired,
    onChange:PropTypes.func,
    disabled:PropTypes.string
}

TextFieldGroup.defaultProps={
    type:'text'
}

export default TextFieldGroup;