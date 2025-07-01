import React,{useState,useEffect} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './TicTacToe.css'
import LogoImg from './Images/logo.png';
import TicTacToeImg from './Images/tictactoe.png';
import SudokoImg from './Images/sudoko.png';
import Sun from './Images/sun-icon.png'
import Moon from './Images/moon-icon.png'


const Home = () => {
  
  const [DarkMode,setDarkMode]=useState(false);

useEffect(()=>{
    if(DarkMode===false) document.body.classList.remove('dark-theme');
    else document.body.classList.add('dark-theme');
  },[DarkMode]);

  return (
    <>
       <section className="py-5 text-center mt-5 mb-3 gamingBoard">
       <img src={(DarkMode)?Sun:Moon} className={`logoimg ${DarkMode?'':'moonimg'}`} style={{marginTop:0}} onClick={()=>setDarkMode(!DarkMode)}/>

    <div className="container">
      <img src={LogoImg} alt="Z" width="72" height="72" className="mb-3"/>
      <h1 className="display-5 fw-bold">GamePazz</h1>
      <p className="lead text-muted">
        Enjoy a dose of fun and logic! <br/>Play interactive <strong>Tic Tac Toe</strong> or challenge your brain with our smart <strong>Sudoku Solver</strong>.
      </p>

      <div className="row mt-4 justify-content-center">
        <div className="col-md-5 col-sm-10 mb-4">
          <Link to={'/tictactoe'} className="text-decoration-none">
            <div className="card h-100 shadow-sm">
              <img src={TicTacToeImg} className="card-img-top" style={{height:'50vmin',
                      width: '50vmin',
                      objectFit: 'cover',
                      alignSelf: 'center'}}   alt="Tic Tac Toe" />
              <div className="card-body">
                <h5 className="card-title mb-4">Tic Tac Toe</h5>
                <p className="card-text">Play against friend or the computer and master the classics.</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-5 col-sm-10 mb-4">
          <Link to={'/sudoko'} className="text-decoration-none">
            <div className="card h-100 shadow-sm">
              <img src={SudokoImg} className="card-img-top" 
              style={{height:'45vmin',
                      width: '45vmin',
                      margin:'18px',
                      objectFit: 'cover',
                      alignSelf: 'center'}}  alt="Sudoku Solver" />
              <div className="card-body">
                <h5 className="card-title mb-4">Sudoku Solver</h5>
                <p className="card-text">Input your puzzle and solve it in seconds.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </section>
    <p className="text-muted large mt-3">
    Made With 🤍 By Puneeth
  </p>
    </>
  )
}

export default Home;
