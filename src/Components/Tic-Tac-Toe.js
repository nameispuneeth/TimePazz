import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import './TicTacToe.css'

export default function TicTacToe () {
    let userName=localStorage.getItem("name");
    if(userName===null) userName="Puneeth";
    const [comp,setComp]=useState(false);
    const [board,setBoard]=useState(Array(9).fill(""));
    const [turnX,turnO]=useState(true);
    const [disabled,setDisabled]=useState(false);
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

    let boardFill=()=>{
        for(let val of board){
            if(val==="") return false;
        }
        Swal.fire("Game Drawn");
        return true;
    }
    let RestartGame=()=>{
        setBoard(Array(9).fill(""));
        turnO(true);
        setDisabled(false);
    }
    const multiplayer = (Oppname) => {
        
    };

    const computer = () => {
        Swal.fire('Success', 'You clicked Computer', 'success');
    };

    let HandleClick=(ind)=>{
        if(comp){

        }else{
            if(board[ind]!=="") return;
            let newBoard=[...board];
            newBoard[ind] = turnX ? "X" : "O";
            turnO(!turnX);
            setBoard(newBoard);
        }
    }

    let gameFinished=()=>{
        for(let pat of patterns){
            let val1=pat[0],val2=pat[1],val3=pat[2];
            if(board[val1]===board[val2] && board[val2]===board[val3] && board[val1]!==""){
                let winner=(board[val1]==="X")?'X':'O';
                Swal.fire(`${winner} Won`);
                return true;
            }
        }
        return false;
    }
    const askName = async () => {
        const result = await Swal.fire({
          title: 'What is your name?',
          input: 'text',
          inputPlaceholder: 'Enter your name',
          showCancelButton: true
        });
      
        if (result.isConfirmed) {
          console.log("In askName:", result.value);
          return result.value;
        }
        return null;
      };
      
      useEffect(() => {
        const getMode = async () => {
          const result = await Swal.fire({
            title: 'ENTER THE MODE OF GAME',
            showDenyButton: true,
            confirmButtonText: 'Vs Computer',
            confirmButtonColor: '#3085d6',
            denyButtonText: 'Vs Friend',
            denyButtonColor: '#3085d6',
            allowOutsideClick: false,
            customClass: {
              actions: 'swal-buttons-spacing',
            }
          });
      
          if (result.isConfirmed) {
            setComp(true);
            computer();
          } else if (result.isDenied) {
            const name = await askName();
            console.log("Player name:", name);
            multiplayer(name);
          }
        };
      
        getMode();
      }, []);
      
    useEffect(() => {
        if (gameFinished() || boardFill()) {
            setDisabled(true);
        }
    }, [board]); 
  
  return (
    <div className='d-grid justify-content-center align-items-center mt-2 mb-2' >
        <div className=" p-5 d-grid justify-content-center align-items-center" style={{backgroundColor:'white',border:'1px solid #a3cef1',borderRadius:'18px',maxHeight:'95vh'}}>
            <h1 className='text-center' style={{color:"#274c77",fontWeight:"bold",fontFamily:'"Quicksand", serif'}}>Tic-Tac-Toe</h1>
            <div className='mt-4'>
                <div className="row">
                    <button className="cbtn" onClick={()=>HandleClick(0)} disabled={disabled}>{board[0]}</button>
                    <button className="cbtn" onClick={()=>HandleClick(1)} disabled={disabled}>{board[1]}</button>
                    <button className="cbtn" onClick={()=>HandleClick(2)} disabled={disabled}>{board[2]}</button>
                </div>
                <div className="row">
                    <button className="cbtn" onClick={()=>HandleClick(3)} disabled={disabled}>{board[3]}</button>
                    <button className="cbtn" onClick={()=>HandleClick(4)} disabled={disabled}>{board[4]}</button>
                    <button className="cbtn" onClick={()=>HandleClick(5)} disabled={disabled}>{board[5]}</button>
                </div>
                <div className="row">
                    <button className="cbtn" onClick={()=>HandleClick(6)} disabled={disabled}>{board[6]}</button>
                    <button className="cbtn" onClick={()=>HandleClick(7)} disabled={disabled}>{board[7]}</button>
                    <button className="cbtn" onClick={()=>HandleClick(8)} disabled={disabled}>{board[8]}</button>
                </div>
                <button className='reset' onClick={()=>RestartGame()}>New Game</button>
            </div>
            
        </div>
    </div>
  );
};
