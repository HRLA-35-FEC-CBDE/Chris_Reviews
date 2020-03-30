import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starPercentage: this.props.rating / 5 * 100,
      helpful: this.props.helpful,
      notHelpful: this.props.notHelpful,
      report: this.props.report,
    }
    this.conditionalRenderRecommended = this.conditionalRenderRecommended.bind(this);
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
            <div className="review-dynamic-star-rating-top" style={{width: this.state.starPercentage}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            <div className="review-dynamic-star-rating-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
          </div>
          <div className="review-dynamic-name"> {this.props.name} </div>
          <div className="review-dynamic-dot">·</div>
          <div className="review-dynamic-date">{moment(`${this.props.createdAt}`, "YYYYMMDD").fromNow()}</div>
        </div>
        <div className="review-dynamic-title">{this.props.title}</div>
        <div className="review-dynamic-body">{this.props.body}</div>
        <div>
          {this.conditionalRenderRecommended()}
        </div>
        <div className="review-dynamic-footer-buttons">
          <div className="review-dynamic-footer-buttons-word">Helpful?</div>
          <div className="review-dynamic-footer-buttons-yes">Yes · {this.state.helpful}</div>
          <div className="review-dynamic-footer-buttons-no">No · {this.state.notHelpful}</div>
          <div className="review-dynamic-footer-buttons-report">Report as inappropriate</div>
        </div>
      </div>
    )
  }
}

export default Review;