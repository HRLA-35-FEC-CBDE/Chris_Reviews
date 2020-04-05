import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Answers from './Answers.jsx';


const Questions = (props) => {
  return (
    <div>
      <div className="question-dynamic-single">
        <div className="question-dynamic-header">
          <span className="question-dynamic-name"> {props.name} </span>
          <span className="question-dynamic-dot">·</span>
          <span className="question-dynamic-date">{moment(props.createdAt).fromNow()}</span>
        </div>
        <div className="question-dynamic-answer-count">
          <div className="question-dynamic-answer-count-number">{props.answers.length}</div>
          <div className="question-dynamic-answer-word">answers</div>
        </div>
      </div>
      <div className="question-dynamic-title">
        {props.body}
      </div>
      <div className="question-dynamic-footer-button">
        <div className="question-dynamic-footer-button-answer">Answer the question</div>
      </div>
      <div>
        {props.answers.map((answer, index) => (
          <Answers 
            name={answer.name}
            id={answer._id}
            questionId={props.id}
            createdAt={answer.createdAt}
            answer={answer.answer}
            helpful={answer.helpful}
            notHelpful={answer.notHelpful}
            report={answer.report}
            key={index}
            productName={props.productName}
            productId={props.productId}
          />
        ))}
      </div>
    </div>
  )
}


export default Questions