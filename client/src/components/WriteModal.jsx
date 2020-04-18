import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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
      yesRecommendButton: 'write-modal-recommended-yes-button-deselected',
      noRecommendButton: 'write-modal-recommended-no-button-deselected',
      recommend: null,
      classNameNicknameInput: 'write-modal-name-input',
      classNameNicknameWord: 'write-modal-name',
      name: '',
      nameInvalid: false,
      classNameLocation: '',
      location: '',
      locationInvalid: false,
      classNameEmailWord: 'write-modal-email-word',
      classNameEmailInput: 'write-modal-email-input',
      email: '',
      emailInvalid: false,
      feedback: '',
      classNameTerms: 'write-modal-terms',
      checkboxInvalid: false,
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
    this.recommendButtonHandler = this.recommendButtonHandler.bind(this);
    this.slugify = this.slugify.bind(this);
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
    if (this.state.name.length === 0) {
      this.setState({
        nameInvalid: true,
        classNameNicknameWord: 'write-modal-name-invalid',
        classNameNicknameInput: 'write-modal-name-input-invalid'
      })
    } else {
      this.setState({
        nameInvalid: false,
        classNameNicknameWord: 'write-modal-name',
        classNameNicknameInput: 'write-modal-name-input'
      })
    }
    if (this.state.email.length === 0 || !this.state.email.includes('@')) {
      this.setState({
        emailInvalid: true,
        classNameEmailWord: 'write-modal-email-word-invalid',
        classNameEmailInput: 'write-modal-email-input-invalid'
      })
    } else {
      this.setState({
        emailInvalid: false,
        classNameEmailWord: 'write-modal-email-word',
        classNameEmailInput: 'write-modal-email-input'
      })
    }
    var input = document.getElementsByClassName("write-modal-checkbox");
    var checkboxValidity = input[0].validity.valueMissing;
    if (checkboxValidity) {
      this.setState({
        checkboxInvalid: true,
        classNameTerms: 'write-modal-terms-invalid'
      })
    } else {
      this.setState({
        checkboxInvalid: false,
        classNameTerms: 'write-modal-terms'
      })
    }
    var allValid = !!this.state.ratingWordPermanent && this.state.title.length !== 0 && 
      this.state.review.length !== 0 && this.state.name.length !== 0 && 
      this.state.email.length !== 0 && this.state.email.includes('@') && 
      !checkboxValidity
    
    if (allValid) {
      var slugifiedProduct = this.slugify(this.props.product);
      var newReview = {
        name: this.state.name,
        email: this.state.email,
        location: this.state.location,
        rating: Number(this.state.rating),
        title: this.state.title,
        review: this.state.review,
        recommend: this.state.recommend,
        feedback: this.state.feedback
      }
      console.log(slugifiedProduct)
      console.log(newReview)
      axios.put(`/product/${this.props.id}/${slugifiedProduct}`, newReview)
      .then(res => this.props.updateProduct(res.data))
      .then(() => this.props.updateFilters())
      .then(() => this.props.toggleWriteModal())
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

  toggleRating(event) {
    var val = event.target.attributes.value.value;
    var word = event.target.getAttribute("name");
    if (val === '1') {
      this.setState({
        starOne: 'red',
        starTwo: 'lightgray',
        starThree: 'lightgray',
        starFour: 'lightgray',
        starFive: 'lightgray',
        ratingWordPermanent: word,
        rating: val
      })
    }
    if (val === '2') {
      this.setState({
        starOne: 'orange',
        starTwo: 'orange',
        starThree: 'lightgray',
        starFour: 'lightgray',
        starFive: 'lightgray',
        ratingWordPermanent: word,
        rating: val
      })
    }
    if (val === '3') {
      this.setState({
        starOne: 'yellow',
        starTwo: 'yellow',
        starThree: 'yellow',
        starFour: 'lightgray',
        starFive: 'lightgray',
        ratingWordPermanent: word,
        rating: val
      })
    }
    if (val === '4') {
      this.setState({
        starOne: 'greenyellow',
        starTwo: 'greenyellow',
        starThree: 'greenyellow',
        starFour: 'greenyellow',
        starFive: 'lightgray',
        ratingWordPermanent: word,
        rating: val
      })
    }
    if (val === '5') {
      this.setState({
        starOne: 'darkgreen',
        starTwo: 'darkgreen',
        starThree: 'darkgreen',
        starFour: 'darkgreen',
        starFive: 'darkgreen',
        ratingWordPermanent: word,
        rating: val
      })
    }
  }

  changeHandler(event) {
    const { target } = event
    this.setState({
      [target.name]: target.value
    })
  }

  recommendButtonHandler(event) {
    const { target } = event
    if (target.getAttribute("name") === 'yes') {
      this.setState({
        yesRecommendButton: 'write-modal-recommended-yes-button-selected',
        noRecommendButton: 'write-modal-recommended-no-button-deselected',
        recommend: true
      })
    } else {
      this.setState({
        yesRecommendButton: 'write-modal-recommended-yes-button-deselected',
        noRecommendButton: 'write-modal-recommended-no-button-selected',
        recommend: false
      })
    }
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
                  <div className="write-modal-recommended-left-child">
                    Would you recommend this product to a friend?
                  </div>
                  <div className="write-modal-recommended-right-child">
                    <span onClick={this.recommendButtonHandler} name="yes" className={this.state.yesRecommendButton}>Yes</span>
                    <span onClick={this.recommendButtonHandler} name="no" className={this.state.noRecommendButton}>No</span>
                  </div>
                </div>
                <div className="write-modal-nickname-location-section">
                  <div className="write-modal-nickname-location-section-left-child">
                    <div className="write-modal-nickname-header">
                      <div className={this.state.classNameNicknameWord}>
                        Nickname*
                      </div>
                      {this.state.nameInvalid &&
                        <div className="write-modal-require-name">
                          Required <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                        </div>
                      }
                    </div>
                    <input onChange={this.changeHandler} name="name" maxLength="40" value={this.state.name} className={this.state.classNameNicknameInput} placeholder="Example: jackie27" type="text"></input>
                  </div>
                  <div className="write-modal-nickname-location-section-right-child">
                    <div className="write-modal-location">
                      Location
                    </div>
                    <input onChange={this.changeHandler} name="location" maxLength="40" value={this.state.location} className="write-modal-location-input" placeholder="Example: Seattle, WA" type="text"></input>
                  </div>
                </div>
                <div className="write-modal-email-section">
                  <div className="write-modal-email-header">
                    <div className={this.state.classNameEmailWord}>
                      Email*
                    </div>
                    {this.state.emailInvalid &&
                      <div className="write-modal-require-email">
                        Required <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                      </div>
                    }
                  </div>
                  <input onChange={this.changeHandler} name="email" maxLength="75" value={this.state.email} className={this.state.classNameEmailInput} placeholder="Example: youremail@example.com" type="email"></input>
                </div>
                <div className="write-modal-feedback">
                  <div className="write-modal-feedback-sentence">
                  What feedback do you have for the people who designed and manufactured this product?
                  </div>
                  <textarea onChange={this.changeHandler} className="write-modal-feedback-text-area" rows={6} maxLength={1000} placeholder="Write your feedback here..." type="text" value={this.state.feedback} name="feedback"/>
                </div>
                <div className="write-model-checkbox-section">
                  <div className="write-modal-checkbox-section-header">
                    <div>
                      <input className="write-modal-checkbox" type="checkbox" required></input>
                      <span className={this.state.classNameTerms}>I agree to the <a href={''}>terms &amp; conditions</a>.</span>
                    </div>
                    {this.state.checkboxInvalid &&
                      <div className="write-modal-require-terms">
                        Required <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                      </div>
                    }
                  </div>
                </div>
                <div className="write-modal-bottom-disclaimer">
                You may receive emails regarding this submission. Any emails will include the ability to opt out of future communications.
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
