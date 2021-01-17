import React, { Component } from 'react';
import loading from '../../img/loading.gif';

export default class Loading extends Component {
    render() {
        return (
            <div>
                <img src={loading} alt="Spinner" style={{width:'200px', margin:'auto', display:'block'}}/>
            </div>
        )
    }
}
