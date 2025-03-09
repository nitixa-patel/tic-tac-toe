import React, { useState, useEffect } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [computerSymbol, setComputerSymbol] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Player always starts first
  const winner = calculateWinner(board);

  useEffect(() => {
    if (!isPlayerTurn && !winner && playerSymbol !== null) {
      setTimeout(computerMove, 500); // Computer moves after 0.5 sec
    }
  }, [isPlayerTurn, board]);

  const handlePlayerMove = (index) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    setIsPlayerTurn(false); // Now it's Computer's turn
  };

  const computerMove = () => {
    const emptyCells = board.map((cell, index) => (cell === null ? index : null)).filter((i) => i !== null);
    if (emptyCells.length === 0 || winner) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = [...board];
    newBoard[randomIndex] = computerSymbol;
    setBoard(newBoard);
    setIsPlayerTurn(true); // Now it's Player's turn again
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayerSymbol(null);
    setComputerSymbol(null);
    setIsPlayerTurn(true); // User always starts
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px", marginLeft:"550px"}}>
      <h1>Tic-Tac-Toe</h1>
      
      {!playerSymbol ? (
        <div>
          <h2>Choose your symbol:</h2>
          <button onClick={() => { setPlayerSymbol("X"); setComputerSymbol("O"); }} style={btnStyle}>X</button>
          <button onClick={() => { setPlayerSymbol("O"); setComputerSymbol("X"); }} style={btnStyle}>O</button>
        </div>
      ) : (
        <>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 60px)", gap: "5px",
            justifyContent: "center", marginTop: "20px"
          }}>
            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handlePlayerMove(index)}
                disabled={!!cell || winner} // Disable if filled or game over
                style={{
                  width: "60px", height: "60px", fontSize: "24px", color: "black",
                  border: "2px solid black", cursor: cell || winner ? "not-allowed" : "pointer",
                  backgroundColor: "white"
                }}
              >
                {cell}
              </button>
            ))}
          </div>

          <h2>
            {winner ? (
              winner === playerSymbol
                ? "🎉 Congratulations! You Win!"
                : "😔 Oh! Better luck next time!"
            ) : board.includes(null) ? (
              `Your Turn - ${playerSymbol}`
            ) : (
              "It's a Draw!"
            )}
          </h2>

          <button onClick={resetGame} style={btnStyle}>Reset Game</button>
          <h3 style={{ marginTop: "20px" }}>Made with ❤️ Nitixa</h3>
        </>
      )}
    </div>
  );
};

// Function to check winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// Button Styling
const btnStyle = { padding: "10px", fontSize: "18px", margin: "5px", cursor: "pointer" };

export default TicTacToe;
