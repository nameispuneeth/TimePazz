import React from 'react';
import './TicTacToe.css';

export default function SudokuGrid() {
  return (
    <div className="sudoku-container">
      <table className="sudoku-grid">
        <tbody>
          {Array.from({ length: 9 }, (_, row) => (
            <tr key={row}>
              {Array.from({ length: 9 }, (_, col) => (
                <td
                  key={col}
                  className={`cell ${
                    (Math.floor(row / 3) + Math.floor(col / 3)) % 2 === 0
                      ? 'cell-block'
                      : ''
                  }`}
                >
                  <input
                    type="text"
                    maxLength="1"
                    pattern="[1-9]"
                    className="cell-input"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
