// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FuelSavingsApp from '../components/FuelSavingsApp';
import * as reversiActions from '../actions/reversiActions';
import Board from "../components/Board";


class App extends React.Component {
  render() {
    console.log("render app");
    const { board, actions } = this.props;

    return (
        <Board board={board} actions={actions} />
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  console.log("state ", state);
  return {
    board: state.reversiGameState
  };
}

function mapDispatchToProps(dispatch) {
  console.log("dispatch ", dispatch);
  return {
    actions: bindActionCreators(reversiActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
