import React from 'react';
import classname from 'classnames';
import PropTypes from 'prop-types';

const TextAreaGroup=(
    {
        name, 
        placeholder,
        value,
        error,
        info,
        onChange,
        disabled
    })=>{
    return (
        <div className="form-group">
                <textarea  placeholder={placeholder} 
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



TextAreaGroup.propTypes={
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
    info:PropTypes.string,
    error:PropTypes.string,
    onChange:PropTypes.func.isRequired,
    disabled:PropTypes.string
}



export default TextAreaGroup;