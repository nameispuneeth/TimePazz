import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GameStats() {
  const [gameData, setGameData] = useState({
    userName: '',
    CompWins: 0,
    MyWins: 0,
    OppWins: 0,
    Draws: 0,
    History: []
  });

  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("TicTacToeData"));
    if (data) setGameData(data);
  }, []);

  const cardInfo = [
    { title: `${gameData.userName || 'User'} Wins`, value: gameData.MyWins, color: 'success' },
    { title: 'Computer Wins', value: gameData.CompWins, color: 'danger' },
    { title: 'Opponent Wins', value: gameData.OppWins, color: 'primary' },
    { title: 'Draws', value: gameData.Draws, color: 'secondary' }
  ];

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2
          className="text-primary fw-bold"
          style={{ cursor: 'pointer', fontFamily: '"Quicksand", sans-serif' }}
          onClick={() => navigate("/tictactoe")}
        >
          TicTacToe Stats
        </h2>
        <span className="text-muted">Player: <strong>{gameData.userName || "Unknown"}</strong></span>
      </div>

      {/* Stats Cards */}
      <div className="row g-4">
        {cardInfo.map((card, idx) => (
          <div className="col-md-6 col-lg-3" key={idx}>
            <div className={`card text-white bg-${card.color} shadow-sm h-100`}>
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title mb-2">{card.title}</h5>
                <h2 className="display-6">{card.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

      <div className="mt-5">
  <h4 className="text-primary fw-bold mb-4 mt-5" style={{
    fontFamily: '"Quicksand", sans-serif',
  }}
  >
    Game History
  </h4>

  {gameData.History && gameData.History.length > 0 ? (
    <ul className="ps-0" style={{ listStyleType: 'none' }}>
      {gameData.History
        .slice()
        .reverse()
        .slice(0, visibleCount)
        .map((entry, index) => (
          <li
            key={index}
            style={{
              fontFamily: '"Quicksand", sans-serif',
              fontSize: '1rem',
              padding: '8px 0',
              color: '#274c77',
            }}
            className='mb-2'
          >
            {entry}
            <hr style={{ borderColor: 'gray', opacity: 0.6, margin: '6px 0' }} />
          </li>
        ))}
    </ul>
  ) : (
    <p style={{
      fontFamily: '"Quicksand", sans-serif',
      color: '#999',
      fontSize: '1rem'
    }}>
      No games played yet.
    </p>
  )}

  {visibleCount < gameData.History.length && (
    <div className="mt-3">
      <button
        className="btn mb-3"
        style={{
          fontFamily: '"Quicksand", sans-serif',
          color: '#274c77',
          border: '1px solid #274c77',
          background: 'transparent',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '0.95rem'
        }}
        onClick={handleShowMore}
      >
        Show More
      </button>
    </div>
  )}
</div>

    </div>
  );
}
