import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from 'reducers/change-screens';
import { DASHBOARD } from 'types/common';
import { Session as SessionProp} from 'types/prop-types';
import AskQuestion from './ask-question';
import { askQuestion } from 'reducers/session';
import { map, isNil, prop, sortBy, compose, values, reverse } from 'ramda';

const Session = ({
  id,
  name,
  locked,
  me,
  answerer,
  questioners,
  questions,
  loading,
  leave,
  askQuestion
}) => (
  <div className='session'>
    <div className='header'>
      <p>{id} - {name} - {locked}</p>
      <p>by {answerer.name}</p>
      <p>You are {me.type} {me.id}, {me.name}</p>
    </div>
    <AskQuestion askQuestion={askQuestion} />
    <ul className='questions'>
      {compose(map(({
        questionId,
        questionVotes,
        questionText,
        questionAnswered
      }) => (
        <li key={questionId} className='question'>
          {questionText} - {questionVotes} votes - {questionAnswered ? 'Answered' : 'Not Answered'}
        </li>
      )), reverse, sortBy(prop('questionVotes')), values)(questions)}
    </ul>
    <ul className='questioners'>
      {map(({
        questionerId,
        name
      }) => (
        <li key={questionerId} className='questioner'>
          {isNil(name) ? 'Anonymous' : name}
        </li>
      ), questioners)}
    </ul>
    <button onClick={leave}>Leave Session</button>
  </div>
);

Session.propTypes = SessionProp.isRequired;

const mapStateToProps = (state) => (state.session);
const mapDispatchToProps = (dispatch) => ({
  leave: () => dispatch(changeScreen(DASHBOARD)),
  askQuestion: compose(dispatch, askQuestion)
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
