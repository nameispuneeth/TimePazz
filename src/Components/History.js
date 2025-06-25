import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicTacToe.css'

let getTimeAgo=(dateStr)=>{
  const past = new Date(dateStr);
  const now = new Date();
  const diffMs = now - past;
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months=Math.floor(days/30);
  const years=Math.floor(months/12);

  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} months${months > 1 ? 's' : ''} ago`;

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return `${seconds} seconds ago`;
}

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
    setVisibleCount(prev => prev + 5);
  };

  return (
    <div className="container mt-4">
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
    <ul className="list-unstyled">
    {gameData.History
      .slice()
      .reverse()
      .slice(0, visibleCount)
      .map((entry, index) => (
        <li
          key={index}
          className="submission-box mb-3 p-3 d-flex justify-content-between align-items-center shadow-sm"
          style={{
            border: '1px solid #dee2e6',
            borderRadius: '10px',
            backgroundColor: 'white',
            transition: 'box-shadow 0.2s',
            fontFamily: '"Quicksand", sans-serif',
            fontSize: '0.95rem',
          }}
        >
          <span style={{ color: '#274c77' }}>{entry.result}</span>
          <span style={{ color: '#6c757d', fontSize: '0.85rem' }}>
            {getTimeAgo(entry.date)}
          </span>
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
          color: 'grey',
          border: '1px solid white',
          backgroundColor: 'white',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '0.95rem',
          fontWeight:'bold'
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
