import React from 'react';
import ReactDOM from 'react-dom';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
        <div className="answer-modal-overlay">
          <div className="answer-modal-main">
            This is my new answer modal.
            <span onClick={this.props.toggleAnswerModal}>x</span>
          </div>
        </div>
    )
  }
}

export default AnswerModal

  // componentWillMount() {
  //   document.body.style.overflow = "hidden";
  // }

  // componentWillUnmount() {
  //   document.body.style.overflow = "visible";
  // }