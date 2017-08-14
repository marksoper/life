import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LifeBoard from '../LifeBoard/LifeBoard';
import './LifeContainer.css';
import {
  resetBoard,
  resizeBoard,
  play,
  pause,
  step,
  toggleCellStartValue
} from '../../actions';
import { tickDelay, maxBoardWidth } from '../../settings';

class LifeContainer extends Component {
  constructor(props) {
    super(props);
    this.handleStep = this.handleStep.bind(this);
    this.handleResetBoard = this.handleResetBoard.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleToggleCellStartValue = this.handleToggleCellStartValue.bind(
      this
    );
    const minDims = props.getMinimumAllowableDimensions(
      this.props.board
    );
    this.state = {
      requestedBoardWidth: this.props.board[0].length,
      minBoardWidth: minDims[0],
      minBoardHeight: minDims[1],
      toggleCellStartValuePending: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.toggleCellStartValuePending) {
      const minDims = this.props.getMinimumAllowableDimensions(
        this.props.board
      );
      this.setState({
        minBoardWidth: minDims[0],
        minBoardHeight: minDims[1],
        toggleCellStartValuePending: false
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isPlaying && this.props.isPlaying) {
      this.runSteps();
    }
  }

  hasStarted() {
    return this.props.generation > 0;
  }

  runSteps() {
    if (this.props.isPlaying && !this.props.isConcluded) {
      this.props.step();
      setTimeout(this.runSteps.bind(this), tickDelay);
    }
  }

  handlePlay(e) {
    e.preventDefault();
    if (!this.props.isConcluded) {
      this.props.play();
    }
  }

  handlePause(e) {
    e.preventDefault();
    this.props.pause();
  }

  handleStep(e) {
    e.preventDefault();
    if (!this.props.isPlaying) {
      this.props.step();
    }
  }

  handleResetBoard(e) {
    e.preventDefault();
    this.props.resetBoard();
  }

  handleWidthChange(e) {
    if (this.hasStarted()) {
      return;
    }
    const requestedBoardWidth = Number(e.target.value);
    this.props.resizeBoard(
      Math.max(
        Math.min(requestedBoardWidth, maxBoardWidth),
        this.props.minBoardWidth
      ),
      this.props.board.length
    );
  }

  handleToggleCellStartValue(r, c) {
    if (!this.hasStarted()) {
      this.setState({
        toggleCellStartValuePending: true
      });
      //
      // Whenever cell start value is changed, we need
      // to recalculate minimum dimensions (after props.board is updated)
      // so that subsequent resizeBoard operations can be validated.
      // This flag can be checked in componentWillReceiveProps to see if that
      // min dims recalc is needed
      //
      this.props.toggleCellStartValue(r, c);
    }
  }

  render() {
    const board = this.props.board;
    const generation = this.props.generation;
    const handlePlay = this.handlePlay;
    const handleStep = this.handleStep;
    const handlePause = this.handlePause;
    const handleResetBoard = this.handleResetBoard;
    const handleWidthChange = this.handleWidthChange;
    const handleToggleCellStartValue = this.handleToggleCellStartValue;
    const concludedMessage = this.props.isConcluded ? 'concluded' : '';
    return (
      <div className="LifeContainer">
        <span>{generation}</span>
        &nbsp;
        <a onClick={handlePlay} role="button" tabIndex="0">
          <span className="glyphicon glyphicon-play" aria-label="Play" />
          play
        </a>
        &nbsp;
        <a onClick={handlePause} role="button" tabIndex="0">
          <span className="glyphicon glyphicon-pause" aria-label="Play" />
          pause
        </a>
        &nbsp;
        <a onClick={handleStep} role="button" tabIndex="0">
          step
        </a>
        &nbsp;
        <a onClick={handleResetBoard} role="button" tabIndex="0">
          reset
        </a>
        &nbsp;
        <span>{concludedMessage}</span>
        &nbsp;
        <form>
          <input
            type="number"
            min={this.props.minBoardWidth}
            max={maxBoardWidth}
            onChange={handleWidthChange}
            value={this.state.requestedBoardWidth}
          />
        </form>
        <div>
          <LifeBoard
            board={board}
            toggleCellStartValue={handleToggleCellStartValue}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: state.life.board,
  generation: state.life.generation,
  isConcluded: state.life.isConcluded,
  isPlaying: state.life.isPlaying
});

const mapDispatchToProps = dispatch => ({
  play: () => dispatch(play()),
  pause: () => dispatch(pause()),
  step: () => dispatch(step()),
  resetBoard: () => dispatch(resetBoard()),
  resizeBoard: (w, h) => dispatch(resizeBoard(w, h)),
  toggleCellStartValue: (r, c) => dispatch(toggleCellStartValue(r, c))
});

LifeContainer.propTypes = {
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  step: PropTypes.func.isRequired,
  resetBoard: PropTypes.func.isRequired,
  resizeBoard: PropTypes.func.isRequired,
  toggleCellStartValue: PropTypes.func.isRequired,
  generation: PropTypes.number.isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  minBoardWidth: PropTypes.number.isRequired,
  isConcluded: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LifeContainer);
