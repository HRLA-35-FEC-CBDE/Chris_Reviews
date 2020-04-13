import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

class WriteQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalid: false,
      nameInputValidity: false,
      textAreaValidity: false,
      emailInputValidity: false,
      checkboxValidity: false,
      inputClassNameInput: 'ask-question-nickname-input',
      inputClassNameWord: 'ask-question-nickname',
      textAreaClassNameInput: 'ask-question-text-area',
      textAreaClassNameWord: 'ask-question-question-word',
      emailClassNameWord: 'ask-question-email-word',
      emailClassNameInput: 'ask-question-email-input',
      termsClassName: 'question-terms-and-conditions'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.slugify = this.slugify.bind(this);
  }

  slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
    return str
  }

  handleSubmit(event) {
    event.preventDefault();
    const textAreaValidity = document.forms[0].elements[0].validity.valueMissing;
    const nameInputValidity = document.forms[0].elements[1].validity.valueMissing;
    const emailInputValidity = document.forms[0].elements[3].validity.valueMissing || document.forms[0].elements[3].validity.typeMismatch
    const checkboxValidity = document.forms[0].elements[4].validity.valueMissing;
    if (nameInputValidity) {
        this.setState({
          inputClassNameInput: 'ask-question-nickname-input-invalid',
          inputClassNameWord: 'ask-question-nickname-invalid',
          nameInputValidity: true
        })
      } else {
        this.setState({
          inputClassNameInput: 'ask-question-nickname-input',
          inputClassNameWord: 'ask-question-nickname',
          nameInputValidity: false
        })
      }
      if (textAreaValidity) {
        this.setState({
          textAreaClassNameInput: 'ask-question-text-area-invalid',
          textAreaClassNameWord: 'ask-question-question-word-invalid',
          textAreaValidity: true
        })
      } else {
        this.setState({
          textAreaClassNameInput: 'ask-question-text-area',
          textAreaClassNameWord: 'ask-question-question-word',
          textAreaValidity: false
        })
      }
      if (emailInputValidity) {
        this.setState({
          emailClassNameInput: 'ask-question-email-input-invalid',
          emailClassNameWord: 'ask-question-email-word-invalid',
          emailInputValidity: true
        })
      } else {
        this.setState({
          emailClassNameInput: 'ask-question-email-input',
          emailClassNameWord: 'ask-question-email-word',
          emailInputValidity: false
        })
      }
      if (checkboxValidity) {
        this.setState({
          termsClassName: 'question-terms-and-conditions-invalid',
          checkboxValidity: true
        })
      } else {
        this.setState({
          termsClassName: 'question-terms-and-conditions',
          checkboxValidity: false
        })
      }
      
      if (!event.target.checkValidity()) {
        this.setState({
          invalid: true
        })
        return;
      }
      const data = new FormData(event.target)
      const product = this.slugify(this.props.productName)
      this.setState({
        invalid: false
      })
      const obj = {}
      for (var pair of data.entries()) {
        obj[pair[0]] = pair[1]
      }
      axios.put(`/product/${this.props.productId}/${product}/add-question`, obj)
      .then((res) => this.props.updateQuestions(res.data.questions))
      .then(() => this.props.writeQuestionViewOff())
  }

  render() {
    return (
      <div>
        {this.props.view &&
        <div>
          <div className="ask-question-main">
            <div className="ask-question-header">
              <div className="ask-question-word-container"><h3 className="ask-question-word">Ask a Question</h3></div>
              <div onClick={this.props.writeQuestionViewOff} className="ask-question-x"><FontAwesomeIcon icon={faTimesCircle} size="lg"/></div>
            </div>
          </div>
          <div className="ask-question-disclaimer">Required fields are marked with *</div>
          <div className="ask-question-top-border"></div>
          <div>
          <form className="ask-question-form" onSubmit={this.handleSubmit} noValidate>
            <div className="ask-question-field">
              <div className="ask-question-sub-field-1">
                <label className={this.state.textAreaClassNameWord}>Question*</label>
                <span className="ask-question-sub-field-2">Maximum of 255 characters.</span>
              </div>
              {this.state.textAreaValidity && (
                <span className="ask-question-sub-field-3">
                  Required <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                </span>
              )}
            </div>
            <textarea className={this.state.textAreaClassNameInput} rows={6} maxLength={255} placeholder="Ask a question..." type="text" value={this.state.question} name="question" required/>
            <div className="question-name-block-border"></div>
            <div className="ask-question-name-location-section">
              <div className="ask-question-nickname-block">
                <label className={this.state.inputClassNameWord}>Nickname*</label>
                {this.state.nameInputValidity && (
                  <span className="ask-question-sub-field-4">
                    Required <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                  </span>
                )}
                <input className={this.state.inputClassNameInput} type="text" placeholder="Example: jackie27" name="name" maxLength={50} required/>
              </div>
              <div className="ask-question-location-block">
                  <label className="ask-question-location">Location</label>
                  <input className="ask-question-location-input" type="text" placeholder="Example: Seattle, WA" name="location" maxLength={50}/>
              </div>
            </div>
            <div className="question-email-block-border"></div>
            <div className="ask-question-email-section">
              <div className="ask-question-email-field">
                <div className="ask-question-sub-field-1">
                  <label className={this.state.emailClassNameWord}>Email*</label>
                  {this.state.emailInputValidity && (
                    <span className="ask-question-sub-field-5">
                      Required <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                    </span>
                  )}
                </div>
              </div>
              <input className={this.state.emailClassNameInput} type="email" placeholder="Example: yourname@example.com" name="email" maxLength={25} required/>
            </div>
            <div className="question-email-block-border"></div>
            <div className="question-terms-and-checkbox-block">
              <input className="question-checkbox" type="checkbox" required></input><span className={this.state.termsClassName}>I agree to the <a href={''}>terms &amp; conditions</a>.</span>
              {this.state.checkboxValidity && 
                <span className="ask-question-sub-field-6">
                  Required <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                </span>
              }
            </div>
            <div className="ask-question-bottom-disclaimer">
            You may receive emails regarding this submission. Any emails will include the ability to opt out of future communications.
            </div>
            <div>
              <input className="question-submit-button" type="submit" value="Post question"/>
            </div>
          </form>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default WriteQuestion