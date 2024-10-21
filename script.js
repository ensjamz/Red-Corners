/* Basic styling for the game */
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to bottom right, #ffcccc, #ff6666);
    margin: 0;
    font-family: Arial, sans-serif;
}

.game-container {
    text-align: center;
    position: relative;
}

.spinner-container {
    position: relative;
    height: 200px;
    width: 200px;
    margin: 20px auto;
}

#spinnerImage {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: spin 3s linear infinite;
}

.corners {
    display: flex;
    justify-content: space-between;
    margin: 40px;
}

.corner-btn {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: white;
    border: 2px solid red;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

.corner-btn:hover {
    background-color: #ffcccc;
}

.score-board {
    margin: 20px;
    font-size: 20px;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 10px;
}

.upload-section {
    margin: 20px;
}

#continueButton, #restartButton {
    padding: 10px;
    background-color: #ff6666;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
}

#continueButton:hover, #restartButton:hover {
    background-color: #ff3333;
}

#statusMessage {
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
}