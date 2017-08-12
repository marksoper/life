import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LifeBoard from '../LifeBoard/LifeBoard';
import './LifeContainer.css';
import { resetBoard, play, pause, step, toggleCellStartValue } from '../../actions';
import { tickDelay } from '../../settings';

class LifeContainer extends Component {
  constructor(props) {
    super(props);
    this.handleStep = this.handleStep.bind(this);
    this.handleResetBoard = this.handleResetBoard.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
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

  handlePause(e) {
    e.preventDefault();
    this.props.pause();
  }

  handleStep(e) {
    e.preventDefault();
    this.props.step();
  }

  handleResetBoard(e) {
    e.preventDefault();
    this.props.resetBoard();
  }

  render() {
    const board = this.props.board;
    const generation = this.props.generation;
    const handleStep = this.handleStep;
    const handleResetBoard = this.handleResetBoard;
    const handlePlay = this.handlePlay;
    const handlePause = this.handlePause;
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
  generation: state.life.generation,
  isConcluded: state.life.isConcluded,
  isPlaying: state.life.isPlaying
});

const mapDispatchToProps = dispatch => ({
  play: () => dispatch(play()),
  pause: () => dispatch(pause()),
  step: () => dispatch(step()),
  resetBoard: () => dispatch(resetBoard())
});

LifeContainer.propTypes = {
  generation: PropTypes.number.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  step: PropTypes.func.isRequired,
  resetBoard: PropTypes.func.isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  isConcluded: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LifeContainer);
