import { connect } from 'react-redux';

import Greeting from './navbar';
import { logout } from '../../actions/session_actions';

const mSTP = ({session, entities: {users}}) => {
  return {
    currentUser: users[session.id]
  };
};

const mDTP = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Greeting)