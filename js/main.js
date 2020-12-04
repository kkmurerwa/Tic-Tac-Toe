// Create array of cell ids
let cellObject = []

// Create factory function
const CellFactory = (id) => { 
    return {id}
}

// Create object for winning combinations

let gameExists = false
let gameWon = false
let gameWinner = 0

// Array to store gameboard
let gameboard = [...Array(9).keys()].map(elem => "q")

const container = document.createElement("div")

function createBoard(){
    // Create container object
    container.className = "container"

    

    // Create title
    const pageTitle = document.createElement("h1")
    pageTitle.classList.add("title")
    pageTitle.innerHTML = "Tic Tac Toe"

    // Create start game button
    const startGameButton = document.createElement("button")
    startGameButton.classList.add("button")
    startGameButton.innerHTML = "<i class='fa fa-play'> Start Game"
    startGameButton.addEventListener("click", function(){
        container.classList.add("top")

        // Generate gameboard
        if (!gameExists){
            createGameboardGrid(container)
        } else {
            alert("Cannot start game when another instance exists.")
        }
    })

    
    

    container.appendChild(pageTitle)
    container.appendChild(startGameButton)

    document.body.appendChild(container)

    return {container}
}

function createGameboardGrid(container) {
    // Reset gameboard
    gameboard = gameboard.map(elem => "q")

    // Reset cell object
    cellObject = []

    // Create grid container
    const gridContainer = document.createElement("div")
    gridContainer.className = "grid-container"
    gridContainer.style.setProperty('--grid-rows', 3)
    gridContainer.style.setProperty('--grid-cols', 3)

    // Generate grid-items
    for (i = 0; i < 9; i++) {
        let cell = document.createElement("div")
        cell.id = i

        // Add code to change color on hover to each cell
        cell.addEventListener('click', function(event){
            let turn = gameboard.filter(elem => elem != "q").length
            if (gameboard[cell.id] === "q" && !gameWon){
                gameboard[cell.id] = "X"
                cell.innerHTML = gameboard[cell.id]

                // Check for winner
                checkForWinner()

                // Play Computer Move
                if (turn < 8 && !gameWon){
                    computerMove(gridContainer)
                    checkForWinner()
                }
                
            } else {
                // Do nothing
            }
        })

        let cellInstance = CellFactory(cell)
        cellObject.push(cellInstance)

        // Append each cell to the container div
        gridContainer.appendChild(cell).className = "grid-item"
    }

    // Create restart button
    const restart = document.createElement("button")
    restart.className = "button"
    restart.innerHTML = "<i class='fa fa-refresh'> Restart"
    restart.addEventListener("click", function(){
        // Reset gameboard, game grid, and gameWon
        resetGame(gridContainer, restart)
    })

    container.appendChild(restart)

    container.appendChild(gridContainer)

    gameExists = true

    console.table(cellObject)
}


function resetGame(gridContainer, restart){
    // Reset gameboard, game grid, and gameWon
    gameWon = false
    gameWinner = 0
    console.log(gameboard)
    container.removeChild(gridContainer)
    container.removeChild(restart)
    createGameboardGrid(container)
}

function computerMove(gridContainer){
    console.log("Playing computer move...")
    let unselected = []
    for (let i = 0; i < 10; i ++){
        if(gameboard[i] === "q") unselected.push(i)
    }
    // Generate random number
    let randomNumber = null
    if (gameboard[4] === "q"){
        console.log("4 is empty")
        randomNumber = 3
    } else{
        randomNumber = Math.floor(Math.random() * unselected.length)
    }

    let cellSelection = unselected[randomNumber]

    gameboard[cellSelection] = "O"
    cellObject[cellSelection].id.innerHTML = gameboard[cellSelection]
}


function checkForWinner(){
    let gameboardString = gameboard.join("")
    let regexPlayer = new RegExp(/X...X...X|X..X..X|XXX......|...XXX...|......XXX|..X.X.X../ig)
    let regexComp = new RegExp(/O...O...O|O..O..O|OOO......|...OOO...|......OOO|..O.O.O../ig)

    if (regexComp.test(gameboardString)){
        gameWon = true
        gameWinner = 2
    } else if (regexPlayer.test(gameboardString)){
        gameWon = true
        gameWinner = 1
    }

    let turn = gameboard.filter(elem => elem != "q").length
    if (turn === 9 && !gameWon){
        console.log("Draw")
        createForm(0)
    }

    if (gameWon) createForm(gameWinner)
}

function createForm(decider){
    // Create and initialize overlay div
    const pyroDiv = document.createElement("div")
    pyroDiv.classList.add("pyro")

    // Create dialog
    const contentDiv = document.createElement("div")
    contentDiv.classList.add("congrats")

    // Create paragraph to display text
    const paragraph = document.createElement("p")

    // Create close button
    const removeCongratsGrid = document.createElement("button")
    removeCongratsGrid.className = "button-close-pyro"
    removeCongratsGrid.innerHTML = "Close"
    removeCongratsGrid.addEventListener("click", function(){
        // Close congrats screen
        document.body.removeChild(pyroDiv)
    })

    if (decider === 0){
        paragraph.innerHTML = `Game ended in a draw.`
    } else if (decider === 1){
        paragraph.innerHTML = `Congrats! You won the game.`

        // Create confetti
        const beforeDiv = document.createElement("div")
        beforeDiv.classList.add("before")

        const afterDiv = document.createElement("div")
        afterDiv.classList.add("after")

        // Append confetti to overlay
        pyroDiv.appendChild(beforeDiv)
        pyroDiv.appendChild(afterDiv)

    } else {
        paragraph.innerHTML = `You lost! Computer won the game.`
    }


    // Append items to container
    contentDiv.appendChild(paragraph)
    contentDiv.appendChild(removeCongratsGrid)

    // Append content div to pyro div
    pyroDiv.appendChild(contentDiv)

    // Append pyro div to body
    document.body.appendChild(pyroDiv)
}

// Create board
createBoard()