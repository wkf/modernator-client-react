import React from 'react';
import { connect } from 'react-redux';
import { curry, compose } from 'ramda';
import { createSession } from 'reducers/session';
import preventDefault from 'lib/prevent-default';
import StatefulForm from 'components/stateful-form';
import { goBack } from 'redux-little-router';
require('styles/new-session.less')

const NewSessionForm = curry((submitSession, cancel, { onSubmit, onChange, topic='' }) =>
  <form className='new-session-form' onSubmit={compose(submitSession, preventDefault(onSubmit))}>
    <div className='topic'>
      <label htmlFor='topic'>Topic</label>
      <input className='topic-input' value={topic} type='text' placeholder='The weather' onChange={onChange('topic')} />
    </div>
    <div className='buttons'>
      <button className='create-session' type='submit'>Create</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  </form>
);

const NewSession = ({ cancel, submitSession }) => (
  <div className='new-session'>
    <StatefulForm form={NewSessionForm(submitSession, cancel)} />
  </div>
);

NewSession.propTypes = {
  submitSession: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  submitSession: compose(dispatch, createSession),
  cancel: () => dispatch(goBack())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSession);
