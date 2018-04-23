import React, { Component } from 'react';
import classNames from 'classnames';

class MessageComponent extends Component {
  render() {
    const { message, toggleStar, toggleSelect } = this.props;
    console.log(message);
    const readClass = message.read ? 'read' : 'unread';
    const starClass = message.starred ? 'fa-star': 'fa-star-o';
    const selectedClass = message.selected ? 'selected' : '';

    const starMessage = e => {
      e.stopPropagation(); 
      toggleStar(message);
    };

    const labels = message.labels.map((label, i) => ( 
     <span key={i} className="label label-warning">
      {label}</span>
    )); 
    //list of things that wants to be id for that particular list 
    return (
      <div className={`row message ${readClass} ${selectedClass}`} onClick={() => toggleSelect(message)}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input 
              type="checkbox" 
              checked={!!message.selected} 
              readOnly={true}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${starClass}`} onClick={starMessage} />
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {labels}
          {message.subject}
        </div>
      </div>
    );
  }
}

export default MessageComponent;
