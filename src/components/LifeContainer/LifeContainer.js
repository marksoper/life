import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LifeBoard from '../LifeBoard/LifeBoard';
import LifeSimControls from '../LifeSimControls/LifeSimControls';
import './LifeContainer.css';
import config from '../../config';
import {
  resetBoard,
  resizeBoard,
  play,
  pause,
  step,
  toggleCellStartValue
} from '../../actions';

class LifeContainer extends Component {
  constructor(props) {
    super(props);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleToggleCellStartValue = this.handleToggleCellStartValue.bind(
      this
    );
    this.state = {
      requestedBoardWidth: this.props.board[0].length
    };
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
    if (
      this.props.isPlaying &&
      !this.props.isConcluded &&
      this.props.generation <= config.MAX_GENERATIONS
    ) {
      this.props.step();
      setTimeout(this.runSteps.bind(this), this.props.tickDelay);
    }
  }

  handleWidthChange(e) {
    const requestedBoardWidth = Number(e.target.value);
    this.props.resizeBoard(
      Math.max(
        Math.min(requestedBoardWidth, this.props.maxBoardWidth),
        this.props.minBoardWidth
      ),
      this.props.board.length
    );
  }

  handleHeightChange(e) {
    const requestedBoardHeight = Number(e.target.value);
    this.props.resizeBoard(
      this.props.board[0].length,
      Math.max(
        Math.min(requestedBoardHeight, this.props.maxBoardHeight),
        this.props.minBoardHeight
      )
    );
  }

  handleToggleCellStartValue(r, c) {
    this.props.toggleCellStartValue(r, c);
  }

  render() {
    const board = this.props.board;
    const generation = this.props.generation;
    const handleWidthChange = this.handleWidthChange;
    const handleHeightChange = this.handleHeightChange;
    const handleToggleCellStartValue = this.handleToggleCellStartValue;
    const concludedStyle = this.props.isConcluded ? { color: '#900' } : null;
    return (
      <div className="LifeContainer">
        <div className="LifeHeader">
          <div className="LifeTitle">
            <div className="TitleMain">
              {"Conway's"}
            </div>
            <div className="TitleSub">Game of Life</div>
          </div>
          <div className="GenCount" style={concludedStyle}>
            {generation}
          </div>
          <LifeSimControls
            isConcluded={this.props.isConcluded}
            isPlaying={this.props.isPlaying}
            step={this.props.step}
            resetBoard={this.props.resetBoard}
            play={this.props.play}
            pause={this.props.pause}
          />

          <div className="ResizeControls">
            <form>
              <div>
                <label htmlFor="widthInput">Width</label>
                <span>
                  : {this.props.board[0].length}
                </span>
                <div>
                  <input
                    id="widthInput"
                    type="range"
                    min={config.INITIAL_MIN_BOARD_WIDTH}
                    max={config.INITIAL_MAX_BOARD_WIDTH}
                    onChange={handleWidthChange}
                    value={this.props.board[0].length}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="heightInput">Height</label>
                <span>
                  : {this.props.board.length}
                </span>
                <div>
                  <input
                    id="heightInput"
                    type="range"
                    min={config.INITIAL_MIN_BOARD_HEIGHT}
                    max={config.INITIAL_MAX_BOARD_HEIGHT}
                    onChange={handleHeightChange}
                    value={this.props.board.length}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="LifeBoardContainer">
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
  minBoardWidth: state.life.minBoardWidth,
  maxBoardWidth: state.life.maxBoardWidth,
  minBoardHeight: state.life.minBoardHeight,
  maxBoardHeight: state.life.maxBoardHeight,
  tickDelay: state.life.tickDelay,
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
  maxBoardWidth: PropTypes.number.isRequired,
  minBoardHeight: PropTypes.number.isRequired,
  maxBoardHeight: PropTypes.number.isRequired,
  tickDelay: PropTypes.number.isRequired,
  isConcluded: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LifeContainer);
