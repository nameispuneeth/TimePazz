import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import './TicTacToe.css'

export default function TicTacToe () {
    if(!localStorage.getItem("TicTacToeHistory")) localStorage.setItem("TicTacToeHistory",JSON.stringify([]));
    const [TictHistory,setTictHistory]=useState(JSON.parse(localStorage.getItem("TicTacToeHistory")));
    const [userName, setUserName] = useState("");  
    const [comp,setComp]=useState(false);
    const [board,setBoard]=useState(Array(9).fill(""));
    const [turnX,turnO]=useState(true);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    const [disabled,setDisabled]=useState(false);
    const [Xwins,setXwins]=useState(0);
    const [Owins,setOwins]=useState(0);
    const [Cwins,setCwins]=useState(0);
    const [winningCombo,setWinningCombo]=useState(Array(9).fill(false));
    const [Opponent,setOpponent]=useState("");
    const [draws,setDraws]=useState(0);

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

    let makeMove=(ind,val)=>{
      let newBoard=[...board];
      newBoard[ind]=val;
      turnO(!turnX);
      setBoard(newBoard);
    }
    let boardFill=()=>{
        for(let val of board){
            if(val==="") return false;
        }
        let drawGames=draws+1;
        if(comp){
          Swal.fire({
            title: "Game Drawn",
            text: `${drawGames} ${(drawGames==1)?'Draw':'Draws'} With Computer`,
            imageUrl: 'https://example.com/draw.png',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Draw Image',
            confirmButtonText: "OK", 
          });
        }
        else Swal.fire("Game Drawn",`${drawGames} ${(drawGames==1)?'Draw':'Draws'} With ${Opponent}`);
        setDraws(drawGames);
        return true;
    }
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
        let val1 = pat[0], val2 = pat[1], val3 = pat[2];
        if (board[val1] === board[val2] && board[val2] === board[val3] && board[val1] !== "") {
          setDisabled(true);
          let newCombo = Array(9).fill(false);
          newCombo[val1] = true;
          newCombo[val2] = true;
          newCombo[val3] = true;
          setWinningCombo(newCombo);
    
          if (board[val1] === "X") {
            let wins = comp ? Cwins + 1 : Xwins + 1;
            if (comp) {
              Swal.fire("Computer Won", `Computer Won ${wins} ${(wins === 1) ? 'Time' : 'Times'}`);
              setCwins(wins);
            } else {
              Swal.fire(`${Opponent} Won`, `${Opponent} Won ${wins} ${(wins === 1) ? 'Time' : 'Times'}`);
              setXwins(wins);
            }
            let WinsHist = [...TictHistory];
            const value = comp ? "Computer Won" : `${Opponent} Won`;
            const now = new Date();
            const result = `${now.toLocaleDateString()} ${now.toLocaleTimeString()} - ${value}`;
            WinsHist.push(result);
            setTictHistory(WinsHist);
          } else {
            let wins = Owins + 1;
            Swal.fire(`${userName} Won`, `${userName} Won ${wins} ${(wins === 1) ? 'Time' : 'Times'}`);
            setOwins(wins);
            let WinsHist = [...TictHistory];
            const value = `${userName} Won`;
            const now = new Date();
            const result = `${now.toLocaleDateString()} ${now.toLocaleTimeString()} - ${value}`;
            WinsHist.push(result);
            setTictHistory(WinsHist);
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
          let name = localStorage.getItem("userName");
      
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
              localStorage.setItem("userName", name);
            }
          }
      
          if (!name) return; 
      
          setUserName(name); 
      
            
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
    
    useEffect(()=>{
      localStorage.setItem("TicTacToeHistory",JSON.stringify(TictHistory));
    },[TictHistory])

  return (
    <>
    <div className='d-grid justify-content-center align-items-center mt-2 mb-2' >
    <button className="history-btn">History</button>

        <div className=" p-5 d-grid justify-content-center align-items-center" style={{backgroundColor:'white',border:'1px solid #a3cef1',borderRadius:'18px',maxHeight:'95vh'}}>
            <h1 className='text-center' style={{color:"#274c77",fontWeight:"bold",fontFamily:'"Quicksand", serif'}}>Tic-Tac-Toe</h1>
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
