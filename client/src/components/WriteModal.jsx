import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

class WriteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingInvalid: false,
      titleInvalid: false,
      reviewInvalid: false,
      classNameReviewTitle: 'write-modal-title-word',
      classNameReviewTitleInput: 'write-modal-title-input',
      title: '',
      ratingWordTemp: 'Click to rate',
      classNameRatingWord: 'write-modal-product-rating-word',
      ratingWordPermanent: null,
      rating: null,
      review: '',
      classNameReviewBodyWord: 'write-modal-review-body-word',
      classNameReviewBodyInput: 'write-modal-review-body-input',
      starOne: '',
      starTwo: '',
      starThree: '',
      starFour: '',
      starFive: ''
    }
    this.updateRating = this.updateRating.bind(this);
    this.toggleRating = this.toggleRating.bind(this);
    this.resetRating = this.resetRating.bind(this);
    this.validate = this.validate.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  validate() {
    if (!this.state.ratingWordPermanent) {
      this.setState({
        ratingInvalid: true,
        classNameRatingWord: 'write-modal-product-rating-word-invalid'
      })
    } else {
      this.setState({
        ratingInvalid: false,
        classNameRatingWord: 'write-modal-product-rating-word'
      })
    }
    if (this.state.title.length === 0) {
      this.setState({
        titleInvalid: true,
        classNameReviewTitle: 'write-modal-title-word-invalid',
        classNameReviewTitleInput: 'write-modal-title-input-invalid'
      })
    } else {
      this.setState({
        titleInvalid: false,
        classNameReviewTitle: 'write-modal-title-word',
        classNameReviewTitleInput: 'write-modal-title-input'
      })
    }
    if (this.state.review.length === 0) {
      this.setState({
        reviewInvalid: true,
        classNameReviewBodyWord: 'write-modal-review-body-word-invalid',
        classNameReviewBodyInput: 'write-modal-review-body-input-invalid'
      })
    } else {
      this.setState({
        reviewInvalid: false,
        classNameReviewBodyWord: 'write-modal-review-body-word',
        classNameReviewBodyInput: 'write-modal-review-body-input'
      })
    }
  }

  toggleRating(event) {
    var val = event.target.attributes.value.value;
    var word = event.target.getAttribute("name")
    console.log(val)
    if (val === '1') {
      this.setState({
        starOne: 'red',
        starTwo: 'lightgray',
        starThree: 'lightgray',
        starFour: 'lightgray',
        starFive: 'lightgray',
        ratingWordPermanent: word
      })
    }
    if (val === '2') {
      this.setState({
        starOne: 'orange',
        starTwo: 'orange',
        starThree: 'lightgray',
        starFour: 'lightgray',
        starFive: 'lightgray',
        ratingWordPermanent: word
      })
    }
    if (val === '3') {
      this.setState({
        starOne: 'yellow',
        starTwo: 'yellow',
        starThree: 'yellow',
        starFour: 'lightgray',
        starFive: 'lightgray',
        ratingWordPermanent: word
      })
    }
    if (val === '4') {
      this.setState({
        starOne: 'greenyellow',
        starTwo: 'greenyellow',
        starThree: 'greenyellow',
        starFour: 'greenyellow',
        starFive: 'lightgray',
        ratingWordPermanent: word
      })
    }
    if (val === '5') {
      this.setState({
        starOne: 'darkgreen',
        starTwo: 'darkgreen',
        starThree: 'darkgreen',
        starFour: 'darkgreen',
        starFive: 'darkgreen',
        ratingWordPermanent: word
      })
    }
  }

  changeHandler(event) {
    const { target } = event
    this.setState({
      [target.name]: target.value
    })
  }

  updateRating(event) {
    this.setState({
      ratingWordTemp: event.target.getAttribute("name")
    })
  }

  resetRating(event) {
    if (this.state.starOne.length === 0) {
      this.setState({
        ratingWordTemp: 'Click to rate'
      })
    }
  }

  render() {
    return (
        <div className="write-modal-overlay">
          <div className="write-modal-main">
            <section className="write-modal-container">
              <div className="write-modal-left-child">
                <div className="write-modal-left-child-product-name">
                  {this.props.product}
                </div>
              </div>
              <div className="write-modal-right-child">
                <div className="write-modal-close-button" onClick={this.props.toggleWriteModal}><FontAwesomeIcon icon={faTimesCircle} size="lg"/></div>
                <div className="write-modal-right-child-product-name">
                  My review for {this.props.product}
                </div>
                <div className="write-modal-required-fields-text">
                  Required fields are marked with *
                </div>
                <div className="write-modal-product-rating">
                  <div className={this.state.classNameRatingWord}>
                    Product rating*
                  </div>
                  <div className="write-modal-product-rating-stars">
                    <span className="star" onMouseOut={this.resetRating} onMouseEnter={this.updateRating} onClick={this.toggleRating} style={{color: this.state.starFive}} name="Excellent" rel='darkgreen' value="5">★</span>
                    <span className="star" onMouseOut={this.resetRating} onMouseEnter={this.updateRating} onClick={this.toggleRating} style={{color: this.state.starFour}} name="Good" rel='greenyellow' value="4">★</span>
                    <span className="star" onMouseOut={this.resetRating} onMouseEnter={this.updateRating} onClick={this.toggleRating} style={{color: this.state.starThree}} name="Average" rel='yellow' value="3">★</span>
                    <span className="star" onMouseOut={this.resetRating} onMouseEnter={this.updateRating} onClick={this.toggleRating} style={{color: this.state.starTwo}} name="Fair" rel='orange' value="2">★</span>
                    <span className="star" onMouseOut={this.resetRating} onMouseEnter={this.updateRating} onClick={this.toggleRating} style={{color: this.state.starOne}} name="Poor" rel='red' value="1">★</span>
                  </div>
                  <div className="write-modal-rating-state">
                    {this.state.ratingWordPermanent ? this.state.ratingWordPermanent : this.state.ratingWordTemp}
                  </div>
                  {this.state.ratingInvalid &&
                    <div className="write-modal-require-rating">
                      Required <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                    </div>
                  }
                </div>
                <div className="write-modal-title-section">
                  <div className="write-modal-title-section-header">
                    <div className={this.state.classNameReviewTitle}>
                      Review title*
                    </div >
                    {this.state.titleInvalid &&
                      <div className="write-modal-require-title">
                        Required <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                      </div>
                    }
                  </div>
                  <input onChange={this.changeHandler} name="title" maxLength="75" value={this.state.title} className={this.state.classNameReviewTitleInput} placeholder="Example: Makes hiking even easier" type="text"></input>
                </div>
                <div className="write-modal-review-section">
                  <div className="write-modal-review-section-header">
                    <div className={this.state.classNameReviewBodyWord}>
                      Review*
                    </div>
                    {this.state.reviewInvalid &&
                      <div className="write-modal-require-review">
                        Required <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                      </div>
                    }
                  </div>
                  <textarea onChange={this.changeHandler} className={this.state.classNameReviewBodyInput} rows={6} maxLength={1000} placeholder="Write your review here..." type="text" value={this.state.review} name="review"/>
                </div>
                <div className="write-modal-recommended-section">
                  <div className="write-modal-recommended-right-child">
                    Would you recommend this product to a friend?
                  </div>
                  <div>
                    <span className="write-modal-recommended-yes-button">Yes</span>
                    <span className="write-modal-recommended-no-button">No</span>
                  </div>
                </div>
                <div onClick={this.validate} className="write-modal-post-button">
                  Post review
                </div>
              </div>
            </section>
          </div>
        </div>
    )
  }
}

export default WriteModal
