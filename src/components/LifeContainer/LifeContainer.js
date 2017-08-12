import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LifeBoard from '../LifeBoard/LifeBoard';
import './LifeContainer.css';
import { resetBoard, play, step, toggleCellStartValue } from '../../actions';
import { tickDelay } from '../../settings';

class LifeContainer extends Component {
  constructor(props) {
    super(props);
    this.handleStep = this.handleStep.bind(this);
    this.handleResetBoard = this.handleResetBoard.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isPlaying && this.props.isPlaying) {
      this.runSteps();
    }
  }

  runSteps() {
    this.props.step();
    if (this.props.isPlaying && !this.props.isConcluded) {
      setTimeout(this.runSteps.bind(this), tickDelay);
    }
  }

  handlePlay(e) {
    e.preventDefault();
    if (!this.props.isConcluded) {
      this.props.play();
    }
  }

  handleResetBoard(e) {
    e.preventDefault();
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
    const handlePlay = this.handlePlay;
    const concludedMessage = this.props.isConcluded ? 'concluded' : '';
    return (
      <div className="LifeContainer">
        <a onClick={handleStep} role="button" tabIndex="0">
          step
        </a>
        &nbsp;
        <a onClick={handlePlay} role="button" tabIndex="0">
          <span className="glyphicon glyphicon-play" aria-label="Play" />
          play
        </a>
        <a onClick={handleResetBoard} role="button" tabIndex="0">
          reset
        </a>
        <div>{concludedMessage}</div>
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
  isConcluded: state.life.isConcluded,
  isPlaying: state.life.isPlaying
});

const mapDispatchToProps = dispatch => ({
  play: () => dispatch(play()),
  step: () => dispatch(step()),
  resetBoard: () => dispatch(resetBoard())
});

LifeContainer.defaultProps = {
  board: null,
  isConcluded: false,
  isPlaying: false
};

LifeContainer.propTypes = {
  play: PropTypes.func.isRequired,
  step: PropTypes.func.isRequired,
  resetBoard: PropTypes.func.isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  isConcluded: PropTypes.bool,
  isPlaying: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(LifeContainer);
