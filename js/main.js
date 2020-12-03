// Create array of cell ids
let cellObject = []

// Create factory function
const CellFactory = (id) => { 
    return {id}
}

// Create object for winning combinations

let gameExists = false
let gameWon = false
let gameWinner = ""

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
    gameWinner = ""
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
    let randomNumber = Math.floor(Math.random() * unselected.length)

    let cellSelection = unselected[randomNumber]

    gameboard[cellSelection] = "O"
    cellObject[cellSelection].id.innerHTML = gameboard[cellSelection]
}


function checkForWinner(){
    let gameboardString = gameboard.join("")
    let regexPlayer = new RegExp(/X...X...X|X..X..X|XXX......|...XXX...|......XXX|..X.X.X/ig)
    let regexComp = new RegExp(/O...O...O|O..O..O|OOO......|...OOO...|......OOO|..O.O.O/ig)

    if (regexComp.test(gameboardString)){
        gameWon = true
        gameWinner = "Computer"
    } else if (regexPlayer.test(gameboardString)){
        gameWon = true
        gameWinner = "Player"
    }

    if (gameWon) displayWinner()
}

function displayWinner(){
    // alert(`${gameWinner} won the game!!!`
    console.log(`${gameWinner} won the game!!!`)


    if (gameWinner === "Player") createWinnerForm()
    else createLoserForm()
}


function createWinnerForm(){
    // Create and initialize form
    const pyroDiv = document.createElement("div")
    pyroDiv.classList.add("pyro")

    const beforeDiv = document.createElement("div")
    beforeDiv.classList.add("before")

    const afterDiv = document.createElement("div")
    afterDiv.classList.add("after")

    const contentDiv = document.createElement("div")
    contentDiv.classList.add("congrats")

    const paragraph = document.createElement("p")
    paragraph.innerHTML = `You won the game!!!`

    // Create restart button
    const removeCongratsGrid = document.createElement("button")
    removeCongratsGrid.className = "button-close-pyro"
    removeCongratsGrid.innerHTML = "Close"
    removeCongratsGrid.addEventListener("click", function(){
        // Reset gameboard, game grid, and gameWon
        document.body.removeChild(pyroDiv)
    })

    

    
    pyroDiv.appendChild(beforeDiv)
    pyroDiv.appendChild(afterDiv)

    contentDiv.appendChild(paragraph)
    contentDiv.appendChild(removeCongratsGrid)

    pyroDiv.appendChild(contentDiv)

    // Create form title
    const formTitle = document.createElement("h3")
    formTitle.innerHTML = "Add new book"

    document.body.appendChild(pyroDiv)
}

function createLoserForm(){
    // Create and initialize form
    const pyroDiv = document.createElement("div")
    pyroDiv.classList.add("pyro")

    const contentDiv = document.createElement("div")
    contentDiv.classList.add("congrats")

    const paragraph = document.createElement("p")
    paragraph.innerHTML = `${gameWinner} won the game.`

    // Create restart button
    const removeCongratsGrid = document.createElement("button")
    removeCongratsGrid.className = "button-close-pyro"
    removeCongratsGrid.innerHTML = "Close"
    removeCongratsGrid.addEventListener("click", function(){
        // Close congrats screen
        document.body.removeChild(pyroDiv)
    })

    contentDiv.appendChild(paragraph)
    contentDiv.appendChild(removeCongratsGrid)

    pyroDiv.appendChild(contentDiv)

    // Create form title
    const formTitle = document.createElement("h3")
    formTitle.innerHTML = "Add new book"

    document.body.appendChild(pyroDiv)
}

// Create board
createBoard()