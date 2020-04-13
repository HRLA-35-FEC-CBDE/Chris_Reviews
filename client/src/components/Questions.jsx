import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Answers from './Answers.jsx';
import AnswerModal from './AnswerModal.jsx';


class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerModelOn: false
    }
    this.toggleAnswerModal = this.toggleAnswerModal.bind(this)
  }

  toggleAnswerModal() {
    this.setState(prevState => ({
      answerModalOn: !prevState.answerModalOn
    }))
  }

  render() {

    return (
      <div>
        <div className="question-dynamic-single">
          <div className="question-dynamic-header">
            <span className="question-dynamic-name"> {this.props.name} </span>
            <span className="question-dynamic-dot">·</span>
            <span className="question-dynamic-date">{moment(this.props.createdAt).fromNow()}</span>
          </div>
          <div className="question-dynamic-answer-count">
            <div className="question-dynamic-answer-count-number" onClick={this.toggleAnswerModal}>{this.props.answers.length}</div>
            <div className="question-dynamic-answer-word" onClick={this.toggleAnswerModal}>answers</div>
          </div>
        </div>
        <div className="question-dynamic-title" onClick={this.toggleAnswerModal}>
          {this.props.body}
        </div>
        <div className="question-dynamic-footer-button">
          <div className="question-dynamic-footer-button-answer" onClick={this.toggleAnswerModal}>Answer the question</div>
        </div>
        {this.state.answerModalOn && 
            <div>
              <AnswerModal toggleAnswerModal={this.toggleAnswerModal}/>
            </div>
          }
        <div>
          {this.props.answers.map((answer, index) => (
            <Answers 
              name={answer.name}
              id={answer._id}
              questionId={this.props.id}
              createdAt={answer.createdAt}
              answer={answer.answer}
              helpful={answer.helpful}
              notHelpful={answer.notHelpful}
              report={answer.report}
              key={index}
              productName={this.props.productName}
              productId={this.props.productId}
              updateQuestions={this.props.updateQuestions}
            />
          ))}
        </div>
      </div>
    )
  }
}


export default Questions