import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: this.props.helpful,
      notHelpful: this.props.notHelpful,
      reportContent: 'Report as inappropriate'
    }
    this.conditionalRenderRecommended = this.conditionalRenderRecommended.bind(this);
    this.incrementHelpful = this.incrementHelpful.bind(this);
    this.incrementNotHelpful = this.incrementNotHelpful.bind(this);
    this.reportAsInAppropriate = this.reportAsInAppropriate.bind(this);
    this.slugify = this.slugify.bind(this);
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
    console.log(this.props)
    const product = this.slugify(this.props.productName)
    axios.put(`/product/${this.props.productId}/${product}/${this.props.reviewId}/review-helpful`)
    .then(res => this.props.updateProduct(res.data))
    .then(() => {
      this.setState(prevState => ({
        helpful: prevState.helpful + 1
      }))
    })
  }

  incrementNotHelpful() {
    const product = this.slugify(this.props.productName)
    axios.put(`/product/${this.props.productId}/${product}/${this.props.reviewId}/review-not-helpful`)
    .then(res => this.props.updateProduct(res.data))
    .then(() => {
      this.setState(prevState => ({
        notHelpful: prevState.notHelpful + 1
      }))
    })
  }

  reportAsInAppropriate() {
    const product = this.slugify(this.props.productName)
    axios.put(`/product/${this.props.productId}/${product}/${this.props.reviewId}/inappropriate`)
    .then(res => this.props.updateProduct(res.data))
    .then(() => this.setState({
      reportContent: 'Reported Review'
    }))
  }

  conditionalRenderRecommended() {
    if (this.props.recommended) {
      return (
        <span className="review-dynamic-recommended"><FontAwesomeIcon icon={faTimesCircle}/> No, I don't recommend this product.</span>
      )
    } else {
      return (
        <span className="review-dynamic-recommended"><FontAwesomeIcon icon={faCheckCircle}/> Yes, I recommend this product.</span>
      )
    }
  }

  render() {
    return (
      <div className="review-dynamic-single">
        <div className="review-dynamic-header">
          <div className="review-dynamic-star-rating">
            <div className="review-dynamic-star-rating-top" style={{width: this.props.rating / 5 * 100}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            <div className="review-dynamic-star-rating-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
          </div>
          <div className="review-dynamic-name"> {this.props.name} </div>
          <div className="review-dynamic-dot">·</div>
          <div className="review-dynamic-date">{moment(this.props.createdAt).fromNow()}</div>
        </div>
        <div className="review-dynamic-title">{this.props.title}</div>
        <div className="review-dynamic-body">{this.props.body}</div>
        <div>
          {this.conditionalRenderRecommended()}
        </div>
        <div className="review-dynamic-footer-buttons">
          <div className="review-dynamic-footer-buttons-word">Helpful?</div>
          <div className="review-dynamic-footer-buttons-yes" onClick={this.incrementHelpful}>Yes · {this.state.helpful}</div>
          <div className="review-dynamic-footer-buttons-no" onClick={this.incrementNotHelpful}>No · {this.state.notHelpful}</div>
          <div className="review-dynamic-footer-buttons-report" onClick={this.reportAsInAppropriate}>{this.state.reportContent}</div>
        </div>
      </div>
    )
  }
}

export default Review;


