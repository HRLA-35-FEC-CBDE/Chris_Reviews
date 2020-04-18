import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';

class AnswerModalAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: this.props.helpful,
      notHelpful: this.props.notHelpful,
      reportContent: 'Report as inappropriate'
    }
    this.slugify = this.slugify.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(event) {
    const { target } = event;
    const uri = target.attributes.name.value
    const buttonClicked = target.attributes.rel.value
    axios.put(`${uri}`)
    .then(res => this.props.updateQuestions(res.data.questions))
    .then(() => {
      if (buttonClicked === 'yes') {
        this.setState(prevState => ({
          helpful: prevState.helpful + 1
        }))
      } else if (buttonClicked === 'no') {
        this.setState(prevState => ({
          notHelpful: prevState.notHelpful + 1
        }))
      } else {
        this.setState({
          reportContent: 'Reported answer'
        })
      }
    })
  }

  slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
    return str
  }

  render() {
    const slugifiedProduct = this.slugify(this.props.productName)
    return (
      <div>
      <div className="answer-modal-answer-header">
        <span className="answer-modal-answer-name">{this.props.name}</span>
        <span className="answer-modal-answer-dot">·</span>
        <span className="answer-modal-answer-date">{moment(this.props.createdAt).fromNow()}</span>
      </div>
      <div className="answer-modal-answer-body">
        {this.props.answer}
      </div>
      <div className="answer-modal-footer-buttons">
        <div className="answer-modal-helpful-word">Helpful?</div>
        <div className="answer-modal-yes-button" onClick={this.clickHandler} rel="yes" name={`/product/${this.props.productId}/${slugifiedProduct}/${this.props.questionId}/${this.props.id}/answer-helpful`}>Yes · {this.state.helpful}</div>
        <div className="answer-modal-no-button" onClick={this.clickHandler} rel="no" name={`/product/${this.props.productId}/${slugifiedProduct}/${this.props.questionId}/${this.props.id}/answer-not-helpful`}>No · {this.state.notHelpful}</div>
        <div className="answer-modal-report-button" onClick={this.clickHandler} rel="report" name={`/product/${this.props.productId}/${slugifiedProduct}/${this.props.questionId}/${this.props.id}/answer-inappropriate`}>{this.state.reportContent}</div>
      </div>
    </div>
    )
  }
}

export default AnswerModalAnswers