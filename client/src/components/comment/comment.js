import React, { Component } from 'react';

import {connect} from 'react-redux';


 class Comment extends Component {

    render() {
        const {comment}=[...this.props.comment];
        console.log(comment);

        const content = comment.map(x => (<div className="media">
        <img className="mr-3" src={x.avatar} alt={comment.name}/>
        <div className="media-body">
          <h5 className="mt-0">{x.name} {new Date(x.date).toISOString().slice(0, 10)}</h5>
          {x.text}
        </div>
      </div>

        ))
        return (
            {content}
            
        )
    }
}


export default connect(null)(Comment)
