const cells = document.querySelectorAll(".cell");
const cellcontainer = document.querySelector(".cell-container");
const resultcontainer = document.querySelector(".result");
const resetbtn = document.querySelector(".reset");
const turn = document.querySelector(".turn");
const wincondation = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let options = ["","","","","","","","",""];
let roundWon = false;
let currentplayer = "X";
turn.textContent = `${currentplayer}'s Turn`;

cells.forEach(cell=>cell.addEventListener("click",clickhandler));

function clickhandler(e){
    let Isplaying = cellcontainer.getAttribute("playing");

    if (e.target.textContent == "X" || e.target.textContent == "O" || Isplaying == "false") {
        return;
    }else{
        e.target.textContent = currentplayer;
        let clickedCellIndex = e.target.getAttribute("cell-index");  
           
        if (options[clickedCellIndex] != "") {
            return;
        }

        options[clickedCellIndex] = currentplayer;
        
        for (let i = 0;i<wincondation.length;i++) {
            const condation = wincondation[i];

            var cellA = options[condation[0]];
            var cellB = options[condation[1]];
            var cellC = options[condation[2]];
            
            
            if (cellA == "" || cellB == "" || cellC == "") {
                continue;
            };
            if (cellA == cellB && cellB== cellC) {
                roundWon = true;
                cellcontainer.setAttribute("playing","false");
                break;
            };
        };

        if (roundWon == true) {
            resultcontainer.textContent = `${currentplayer} Won !!`
            cellcontainer.style.background="aquamarine";
        }else if(!options.includes("")){
            resultcontainer.textContent = "Draw !!"
            cellcontainer.style.background="gold";
        };
    };

    currentplayer = (currentplayer == "X") ? "O" : "X";
    turn.textContent = `${currentplayer}'s Turn`;

};

resetbtn.addEventListener("click",()=>{
    cellcontainer.style.background="white";
    cells.forEach(map=>map.textContent="");
    resultcontainer.textContent="";
    currentplayer="X";
    turn.textContent=`${currentplayer}'s Turn`;
    cellcontainer.setAttribute("playing","true");
    options = ["","","","","","","","",""];
    roundWon = false;
})