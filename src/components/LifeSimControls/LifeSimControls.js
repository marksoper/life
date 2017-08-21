import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LifeSimControls extends Component {
  constructor(props) {
    super(props);
    this.handleStep = this.handleStep.bind(this);
    this.handleResetBoard = this.handleResetBoard.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
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

  render() {
    const handlePlay = this.handlePlay;
    const handleStep = this.handleStep;
    const handlePause = this.handlePause;
    const handleResetBoard = this.handleResetBoard;
    return (
      <div className="SimControls">
        <div>
          <a
            onClick={handlePlay}
            role="button"
            tabIndex="0"
            title="Run the simulation"
          >
            <span className="glyphicon glyphicon-play" aria-label="Play" />
            Play
          </a>
        </div>
        <div>
          <a
            onClick={handlePause}
            role="button"
            tabIndex="0"
            title="Pause the simultation"
          >
            <span className="glyphicon glyphicon-pause" aria-label="Pause" />
            Pause
          </a>
        </div>
        <div>
          <a
            onClick={handleStep}
            role="button"
            tabIndex="0"
            title="Advance by 1 step"
          >
            <span
              className="glyphicon glyphicon-step-forward"
              aria-label="Step"
            />
            Step
          </a>
        </div>
        <div>
          <a
            onClick={handleResetBoard}
            role="button"
            tabIndex="0"
            title="Reset to initial state"
          >
            <span className="glyphicon glyphicon-refresh" aria-label="Reset" />
            Reset
          </a>
        </div>
      </div>
    );
  }
}

LifeSimControls.propTypes = {
  isConcluded: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  step: PropTypes.func.isRequired,
  resetBoard: PropTypes.func.isRequired
};

export default LifeSimControls;
