import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import axios from 'axios';

class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: this.props.helpful,
      notHelpful: this.props.notHelpful,
      reportContent: 'Report as inappropriate'
    }
    this.incrementHelpful = this.incrementHelpful.bind(this);
    this.incrementNotHelpful = this.incrementNotHelpful.bind(this);
    this.reportAsInAppropriate = this.reportAsInAppropriate.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.helpful !== prevProps.helpful || this.props.notHelpful !== prevProps.notHelpful) {
      this.setState({
        helpful: this.props.helpful,
        notHelpful: this.props.notHelpful,
        reportContent: 'Report as inappropriate'
      })
    }
  }

  slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
    return str
  }

  incrementHelpful() {
    const product = this.slugify(this.props.productName)
    axios.put(`/product/${this.props.productId}/${product}/${this.props.questionId}/${this.props.id}/answer-helpful`)
    .then(res => this.props.updateQuestions(res.data.questions))
    .then(() => this.setState(prevState => ({
      helpful: prevState.helpful + 1
    })))
  }

  incrementNotHelpful() {
    const product = this.slugify(this.props.productName)
    axios.put(`/product/${this.props.productId}/${product}/${this.props.questionId}/${this.props.id}/answer-not-helpful`)
    .then(res => this.props.updateQuestions(res.data.questions))
    .then(() => this.setState(prevState => ({
      notHelpful: prevState.notHelpful + 1
    }))) 
  }

  reportAsInAppropriate() {
    const product = this.slugify(this.props.productName)
    axios.put(`/product/${this.props.productId}/${product}/${this.props.questionId}/${this.props.id}/answer-inappropriate`)
    .then(res => this.props.updateQuestions(res.data.questions))
    .then(() => this.setState({
      reportContent: 'Reported answer'
    }))
  }

  render() {
    return (
      <div className="answer-dynamic-single">
        <div className="answer-dynamic-header">
          <span className="answer-dynamic-name">{this.props.name}</span>
          <span className="answer-dynamic-dot">·</span>
          <span className="answer-dynamic-date">{moment(this.props.createdAt).fromNow()}</span>
        </div>
        <div className="answer-dynamic-body">{this.props.answer}</div>
        <div className="answer-dynamic-footer-buttons">
          <div className="answer-dynamic-footer-buttons-word">Helpful?</div>
          <div className="answer-dynamic-footer-buttons-yes" onClick={this.incrementHelpful}>Yes · {this.state.helpful}</div>
          <div className="answer-dynamic-footer-buttons-no" onClick={this.incrementNotHelpful}>No · {this.state.notHelpful}</div>
          <div className="answer-dynamic-footer-buttons-report" onClick={this.reportAsInAppropriate}>{this.state.reportContent}</div>
        </div>
      </div>
    )
  }
}

export default Answers