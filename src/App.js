import React, { Component } from 'react';
import ToolbarComponent from './components/ToolbarComponent';
import MessagesComponent from './components/MessagesComponent';

class App extends Component {
  
  state = {
    messages: this.props.messages
  };
  // constructor(props) {
  //   super(props) 
  //   this.state = {messages: props.messages}
  // } this is the old way 
  toggleProperty(message, star) {
    const index = this.state.messages.indexOf(message);
    this.setState({
      messages:[
      ...this.state.messages.slice(0, index), // 
      {...message,[star]: !message[star]}, // message 4 - this is the message getting changed, we are changing what star is going to whether it is t or f
      ...this.state.messages.slice(index + 1) // spreading out, keeping the data the same - only changing the stars for line 19 
      ]
    });
  };

  toggleStar = (message) => {
    this.toggleProperty(message, 'starred');
  };

  toggleSelect = message => {
    this.toggleProperty(message, 'selected');
  };

  markReadStatus = readStatus => {
    this.setState({
      messages: this.state.messages.map(
        message => (message.selected ? {...message, read: readStatus } : message)
      )
    });
  };

  deleteMessages = () => {
    const messages = this.state.messages.filter(message => !message.selected);
    this.setState({ messages });
  };

  applyLabel = label => {
    const messages = this.state.messages.map(message => 
      message.selected && !message.labels.includes(label)  
      ? {...message, labels: [...message.labels, label].sort() }
      : message
    );
    this.setState({ messages });
      //keep all the labels, add any of the labels that are being applied line 49
    //only do this to messages that dont already have labels - if true 
  };

  removeLabel = label => {
    const messages = this.state.messages.map(
      message => {
        const index = message.labels.indexOf(label);
        if (message.selected && index > -1) {
          return {
            ...message,
            labels: [
            ...message.labels.slice(0, index),
            ...message.labels.slice(index +1)
            ]
          }
        };
        return message;
      });
      this.setState({ messages });
  };

  toggleSelectAll = () => {
    const selectedMessages = this.state.messages.filter(message => message.selected
   );

   const selected = selectedMessages.length != this.state.messages.length;
   this.setState({
    messages: this.state.messages.map(
      message => 
        message.selected !== selected ? { ...message, selected } : message 
      )
   });
};  
  
  render() {
    // console.log(this.state);
    return (
      <div className="App">
        <ToolbarComponent 
        messages={this.state.messages} 
        toggleSelectAll={this.toggleSelectAll} 
        markReadStatus={this.markReadStatus} 
        deleteMessages = {this.deleteMessages}
        applyLabel={this.applyLabel}
        removeLabel={this.removeLabel}/>

        <MessagesComponent
          messages={this.state.messages}
          toggleStar={this.toggleStar}
          toggleSelect={this.toggleSelect}
        />
      </div>
    );
  }
}


export default App;
