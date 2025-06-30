import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import './TicTacToe.css'
import { useNavigate } from 'react-router-dom';
import LogoImg from './Images/logo.png'
import HumanWinComp from './Images/HumanAgainstComp.jpg'
import CompWin from './Images/CompAgainstHuman.png'
import CompDraw from './Images/CompDraw.png'
import HumanWinOpp from './Images/humanwins.jpg'  
import DrawHum from './Images/draw.jpg'
import OppWins from './Images/OppWins.png'
import Sun from './Images/sun-icon.png'
import Moon from './Images/moon-icon.png'

export default function TicTacToe () {
  const defaultData = {
    userName: '',
    History: [],
    MyWins: 0,
    OppWins: 0,
    CompWins: 0,
    Draws: 0
  };
  const stored = JSON.parse(localStorage.getItem('TicTacToeData'));
  const [gameData, setGameData] = useState(stored || defaultData);

  const [userName, setUserName] = useState(gameData.userName);
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turnX, turnO] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [winningCombo, setWinningCombo] = useState(Array(9).fill(false));
  const [Opponent, setOpponent] = useState("");
  const [comp, setComp] = useState(false);
  const [Cwins,setCwins]=useState(0);
  const [Owins,setOwins]=useState(0);
  const [Xwins,setXwins]=useState(0);
  const navigate = useNavigate();
  const [DarkMode,setDarkMode]=useState(false);

  useEffect(()=>{
    if(DarkMode===false) document.body.classList.remove('dark-theme');
    else document.body.classList.add('dark-theme');
  },[DarkMode])
  useEffect(() => {
    localStorage.setItem("TicTacToeData", JSON.stringify(gameData));
  }, [gameData]);


    let patterns=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    
  const makeMove = (ind, val) => {
    let newBoard = [...board];
    newBoard[ind] = val;
    turnO(!turnX);
    setBoard(newBoard);
  };
    
  const boardFill = () => {
    if (board.includes("")) return false;

    Swal.fire({
      title: "Game Drawn",
      text: `Draw #${gameData.Draws + 1}`,
      imageUrl:(comp)?CompDraw:DrawHum,
      imageWidth: (comp)?200:250,
      imageHeight: (comp)?200:250,
      imageAlt: 'Draw Image',
    });    
    
    setGameData(prev => ({ ...prev, Draws: prev.Draws + 1 }));
    return true;
  };
    let RestartGame=()=>{
        setBoard(Array(9).fill(""));
        turnO(true);
        setWinningCombo(Array(9).fill(false));
        setDisabled(false);
    }

    let ChangeMode=async()=>{
      RestartGame();
      if(comp){
        setComp(false);
        const name = await askOpponentName();
        setOpponent(name);
      }else{
        setComp(true);
      }
    }

    let isOneMovComp=()=>{
      for(let pat of patterns){
        if(board[pat[0]]==="X" && board[pat[1]]==="X" && board[pat[2]]===""){
          makeMove(pat[2],"X");
          return true;
        }else if(board[pat[1]]==="X" && board[pat[2]]==="X" && board[pat[0]]===""){
          makeMove(pat[0],"X")
          return true;
        }else if(board[pat[0]]==="X" && board[pat[2]]==="X" && board[pat[1]]===""){
          makeMove(pat[1],"X")
          return true;
        }
      }
      return false;
    }

    let isOneMovHum=()=>{
      for(let pat of patterns){
        if(board[pat[0]]==="O" && board[pat[1]]==="O" && board[pat[2]]===""){
          makeMove(pat[2],"X")
          return true;
        }else if(board[pat[1]]==="O" && board[pat[2]]==="O" && board[pat[0]]===""){
          makeMove(pat[0],"X")
          return true;
        }else if(board[pat[0]]==="O" && board[pat[2]]==="O" && board[pat[1]]===""){
          makeMove(pat[1],"X")
          return true;
        }
      }
      return false;
    }

    let randomMov=()=>{
      let temp=[];
      for(let i=0;i<9;i++){
        if(board[i]==="") temp.push(i);
      }
      let len=temp.length;
      let ind = Math.floor(Math.random() * len);
      makeMove(temp[ind],"X");
    }

    let computerMove=async()=>{
      if(isOneMovComp()) return;
      if(isOneMovHum())return;
      randomMov() 
    }

    let HandleClick=(ind)=>{
      if(board[ind]!=="") return;
      let newBoard=[...board];
      newBoard[ind] = turnX ? "X" : "O";
      turnO(!turnX);
      setBoard(newBoard);
    }

    let gameFinished = () => {
      for (let pat of patterns) {
        let [a, b, c] = pat;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
          let newCombo = Array(9).fill(false);
          newCombo[a] = newCombo[b] = newCombo[c] = true;
          setWinningCombo(newCombo);
          setDisabled(true);
  
  
          if (board[a] === "X") {
            if (comp) {
              let wins=Cwins+1;
              Swal.fire({title:"Computer Won",
                text: `Computer Won ${wins} ${(wins==1)?'Time' :'Times'}`,
                imageUrl:CompWin,
                imageHeight:200,
                imageWidth:200
                });
              setCwins(wins);
              setGameData(prev => ({
                ...prev,
                CompWins: prev.CompWins + 1,
                History: [...prev.History, { date: new Date(), result: "Computer Won Against You" }]
              }));
            } else {
              let wins=Xwins+1;
              Swal.fire({title:`${Opponent} Won`, text:`${Opponent} Won ${wins} ${(wins==1)?'Time' :'Times'}`,imageUrl:OppWins,imageHeight:200,imageWidth:200});
              setXwins(wins);
              setGameData(prev => ({
                ...prev,
                OppWins: prev.OppWins + 1,
                History: [...prev.History, { date: new Date(), result: `${Opponent} Won Against You` }]
              }));
            }
          } else {
            let wins=Owins+1;
            Swal.fire({title:`${userName} Won`, 
                    text:`You Won ${wins} ${(wins==1)?'Time' :'Times'}`,
                    imageUrl:(comp)?HumanWinComp:HumanWinOpp,
                    imageHeight:200,
                    imageWidth:(comp)?200:210
          });
            setOwins(wins);
            setGameData(prev => ({
              ...prev,
              MyWins: prev.MyWins + 1,
              History: [...prev.History, { date: new Date(), result:`You Won Against ${(comp)?'Computer':Opponent}`}]
            }));
          }
  
          return true;
        }
      }
      return false;
    };

    const askOpponentName = async () => {
        const result = await Swal.fire({
          title: 'What Is Your Opponent Name?',
          input: 'text',
          inputPlaceholder: 'Enter your name',
          html: '<p style="margin-top:5px;"><b>(Note : This Player Will Play First)</b></p>',
          confirmButtonText: 'Confirm',
          confirmButtonColor: '#3085d6',
          inputValidator:(value)=>{
            if(!value) return "Name is Required"
            else if(value===userName) return "Your Name and Opponent Name Matches"
          }
        });
      
        if (result.isConfirmed) {
          return result.value;
        }
        return null;
      };
      
      
      useEffect(() => {
        const initGame = async () => {
          let name = gameData.userName;

            if (!name) {
              const { isConfirmed, value } = await Swal.fire({
                title: "Enter Your Name",
                input: "text",
                inputPlaceholder: "Enter Your Name",
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                inputValidator: (value) => {
                  if (!value) return "Enter a valid name";
                }
              });

              if (isConfirmed && value) {
                name = value;
                setUserName(name);
                setGameData(prev => ({
                  ...prev,
                  userName: name
                }));
              }
            }

            if (!name) return;
 
      
            
          const modePrompt = await Swal.fire({
            title: 'ENTER THE MODE OF GAME',
            showDenyButton: true,
            confirmButtonText: 'Vs Computer',
            confirmButtonColor: '#3085d6',
            denyButtonText: 'Vs Friend',
            denyButtonColor: '#3085d6',
            allowOutsideClick: false,
            customClass: {
              actions: "swal-buttons-spacing"
            }
          });
      
          if (modePrompt.isConfirmed) {
            setComp(true);
            computerMove();
          } else if (modePrompt.isDenied) {
            const oppName = await askOpponentName();
            if (oppName) setOpponent(oppName);
          }
        };
      
        initGame();
      }, []);
      
      useEffect(() => {
        if (comp && turnX && !disabled) {
          setDisabled(true);
          setTimeout(() => {
            computerMove();
            setDisabled(false);
          }, 800);
        }
      }, [board,comp]);
      
    useEffect(() => {
        if (gameFinished() || boardFill()) {
            setDisabled(true);
        }
    }, [board]);
    

  return (
    <>
    <div className='d-grid justify-content-center align-items-center mt-2 mb-2' >
    <img src={LogoImg} style={{position:'absolute',top:'10px',left:'10px',height:'5vmin',width:'5vmin',cursor:'pointer'}} onClick={()=>navigate('/')}/>
    <img src={(DarkMode)?Sun:Moon} className={`logoimg ${DarkMode?'':'moonimg'}`} onClick={()=>setDarkMode(!DarkMode)}/>
    <button className="history-btn" onClick={()=>navigate("/history")}>History</button>
    
        <div className=" p-5 d-grid justify-content-center align-items-center gamingBoard" style={{borderRadius:'18px',maxHeight:'95vh'}}>
            <h1 className='text-center heading' style={{color:"#274c77",fontWeight:"bold",fontFamily:'"Quicksand", serif'}}>Tic-Tac-Toe</h1>
            <div className='mt-4'>
                <div className="row">
                    <button className={`cbtn ${winningCombo[0]?'win':''}`} onClick={()=>HandleClick(0)} disabled={disabled}>{board[0]}</button>
                    <button className={`cbtn ${winningCombo[1]?'win':''}`} onClick={()=>HandleClick(1)} disabled={disabled}>{board[1]}</button>
                    <button className={`cbtn ${winningCombo[2]?'win':''}`} onClick={()=>HandleClick(2)} disabled={disabled}>{board[2]}</button>
                </div>
                <div className="row">
                    <button className={`cbtn ${winningCombo[3]?'win':''}`} onClick={()=>HandleClick(3)} disabled={disabled}>{board[3]}</button>
                    <button className={`cbtn ${winningCombo[4]?'win':''}`} onClick={()=>HandleClick(4)} disabled={disabled}>{board[4]}</button>
                    <button className={`cbtn ${winningCombo[5]?'win':''}`} onClick={()=>HandleClick(5)} disabled={disabled}>{board[5]}</button>
                </div>
                <div className="row">
                    <button className={`cbtn ${winningCombo[6]?'win':''}`} onClick={()=>HandleClick(6)} disabled={disabled}>{board[6]}</button>
                    <button className={`cbtn ${winningCombo[7]?'win':''}`} onClick={()=>HandleClick(7)} disabled={disabled}>{board[7]}</button>
                    <button className={`cbtn ${winningCombo[8]?'win':''}`} onClick={()=>HandleClick(8)} disabled={disabled}>{board[8]}</button>
                </div>
                <div className='mt-2'>
                <button className='reset' onClick={()=>RestartGame()}>New Game</button>
                <button className='reset' onClick={()=>ChangeMode()}>Change Mode</button>
                </div>
            </div>
            
        </div>
    </div>
    </>
  );
};
