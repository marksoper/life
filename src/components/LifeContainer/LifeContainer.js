import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LifeBoard from '../LifeBoard/LifeBoard';
import './LifeContainer.css';
import { resetBoard, step, toggleCellStartValue } from '../../actions';

class LifeContainer extends Component {
  constructor(props) {
    super(props);
    this.handleStep = this.handleStep.bind(this);
    this.handleResetBoard = this.handleResetBoard.bind(this);
  }

  handleResetBoard() {
    this.props.resetBoard();
  }

  handleStep(e) {
    e.preventDefault();
    this.props.step();
  }

  render() {
    const board = this.props.board;
    const handleStep = this.handleStep;
    const handleResetBoard = this.handleResetBoard;
    const concludedMessage = this.props.isConcluded ? 'concluded' : '';
    return (
      <div className="LifeContainer">
        <a onClick={handleStep} role="button" tabIndex="0">
          step
        </a>
        &nbsp;
        <a onClick={handleResetBoard} role="button" tabIndex="0">
          reset
        </a>
        <div>
          {concludedMessage}
        </div>
        <div>
          <LifeBoard
            board={board}
            toggleCellStartValue={toggleCellStartValue}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: state.life.board,
  isConcluded: state.life.isConcluded
});

const mapDispatchToProps = dispatch => ({
  step: () => dispatch(step()),
  resetBoard: () => dispatch(resetBoard())
});

LifeContainer.defaultProps = {
  board: null,
  isConcluded: false
};

LifeContainer.propTypes = {
  step: PropTypes.func.isRequired,
  resetBoard: PropTypes.func.isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  isConcluded: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(LifeContainer);
