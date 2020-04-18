import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';
import AnswerModalAnswers from './AnswerModalAnswers.jsx';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerInvalid: false,
      classNameAnswerWord: 'answer-modal-answer-word',
      classNameAnswerInput: 'answer-modal-answer-text-area',
      nameInvalid: false,
      classNameNameWord: 'answer-modal-name-word',
      classNameNameInput: 'answer-modal-name-input',
      emailInvalid: false,
      classNameEmailWord: 'answer-modal-email-word',
      classNameEmailInput: 'answer-modal-email-input',
      classNameTerms: 'answer-modal-terms',
      checkboxInvalid: false
    }
    this.submitHandler = this.submitHandler.bind(this);
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

  submitHandler(event) {
    event.preventDefault();
    const textAreaValidity = document.forms[0].elements[0].validity.valueMissing;
    const nameInputValidity = document.forms[0].elements[1].validity.valueMissing;
    const emailInputValidity = document.forms[0].elements[3].validity.valueMissing || document.forms[0].elements[3].validity.typeMismatch
    const checkboxValidity = document.forms[0].elements[4].validity.valueMissing;
    if (nameInputValidity) {
        this.setState({
          classNameNameWord: 'answer-modal-name-word-invalid',
          classNameNameInput: 'answer-modal-name-input-invalid',
          nameInvalid: true
        })
      } else {
        this.setState({
          classNameNameWord: 'answer-modal-name-word',
          classNameNameInput: 'answer-modal-name-input',
          nameInvalid: false,
        })
      }
      if (textAreaValidity) {
        this.setState({
          classNameAnswerInput: 'answer-modal-answer-text-area-invalid',
          classNameAnswerWord: 'answer-modal-answer-word-invalid',
          answerInvalid: true
        })
      } else {
        this.setState({
          classNameAnswerInput: 'answer-modal-answer-text-area',
          classNameAnswerWord: 'answer-modal-answer-word',
          answerInvalid: false
        })
      }
      if (emailInputValidity) {
        this.setState({
          classNameEmailInput: 'answer-modal-email-input-invalid',
          classNameEmailWord: 'answer-modal-email-word-invalid',
          emailInvalid: true
        })
      } else {
        this.setState({
          classNameEmailInput: 'answer-modal-email-input',
          classNameEmailWord: 'answer-modal-email-word',
          emailInvalid: false
        })
      }
      if (checkboxValidity) {
        this.setState({
          classNameTerms: 'answer-modal-terms-invalid',
          checkboxInvalid: true
        })
      } else {
        this.setState({
          classNameTerms: 'answer-modal-terms',
          checkboxInvalid: false
        })
      }
      
      if (!event.target.checkValidity()) {
        return;
      } else {
        const data = new FormData(event.target)
        const product = this.slugify(this.props.productName)
        const obj = {}
        for (var pair of data.entries()) {
          obj[pair[0]] = pair[1];
        }
        axios.put(`/product/${this.props.productId}/${product}/${this.props.questionId}/add-answer`, obj)
        .then((res) => this.props.updateQuestions(res.data.questions))
        .then(() => this.props.sortQuestions())
        .then(() => this.props.toggleAnswerModal())
      }
  }

  render() {
    return (
        <div className="answer-modal-overlay">
          <div className="answer-modal-main">
            <div className="answer-modal-close-button" onClick={this.props.toggleAnswerModal}>
              <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
            </div>
            <h2 className="answer-modal-header-title">
              Post answer
            </h2>
            <div className="answer-modal-body">
              <div className="answer-modal-question-header">
                <div> 
                  <span className="answer-modal-question-name">{this.props.questionName}</span>
                  <span className="answer-modal-question-dot">·</span>
                  <span className="answer-modal-question-date">{moment(this.props.questionCreatedAt).fromNow()}</span>
                </div>
                <div>
                  <div className="answer-modal-count">
                    {this.props.questionAnswerCount}
                  </div>
                  {this.props.questionAnswerCount !== 1 ?
                    <div className="answer-modal-answers-word">
                      answers
                    </div>
                    :
                    <div className="answer-modal-answers-word">
                      answer
                    </div>
                  }
                </div>
              </div>
              <div className="answer-modal-question-body">
                {this.props.questionBody}
              </div>
              <div className="write-modal-answer-main">
                {this.props.answers.map((answer, index) => (
                  <AnswerModalAnswers
                    key={index}
                    name={answer.name}
                    createdAt={this.props.createdAt}
                    answer={answer.answer}
                    productId={this.props.productId}
                    questionId={this.props.questionId}
                    id={answer._id}
                    productName={this.props.productName}
                    helpful={answer.helpful}
                    notHelpful={answer.notHelpful}
                    updateQuestions={this.props.updateQuestions}
                  />
                ))}
              </div>
              <div className="answer-modal-required-disclaimer">
                Required fields are marked with *
              </div>
              <div className="answer-modal-form-container">
                <form className="answer-modal-form" onSubmit={this.submitHandler} noValidate>
                  <div className="answer-modal-answer-header">
                    <label className={this.state.classNameAnswerWord}>
                      Answer*
                    </label>
                    {this.state.answerInvalid &&
                      <div className="answer-modal-answer-required">
                        Required <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                      </div>
                    }
                  </div>
                  <textarea className={this.state.classNameAnswerInput} rows={6} maxLength={255} placeholder="Answer the question..." type="text" name="answer" required/>
                  <div className="answer-modal-name-location-section">
                    <div className="answer-modal-name-location-left-child">
                      <div className="answer-modal-name-header">
                        <label className={this.state.classNameNameWord}>
                          Nickname*
                        </label>
                        {this.state.nameInvalid &&
                          <div className="answer-modal-name-required">
                            Required <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                          </div>
                        }
                      </div>
                      <input className={this.state.classNameNameInput} type="text" name="name" placeholder="Example: jackie27" maxLength={50} required></input>
                    </div>
                    <div className="answer-modal-name-location-right-child">
                      <label className="answer-modal-location-word">
                        Location
                      </label>
                      <input className="answer-modal-location-input" type="text" placeholder="Example: Seattle, WA" name="location" maxLength={50}/>
                    </div>
                  </div>
                  <div className="answer-modal-email-section">
                    <div className="answer-modal-email-container">
                      <div className="answer-modal-email-header">
                        <label className={this.state.classNameEmailWord}>
                          Email*
                        </label>
                        {this.state.emailInvalid &&
                          <div className="answer-modal-email-required">
                            Required <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                          </div>
                        }
                      </div>
                      <input className={this.state.classNameEmailInput} type="email" name="email" placeholder="Example: youremail@example.com" maxLength={50} required></input>
                    </div>
                  </div>
                  <div className="answer-modal-checkbox-section">
                    <div>
                      <input type="checkbox" required></input><span className={this.state.classNameTerms}>I agree to the <a href={''}>terms &amp; conditions</a>.</span>
                    </div>
                    {this.state.checkboxInvalid &&
                      <div className="answer-modal-checkbox-required">
                        Required <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                      </div>
                    }
                  </div>
                  <div className="answer-modal-bottom-disclaimer">
                    You may receive emails regarding this submission. Any emails will include the ability to opt out of future communications.
                  </div>
                  <div>
                    <input className="answer-submit-button" type="submit" value="Post answer"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default AnswerModal
