import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LifeBoard.css';

class LifeBoard extends Component {
  constructor(props) {
    super(props);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleCellClick(r, c) {
    this.props.toggleCellStartValue(r, c);
  }

  render() {
    const board = this.props.board || [[]];
    const w = board[0].length;
    const h = board.length;
    const pixelsPerCell = Math.min(Math.floor(1200 / w), Math.floor(800 / h));
    const rowLineStrokeWidth = 1;
    const colLineStrokeWidth = 1;
    const rectWidth = pixelsPerCell * w + colLineStrokeWidth * (w + 1);
    const rectHeight = pixelsPerCell * h + rowLineStrokeWidth * (w + 1);
    const viewBox = `0 0 ${rectWidth} ${rectHeight}`;
    const cells = [];
    for (let r = 0; r < h; r += 1) {
      for (let c = 0; c < w; c += 1) {
        cells.push({
          x: c * (pixelsPerCell + colLineStrokeWidth),
          y: r * (pixelsPerCell + rowLineStrokeWidth),
          fill: board[r][c] ? '#0FC' : '#EEE',
          key: `${r}_${c}`
        });
      }
    }
    const cellRects = cells.map(cell =>
      <rect
        key={cell.key}
        x={cell.x}
        y={cell.y}
        width={pixelsPerCell}
        height={pixelsPerCell}
        fill={cell.fill}
      />
    );
    return (
      <svg
        width={rectWidth}
        height={rectHeight}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        {cellRects}
      </svg>
    );
  }
}

LifeBoard.propTypes = {
  toggleCellStartValue: PropTypes.func.isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};

export default LifeBoard;
