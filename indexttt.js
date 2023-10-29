const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");


let currPlayer;
let gameGrid;

const winning_position = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// game initialization
function initGame(){
    currPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
           box.innerText="";
           boxes[index].style.pointerEvents="all";
           box.classList=`box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currPlayer}`;
}

initGame();

function swapTurn(){
    if(currPlayer === "X")
      currPlayer="O";
    else
     currPlayer="X";

     gameInfo.innerText=`Current Player - ${currPlayer}`;
}

function checked(){
    let answer=""; 
    winning_position.forEach((index )=>{
         if(gameGrid[index[0]] !== "" || gameGrid[index[1]] !== "" || gameGrid[index[2]] !== ""){
            if(gameGrid[index[0]] === gameGrid[index[1]] && gameGrid[index[1]] === gameGrid[index[2]] && 
                gameGrid[index[2]] === gameGrid[index[0]]){
                     if(gameGrid[index[0]] === "X")
                       answer="X";
                    else
                       answer="O";
                   boxes.forEach((box)=>{
                    box.style.pointerEvents="none";
                   })
                       boxes[index[0]].classList.add("win");
                       boxes[index[1]].classList.add("win");
                       boxes[index[2]].classList.add("win");
                    }
            }
         })

    if(answer !== ""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillCount=0;

    gameGrid.forEach(box=>{
        if(box !== "") fillCount++;
    })

    if(fillCount === 9){
        gameInfo.innerText=`Game Tied!`;
        newGameBtn.classList.add("active");
    }
        
}

function handleClick(index){
    if(gameGrid[index] === ""){
   boxes[index].innerHTML=currPlayer;
    gameGrid[index]=currPlayer;
    boxes[index].style.pointerEvents="none";
// change the player
   swapTurn();

    //check whether it has won or not

      checked();
    }
}

    boxes.forEach((box, index) => {
        box.addEventListener("click",() =>{
            handleClick(index);
        })
    });

    newGameBtn.addEventListener("click",initGame);