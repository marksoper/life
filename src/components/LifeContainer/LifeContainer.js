import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LifeBoard from '../LifeBoard/LifeBoard';
import './LifeContainer.css';
import {
  resetBoard,
  play,
  pause,
  step,
  toggleCellStartValue
} from '../../actions';
import { tickDelay, maxBoardWidth, maxBoardHeight } from '../../settings';
import { getMinimumAllowableDimensions } from '../../life/life';

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
    const minimumDimensions = getMinimumAllowableDimensions(this.props.board);
    this.state = {
      boardWidth: this.props.boardWidth,
      boardHeight: this.props.boardHeight,
      minBoardWidth: minimumDimensions[0],
      maxBoardWidth,
      minBoardHeight: minimumDimensions[1],
      maxBoardHeight
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.toggleCellStartValuePending) {
      const minimumDimensions = getMinimumAllowableDimensions(this.props.board);
      this.setState({
        minBoardWidth: minimumDimensions[0],
        minBoardHeight: minimumDimensions[1],
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
    this.props.resetBoard(this.state.boardWidth, this.state.boardHeight);
  }

  handleWidthChange(e) {
    if (this.hasStarted()) {
      return;
    }
    const nextBoardWidth = Number(e.target.value);
    if (
      nextBoardWidth >= this.state.minBoardWidth &&
      nextBoardWidth <= this.state.maxBoardWidth
    ) {
      this.setState({ boardWidth: nextBoardWidth });
      this.props.resetBoard(nextBoardWidth, this.props.boardHeight);
    } else if (nextBoardWidth < this.state.minBoardWidth) {
      this.setState({ boardWidth: this.state.minBoardWidth });
    } else {
      this.setState({ boardWidth: this.state.maxBoardWidth });
    }
  }

  handleToggleCellStartValue(r, c) {
    if (!this.hasStarted()) {
      this.setState({
        toggleCellStartValuePending: true
      });
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
            min={this.state.minBoardWidth}
            max={this.state.maxBoardWidth}
            onChange={handleWidthChange}
            value={this.state.boardWidth}
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
  boardWidth: state.life.boardWidth,
  boardHeight: state.life.boardHeight,
  generation: state.life.generation,
  isConcluded: state.life.isConcluded,
  isPlaying: state.life.isPlaying
});

const mapDispatchToProps = dispatch => ({
  play: () => dispatch(play()),
  pause: () => dispatch(pause()),
  step: () => dispatch(step()),
  resetBoard: (w, h) => dispatch(resetBoard(w, h)),
  toggleCellStartValue: (r, c) => dispatch(toggleCellStartValue(r, c))
});

LifeContainer.propTypes = {
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  step: PropTypes.func.isRequired,
  resetBoard: PropTypes.func.isRequired,
  toggleCellStartValue: PropTypes.func.isRequired,
  generation: PropTypes.number.isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  boardWidth: PropTypes.number.isRequired,
  boardHeight: PropTypes.number.isRequired,
  isConcluded: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LifeContainer);
